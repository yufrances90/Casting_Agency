'''
app.py
Author: Frances Yu
'''

from flask import \
    Flask, \
    jsonify, \
    request, \
    abort


APP = Flask(__name__)


@APP.route('/')
def index():
    '''
    Test endpoint
    '''
    return jsonify('Hello')


if __name__ == "__main__":
    APP.run()
