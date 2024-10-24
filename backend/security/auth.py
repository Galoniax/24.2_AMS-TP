import jwt
from functools import wraps
from flask import request, jsonify
from backend.config.config import SECRET_KEY

def generate_token(email):
    token = jwt.encode({"email": email}, SECRET_KEY, algorithm="HS256")
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
