"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify({"user": user.serialize()}), 201




@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User(email=email, password=password, is_active=True)

    db.session.add(user)
    db.session.commit()

    return jsonify({"user": user.serialize()}), 201
