from flask import Blueprint, request, jsonify
from backend.models.User import User
from backend.config.DatabaseHelper import db
from backend.security.auth import generate_token, has_any_role, token_required
from backend.config.config import API_PREFIX

user_controller = Blueprint('user_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@user_controller.route('/login', methods=['POST'])
def login():
  body = request.json
  email = body.get('email')
  password = body.get('password')

  user = User.query.filter_by(email=email, password=password).first()
  if user:
    role = user.role or "CLIENT"
    token = generate_token(user.email, role, id=user.id)
    return jsonify({
      "message": "Login exitoso",
      "token": token,
      "username": user.username,
      "id": user.id,
      "role": role
    }), 200

  return jsonify({"message": "Credenciales incorrectas"}), 401

@user_controller.route('/register', methods=['POST'])
def register():
  new_user_data = request.json
  new_username = new_user_data.get('username')
  new_email = new_user_data.get('email')

  if User.query.filter_by(username=new_username).first():
    return jsonify({"message": "Nombre de usuario ya registrado"}), 409
  if User.query.filter_by(email=new_email).first():
    return jsonify({"message": "Correo electrónico ya registrado"}), 409

  new_user = User(
    username=new_username,
    email=new_email,
    password=new_user_data.get('password'),
    role=new_user_data.get('role', 'CLIENT'),
    subscription=new_user_data.get('subscription', False)
  )

  db.session.add(new_user)
  db.session.commit()

  return jsonify({"message": "Usuario registrado exitosamente"}), 201

@user_controller.route('/users', methods=['GET'])
@has_any_role(['ADMIN'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@user_controller.route('/users/<int:user_id>/subscription', methods=['POST'])
@token_required
def buy_subscription(user_id):
    user = User.query.get(user_id)
    if user:
        user.subscription = True
        db.session.commit()
        return jsonify({"message": "Suscripción comprada exitosamente"}), 200

    return jsonify({"message": "Usuario no encontrado"}), 404