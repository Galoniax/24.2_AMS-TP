from flask import Blueprint, jsonify, request
from backend.controller.UserController import save_data
from backend.security.auth import token_required, has_any_role
from backend.models import Book
from backend.config.DatabaseHelper import db
import json
from backend.config.config import DATABASE_FILE, API_PREFIX
from backend.util.token_util import get_user_id_from_token

book_controller = Blueprint('book_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@book_controller.route('/books', methods=['GET'])
@token_required
def get_books():
    user_id = get_user_id_from_token()

    if user_id is None:
      return jsonify({"message": "Usuario no autenticado"}), 401

    books = Book.query.all()
    books_list = [book.to_dict() for book in books]

    return jsonify(books_list), 200

@book_controller.route('/books', methods=['POST'])
@token_required
@has_any_role(['ADMIN'])
def create_book():
  data = request.json

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

@book_controller.route('/books/<int:id>', methods=['GET'])
@token_required
def get_book(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    books = data.get('books', [])
    for book in books:
      if book['id'] == id:
        return jsonify(book), 200
    return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/<int:id>', methods=['PUT'])
@token_required
@has_any_role(['ADMIN'])
def update_book(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    books = data.get('books', [])
    for book in books:
      if book['id'] == id:
        book['title'] = request.json['title']
        book['price'] = request.json['price']
        book['isOffer'] = request.json['isOffer']
        book['stock'] = request.json['stock']
        book['imageUrl'] = request.json['imageUrl']
        book['isNew'] = request.json['isNew']
        book['author'] = request.json['author']
        book['categoryId'] = int(request.json['categoryId'])
        save_data(data)
        return jsonify({"message": "Libro actualizado exitosamente"}), 200
    return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/<int:id>', methods=['DELETE'])
@token_required
@has_any_role(['ADMIN'])
def delete_book(id):
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    books = data.get('books', [])
    for book in books:
      if book['id'] == id:
        books.remove(book)
        save_data(data)
        return jsonify({"message": "Libro eliminado exitosamente"}), 200
    return jsonify({"message": "Libro no encontrado"}), 404

@book_controller.route('/books/catalog/<int:id_category>', methods=['GET'])
@token_required
def get_books_category(id_category):
    with open(DATABASE_FILE) as db_file:
        data = json.load(db_file)
        categories = data.get('categories', [])
        books = data.get('books', [])

    # Verificar si existe la categoría con el id dado
    category_exists = any(category['id'] == id_category for category in categories)

    if not category_exists:
      return jsonify({"message": "Categoría no encontrada"}), 404

    # Filtrar los libros que coinciden con el categoryId
    books_category = [book for book in books if book.get('categoryId') == id_category]

    return jsonify(books_category), 200