from flask import Blueprint, jsonify, request
from backend.security.auth import token_required, has_any_role
from backend.models.Book import Book
from backend.config.DatabaseHelper import db
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

	if not data.get('title') or not data.get('price') or not data.get('stock') or not data.get('author') or not data.get('categoryId'):
		return jsonify({"message": "Todos los campos son necesarios"}), 400

	try:
		new_book = Book(
			title=data['title'],
			price=data['price'],
			isOffer=data.get('isOffer', False),
			stock=data['stock'],
			imageUrl=data.get('imageUrl'),
			isNew=data.get('isNew', False),
			author=data['author'],
			categoryId=data['categoryId']
		)

		db.session.add(new_book)
		db.session.commit()
		return jsonify({"message": "Libro creado exitosamente"}), 201
	except Exception as e:
		db.session.rollback()
		return jsonify({"message": f"Error al crear el libro: {str(e)}"}), 500

@book_controller.route('/books/<int:id>', methods=['GET'])
@token_required
def get_book(id):
	book = Book.query.get(id)
	if book:
		return jsonify(book.to_dict()), 200

	return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/<int:id>', methods=['PUT'])
@token_required
@has_any_role(['ADMIN'])
def update_book(id):
	book = Book.query.get(id)
	if book:
		data = request.json
		book.title = data.get('title', book.title)
		book.price = data.get('price', book.price)
		book.isOffer = data.get('isOffer', book.isOffer)
		book.stock = data.get('stock', book.stock)
		book.imageUrl = data.get('imageUrl', book.imageUrl)
		book.isNew = data.get('isNew', book.isNew)
		book.author = data.get('author', book.author)
		book.categoryId = data.get('categoryId', book.categoryId)

		db.session.commit()
		return jsonify({"message": "Libro actualizado exitosamente"}), 200

	return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/<int:id>', methods=['DELETE'])
@token_required
@has_any_role(['ADMIN'])
def delete_book(id):
	book = Book.query.get(id)
	if book:
		db.session.delete(book)
		db.session.commit()
		return jsonify({"message": "Libro eliminado exitosamente"}), 200

	return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/catalog/<int:id_category>', methods=['GET'])
@token_required
def get_books_category(id_category):
	page = request.args.get('page', 1, type=int)
	per_page = request.args.get('per_page', 10, type=int)

	books = Book.query.filter_by(categoryId=id_category).paginate(page=page, per_page=per_page, error_out=False)

	return jsonify({
		'books': [book.to_dict() for book in books.items],
		'total': books.total,
		'pages': books.pages
	}), 200