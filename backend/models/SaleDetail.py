from backend.config.DatabaseHelper import db


class SaleDetail(db.Model):
  __tablename__ = 'sale_details'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  sale_id = db.Column(db.Integer, db.ForeignKey('sales.id'), nullable=False)
  book_id = db.Column(db.Integer, nullable=False)
  book_price = db.Column(db.Float, nullable=False)
  unit_price = db.Column(db.Float, nullable=False)
  quantity = db.Column(db.Integer, nullable=False)

  sale = db.relationship('Sale', back_populates='sale_details')

  def to_dict(self):
    return {
      "id": self.id,
      "sale_id": self.sale_id,
      "book_id": self.book_id,
      "book_price": self.book_price,
      "unit_price": self.unit_price,
      "quantity": self.quantity
    }
