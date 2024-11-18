from backend.config.DatabaseHelper import db
from backend.models.Sale import Sale
from backend.models.SaleDetail import SaleDetail
from sqlalchemy.exc import SQLAlchemyError

class SaleService:

  @staticmethod
  def register_sale(user_id, books, total_price, shipping_method):
    try:
      sale = Sale(
        user_id=user_id,
        total_price=total_price,
        shipping_method=shipping_method
      )
      db.session.add(sale)
      db.session.flush()  

      for book in books:
          sale_detail = SaleDetail(
            sale_id=sale.id,
            book_id=book['bookId'],
            book_price=book['bookPrice'],
            unit_price=book['unitPrice'],
            quantity=book['quantity']
          )
          db.session.add(sale_detail)

      db.session.commit()
      return sale.to_dict()

    except SQLAlchemyError as e:
      db.session.rollback()
      raise Exception(f"Error al registrar la venta: {str(e)}")

  @staticmethod
  def get_all_sales():
    try:
      sales = Sale.query.all()
      return [sale.to_dict() for sale in sales]
    except SQLAlchemyError as e:
      raise Exception(f"Error al obtener ventas: {str(e)}")

  @staticmethod
  def get_sales_by_user(user_id):
    try:
      sales = Sale.query.filter_by(user_id=user_id).all()
      return [sale.to_dict() for sale in sales]
    except SQLAlchemyError as e:
      raise Exception(f"Error al obtener ventas del usuario: {str(e)}")
