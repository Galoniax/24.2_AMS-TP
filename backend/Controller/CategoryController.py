from flask import Blueprint, jsonify, request
from backend.security.auth import token_required, has_any_role
from backend.models.Category import Category
from backend.config.DatabaseHelper import db
from backend.config.config import API_PREFIX
category_controller = Blueprint('category_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@category_controller.route('/categories', methods=['GET'])
@token_required
def get_categories():
    categories = Category.query.all()
    categories_list = [category.to_dict() for category in categories]
    return jsonify(categories_list), 200

@category_controller.route('/categories', methods=['POST'])
@token_required
@has_any_role(['ADMIN'])
def create_category():
    data = request.json

    new_category = Category(
        name=data['name']
    )

    db.session.add(new_category)
    db.session.commit()

    return jsonify({"message": "Categoría creada exitosamente"}), 201

@category_controller.route('/categories/<int:id>', methods=['DELETE'])
@token_required
@has_any_role(['ADMIN'])
def delete_category(id):
    category = Category.query.get(id)
    if category:
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": "Categoría eliminada exitosamente"}), 200
    return jsonify({"message": "Categoría no encontrada"}), 404

@category_controller.route('/categories/<int:id>', methods=['PUT'])
@token_required
@has_any_role(['ADMIN'])
def update_category(id):
    category = Category.query.get(id)
    if category:
        data = request.json
        category.name = data.get('name', category.name)

        db.session.commit()
        return jsonify({"message": "Categoría actualizada exitosamente"}), 200

    return jsonify({"message": "Categoría no encontrada"}), 404

@category_controller.route('/categories/<int:id>', methods=['GET'])
@token_required
def get_category(id):
    category = Category.query.get(id)
    if category:
        return jsonify(category.to_dict()), 200
    return jsonify({"message": "Categoría no encontrada"}), 404
