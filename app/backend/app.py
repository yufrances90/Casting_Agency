'''
app.py
Author: Frances Yu
'''

from flask import \
    Flask, \
    jsonify, \
    request, \
    abort
from flask_sqlalchemy import SQLAlchemy

from models import setup_db

app = Flask(__name__)
app.config.from_object('config.DatabaseConfig')
setup_db(app)


@app.route('/')
def index():

    print(app.config['SQLALCHEMY_DATABASE_URI'])

    return jsonify('Hello')


if __name__ == "__main__":
    app.run()
