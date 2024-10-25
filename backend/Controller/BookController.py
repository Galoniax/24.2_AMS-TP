from flask import Blueprint, jsonify
from backend.security.auth import token_required, has_any_role
import json
from backend.config.config import DATABASE_FILE, API_PREFIX

book_controller = Blueprint('book_controller', __name__, url_prefix=f"/{API_PREFIX}/")

@book_controller.route('/books', methods=['GET'])
@token_required
@has_any_role(['ADMIN'])
def get_books():
  with open(DATABASE_FILE) as db_file:
    data = json.load(db_file)
    books = data.get('books', [])
    return jsonify(books), 200