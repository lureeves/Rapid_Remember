# Rapid Remember

Integration with Flask, and Flask-SQLalchemy extensions.

### Extension:

- SQL ORM: [Flask-SQLalchemy](http://flask-sqlalchemy.pocoo.org/2.1/)

## Installation

Install with pip:

```
$ pip install -r requirements.txt
```

## Run Flask

### Add .env

File should follow this structure:

```
SECRET_KEY='secret-key-here'
OPENAI_API_KEY='api-key-here'
```
### Run flask for develop

If you are on windows, make a virtual environment named venv

Run venv with:

```
venv\Scripts\activate
```

To keep flask running during development use:

```
$ flask run --debug
```

In flask, Default port is `5000`

## Flask Application Structure 
```
|   .env
|   .gitignore
|   app.db
|   config.py
|   output.doc
|   README.md
|   requirements.txt
|   
+---app
|   |   forms.py
|   |   models.py
|   |   routes.py
|   |   __init__.py
|   |   
|   +---static
|   |   +---css
|   |   |       main.css
|   |   |       
|   |   \---js
|   |           beginner.js
|   |           generate_image.js
|   |           
|   +---templates
|   |       add_text.html
|   |       alerts.html
|   |       base.html
|   |       edit_text.html
|   |       index.html
|   |       login.html
|   |       nav.html
|   |       practice.html
|   |       signup.html
|   |       
|   \---__pycache__
|           forms.cpython-311.pyc
|           models.cpython-311.pyc
|           routes.cpython-311.pyc
|           __init__.cpython-311.pyc
|
+---venv
\---__pycache__
```

## Reference

Offical Website

- [Flask](http://flask.pocoo.org/)
- [Flask-SQLalchemy](http://flask-sqlalchemy.pocoo.org/2.1/)

Tutorial

- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Changelog

- Version 1.0 : basic CRUD application, sign up/login, add text, edit text, practice and delete

