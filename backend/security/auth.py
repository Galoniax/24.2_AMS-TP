import jwt
from functools import wraps
from flask import request, jsonify
from backend.config.config import SECRET_KEY

def generate_token(email, role, id):
  token = jwt.encode({"email": email, "role": role, "id": id}, SECRET_KEY, algorithm="HS256")
  return token

def token_required(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    token = None
    if 'Authorization' in request.headers:
      token = request.headers['Authorization']

    if not token:
      return jsonify({'message': 'Token es requerido'}), 403

    token = token[7:]

    try:
      jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except Exception as e:
      return jsonify({'message': 'Token es inválido', 'error': str(e)}), 403

    return f(*args, **kwargs)
  return decorated


def has_any_role(allowed_roles):
  def decorator(f):
    @wraps(f)
    def decorated(*args, **kwargs):
      token = None
      if 'Authorization' in request.headers:
        token = request.headers['Authorization']

      if not token:
        return jsonify({'message': 'Token es requerido'}), 403

      token = token[7:]

      try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_role = decoded_token.get('role')  # el token debe tener el campo 'role'
        
        if user_role not in allowed_roles:
          return jsonify({'message': 'No tienes permiso para acceder a esta vista'}), 403

      except jwt.ExpiredSignatureError:
        return jsonify({'message': 'El token ha expirado'}), 403
      except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 403

      return f(*args, **kwargs)
    return decorated
  return decorator