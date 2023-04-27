# Rapid Remember

Using Flask to build a Restful API Server with Swagger document.

Integration with Flask-restplus, Flask-Cors, Flask-Testing, Flask-SQLalchemy,and Flask-OAuth extensions.

### Extension:

- SQL ORM: [Flask-SQLalchemy](http://flask-sqlalchemy.pocoo.org/2.1/)

## Installation

Install with pip:

```
$ pip install -r requirements.txt
```

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
 
## Run Flask
### Run flask for develop

If you are on windows, make a virtual environment named venv

Run venv with:

```
venv\Scripts\activate
```


```
$ flask run --debug
```

In flask, Default port is `5000`

Swagger document page:  `http://127.0.0.1:5000/api`


## Reference

Offical Website

- [Flask](http://flask.pocoo.org/)
- [Flask-SQLalchemy](http://flask-sqlalchemy.pocoo.org/2.1/)

Tutorial

- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
-

## Changelog

- Version 1.0 : basic CRUD application, does not store image 

