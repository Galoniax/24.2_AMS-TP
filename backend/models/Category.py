from backend.config.DatabaseHelper import db

class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  books = db.relationship('Book', backref='category', lazy=True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }
