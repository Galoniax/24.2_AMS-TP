from flask import Blueprint, jsonify, request
from backend.security.auth import token_required, has_any_role
from backend.util.token_util import get_user_id_from_token
from backend.config.config import API_PREFIX
from backend.services.BookService import BookService

book_controller = Blueprint('book_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@book_controller.route('/books', methods=['GET'])
@token_required
def get_books():
	user_id = get_user_id_from_token()

	if user_id is None:
		return jsonify({"message": "Usuario no autenticado"}), 401

	page_number = request.args.get("pageNumber", default=0, type=int)
	page_size = request.args.get("pageSize", default=10, type=int)
	category_id = request.args.get("categoryId", type=int)

	page_response = BookService.get_books(page_number, page_size, category_id)

	return jsonify(page_response.to_dict()), 200



@book_controller.route('/books', methods=['POST'])
@token_required
@has_any_role(['ADMIN'])
def create_book():
	data = request.json

	required_fields = ['title', 'price', 'stock', 'author', 'categoryId']
	if not all(data.get(field) for field in required_fields):
		return jsonify({"message": "Todos los campos son necesarios"}), 400

	try:
		new_book = BookService.create_book(data)
		return jsonify(new_book), 201
	except Exception as e:
		return jsonify({"message": f"Error al crear el libro: {str(e)}"}), 500



@book_controller.route('/books/<int:id>', methods=['GET'])
@token_required
def get_book(id):
	book = BookService.get_book_by_id(id)
	if book:
		return jsonify(book.to_dict()), 200
	return jsonify({"message": "Libro no encontrado"}), 404



@book_controller.route('/books/<int:id>', methods=['PUT'])
@token_required
@has_any_role(['ADMIN'])
def update_book(id):
	data = request.json
	updated_book = BookService.update_book(id, data)
	if updated_book:
		return jsonify({"message": "Libro actualizado exitosamente", "book": updated_book}), 200
	return jsonify({"message": "Libro no encontrado"}), 404



@book_controller.route('/books/<int:id>', methods=['DELETE'])
@token_required
@has_any_role(['ADMIN'])
def delete_book(id):
	if BookService.delete_book(id):
		return jsonify({"message": "Libro eliminado exitosamente"}), 200
	return jsonify({"message": "Libro no encontrado"}), 404
