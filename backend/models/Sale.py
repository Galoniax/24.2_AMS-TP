from backend.config.DatabaseHelper import db
from datetime import datetime

class Sale(db.Model):
  __tablename__ = 'sales'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, nullable=False)
  total_price = db.Column(db.Float, nullable=False)
  timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
  shipping_method = db.Column(db.String(50), nullable=False)

  sale_details = db.relationship('SaleDetail', back_populates='sale', cascade="all, delete-orphan")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "total_price": self.total_price,
      "timestamp": self.timestamp.isoformat(),
      "shipping_method": self.shipping_method,
      "sale_details": [detail.to_dict() for detail in self.sale_details]
    }