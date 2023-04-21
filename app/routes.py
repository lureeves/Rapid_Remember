from app import app, db
from flask import render_template, redirect, url_for, flash
from app.forms import SignUpForm, LoginForm, TextForm
from app.models import User, Text
from flask_login import login_user, logout_user, login_required, current_user
import os

@app.route('/')
def index():
    texts = Text.query.all()
    return render_template('index.html', texts=texts)


@app.route('/signup', methods=["GET", "POST"])
def signup():
    # Create an instance of the form (in the context of the current request)
    form = SignUpForm()
    # Check if the form was submitted and that all of the fields are valid
    if form.validate_on_submit():
        # If so, get the data from the form fields
        print('Hooray our form was validated!!')
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        username = form.username.data
        password = form.password.data
        print(first_name, last_name, email, username, password)
        # Check to see if there is already a user with either username or email
        check_user = db.session.execute(db.select(User).filter((User.username == username) | (User.email == email))).scalars().all()
        if check_user:
            # Flash a message saying that user with email/username already exists
            flash("A user with that username and/or email already exists", "warning")
            return redirect(url_for('signup'))
        # If check_user is empty, create a new record in the user table
        new_user = User(first_name=first_name, last_name=last_name, email=email, username=username, password=password)
        flash(f"Thank you {new_user.username} for signing up!", "success")
        return redirect(url_for('index'))
    return render_template('signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        print('Form Validated :)')
        username = form.username.data
        password = form.password.data
        print(username, password)
        # Check if there is a user with username and that password
        user = User.query.filter_by(username=username).first()
        if user is not None and user.check_password(password):
            # If the user exists and has the correct password, log them in
            login_user(user)
            flash(f'You have successfully logged in as {username}', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username and/or password. Please try again', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html', form=form)


@app.route('/logout')
def logout():
    logout_user()
    flash("You have logged out", "info")
    return redirect(url_for('index'))


@app.route('/add_text', methods=["GET", "POST"])
@login_required
def add_text():
    form = TextForm()
    if form.validate_on_submit():
        # Get the data from the form
        title = form.title.data
        body = form.body.data
        image_url = form.image_url.data or None
        # Create an instance of Text with form data AND auth user ID
        new_text = Text(title=title, body=body, image_url=image_url, user_id=current_user.id)
        flash(f"{new_text.title} has been created!", "success")
        return redirect(url_for('index'))
    return render_template('add_text.html', form=form) 


@app.route('/edit/<text_id>', methods=["GET", "POST"])
@login_required
def edit_text(text_id):
    form = TextForm()
    text_to_edit = Text.query.get_or_404(text_id)
    # Make sure that the text author is the current user
    if text_to_edit.author != current_user:
        flash("You do not have permission to edit this text", "danger")
        return redirect(url_for('index'))

    # If form submitted, update Text
    if form.validate_on_submit():
        # update the text with the form data
        print('Form validated')
        text_to_edit.title = form.title.data
        text_to_edit.body = form.body.data
        # text_to_edit.image_url = form.image_url.data
        # Commit that to the database
        db.session.commit()
        flash(f"{text_to_edit.title} has been edited!", "success")
        return redirect(url_for('index'))

    # Pre-populate the form with Text To Edit's values
    form.title.data = text_to_edit.title
    form.body.data = text_to_edit.body
    # form.image_url.data = text_to_edit.image_url
    return render_template('edit_text.html', form=form, text=text_to_edit)


@app.route('/delete/<text_id>')
@login_required
def delete_text(text_id):
    text_to_delete = Text.query.get_or_404(text_id)
    if text_to_delete.author != current_user:
        flash("You do not have permission to delete this text", "danger")
        return redirect(url_for('index'))

    db.session.delete(text_to_delete)
    db.session.commit()
    flash(f"{text_to_delete.title} has been deleted", "info")
    return redirect(url_for('index'))


@app.route('/practice/<text_id>', methods=["GET", "POST"])
@login_required
def practice(text_id):
    form = TextForm()
    practice = Text.query.get_or_404(text_id)

    # Make sure that the text author is the current user
    if practice.author != current_user:
        flash("You do not have permission to practice this text", "danger")
        return redirect(url_for('index'))
    
    api_key = os.getenv('OPENAI_API_KEY') # Passes in API key

    # Pre-populate the form with Text To Edit's values
    form.body.data = practice.body
    return render_template('practice.html', form=form, practice=practice, api_key=api_key)
