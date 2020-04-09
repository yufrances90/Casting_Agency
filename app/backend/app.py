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
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object('config.DevConfig')
setup_db(app)
CORS(app)


@app.route('/')
def index():
    return jsonify({
        'msg': 'Wecome to Casting Agency API'
    })


if __name__ == "__main__":
    app.run()
