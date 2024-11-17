from math import ceil
from backend.models.Book import Book
from backend.dto.PageResponse import PageResponse
from backend.config import config

class BookService:
  @staticmethod
  def get_books(page_number=config.DEFAULT_PAGE_NUMBER, page_size=config.DEFAULT_PAGE_SIZE, category_id=None):
    query = Book.query

    if category_id:
      query = query.filter_by(category_id=category_id)

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