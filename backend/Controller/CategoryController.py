from flask import Blueprint, jsonify, request
from backend.controller.UserController import save_data
from backend.security.auth import token_required, has_any_role
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
  
@category_controller.route('/categories', methods=['POST'])
@token_required
@has_any_role(['ADMIN'])
def create_category():
    with open(DATABASE_FILE) as db_file:
        data = json.load(db_file)
        categories = data.get('categories', [])
        new_category = {'id': len(categories) + 1}
        new_category['name'] = request.json.get('name')
        categories.append(new_category)
        data['categories'] = categories
        save_data(data)
        return jsonify({"message": "Categoría creada exitosamente"}), 201

@category_controller.route('/categories/<int:id>', methods=['DELETE'])
@token_required
@has_any_role(['ADMIN'])
def delete_category(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    categories = data.get('categories', [])
    for category in categories:
      if category['id'] == id:
        categories.remove(category)
        save_data(data)
        return jsonify({"message": "Categoría eliminada exitosamente"}), 200
    return jsonify({"message": "Categoría no encontrada"}), 404

@category_controller.route('/categories/<int:id>', methods=['PUT'])
@token_required
@has_any_role(['ADMIN'])
def update_category(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    categories = data.get('categories', [])
    for category in categories:
      if category['id'] == id:
        category['name'] = request.json['name']
        save_data(data)
        return jsonify({"message": "Categoría actualizada exitosamente"}), 200
    return jsonify({"message": "Categoría no encontrada"}), 404
  
@category_controller.route('/categories/<int:id>', methods=['GET'])
@token_required
def get_category(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    categories = data.get('categories', [])
    for category in categories:
      if category['id'] == id:
        return jsonify(category), 200
    return jsonify({"message": "Categoría no encontrada"}), 404