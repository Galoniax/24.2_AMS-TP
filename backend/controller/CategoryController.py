from flask import Blueprint, jsonify
from backend.security.auth import token_required
import json
from backend.config.config import DATABASE_FILE, API_PREFIX

category_controller = Blueprint('category_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@category_controller.route('/categories', methods=['GET'])
@token_required
def get_categories():
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    categories = data.get('categories', [])
    return jsonify(categories), 200
