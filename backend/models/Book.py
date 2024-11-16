from backend.config.DatabaseHelper import db

class Book(db.Model):
  __tablename__ = 'books'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  price = db.Column(db.Float, nullable=False)
  isOffer = db.Column(db.Boolean, default=False)
  stock = db.Column(db.Integer, nullable=False)
  imageUrl = db.Column(db.String(255), nullable=True)
  isNew = db.Column(db.Boolean, default=False)
  author = db.Column(db.String(255), nullable=False)
  categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "price": self.price,
      "isOffer": self.isOffer,
      "stock": self.stock,
      "imageUrl": self.imageUrl,
      "isNew": self.isNew,
      "author": self.author,
      "categoryId": self.categoryId,
    }
