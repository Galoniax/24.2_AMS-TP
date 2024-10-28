import jwt
from flask import request, jsonify
from functools import wraps
from backend.config.config import SECRET_KEY

def get_user_id_from_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token es requerido'}), 403
    token = token[7:]
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('id')
        return user_id
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'El token ha expirado'}), 403
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 403