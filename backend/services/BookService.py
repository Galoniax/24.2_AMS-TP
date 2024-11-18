from math import ceil
from backend.models.Book import Book
from backend.dto.PageResponse import PageResponse
from backend.config import config
from backend.config.DatabaseHelper import db

class BookService:

  @staticmethod
  def get_books(page_number=config.DEFAULT_PAGE_NUMBER, page_size=config.DEFAULT_PAGE_SIZE, category_id=None):
    query = Book.query

    if category_id:
      query = query.filter_by(categoryId=category_id)

    total_items = query.count()
    total_pages = ceil(total_items / page_size)
    is_last = page_number >= total_pages - 1

    books = query.paginate(page=page_number + 1, per_page=page_size, error_out=False)
    items = [book.to_dict() for book in books.items]

    return PageResponse(
      items=items,
      page_size=page_size,
      page_number=page_number,
      total_items=total_items,
      total_pages=total_pages,
      is_last=is_last,
    )

  @staticmethod
  def create_book(data):
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
    return new_book.to_dict()

  @staticmethod
  def get_book_by_id(book_id):
    return Book.query.get(book_id)

  @staticmethod
  def update_book(book_id, data):
    book = Book.query.get(book_id)
    if not book:
      return None

    book.title = data.get('title', book.title)
    book.price = data.get('price', book.price)
    book.isOffer = data.get('isOffer', book.isOffer)
    book.stock = data.get('stock', book.stock)
    book.imageUrl = data.get('imageUrl', book.imageUrl)
    book.isNew = data.get('isNew', book.isNew)
    book.author = data.get('author', book.author)
    book.categoryId = data.get('categoryId', book.categoryId)

    db.session.commit()
    return book.to_dict()
  
  @staticmethod
  def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
      return False

    db.session.delete(book)
    db.session.commit()
    return True