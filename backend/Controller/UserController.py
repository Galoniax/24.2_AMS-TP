from flask import Blueprint, request, jsonify
import json
import os
from backend.security.auth import generate_token
from backend.config.config import DATABASE_FILE, API_PREFIX

user_controller = Blueprint('user_controller', __name__, url_prefix=f"/{API_PREFIX}/")

def load_data():
    if os.path.exists(DATABASE_FILE):
      with open(DATABASE_FILE, 'r') as f:
        return json.load(f)
    return {}

def save_data(data):
  with open(DATABASE_FILE, 'w') as f:
    json.dump(data, f, indent=4)

@user_controller.route('/login', methods=['POST'])
def login():
  data = load_data()
  users = data.get("users", [])
  body = request.json
  email = body.get('email')
  password = body.get('password')

  for user in users:
    if user['email'] == email and user['password'] == password:
      token = generate_token(email)
      return jsonify({"message": "Login exitoso", "token": token}), 200
  
  return jsonify({"message": "Credenciales incorrectas"}), 401

@user_controller.route('/register', methods=['POST'])
def register():
  data = load_data()
  users = data.get("users", [])

  new_user = request.json
  users.append(new_user)
  data['users'] = users
  save_data(data)
  
  return jsonify({"message": "Usuario registrado exitosamente"}), 201
