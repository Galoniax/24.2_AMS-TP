class PageResponse:
  def __init__(self, items, page_size, page_number, total_items, total_pages, is_last):
    self.items = items
    self.page_size = page_size
    self.page_number = page_number
    self.total_items = total_items
    self.total_pages = total_pages
    self.is_last = is_last

  def to_dict(self):
    return {
      "items": self.items,
      "pageSize": self.page_size,
      "pageNumber": self.page_number,
      "totalItems": self.total_items,
      "totalPages": self.total_pages,
      "isLast": self.is_last,
    }
