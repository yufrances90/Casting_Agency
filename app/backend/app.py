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
app.config.from_object('config.DevConfig')
setup_db(app)


@app.route('/')
def index():
    return 'Wecome to Casting Agency API'


if __name__ == "__main__":
    app.run()
