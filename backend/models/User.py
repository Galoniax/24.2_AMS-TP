from backend.config.DatabaseHelper import db

class User(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(255), nullable=False)
  password = db.Column(db.String(255), nullable=False)
  role = db.Column(db.String(255), nullable=False)
  subscription = db.Column(db.Boolean, default=False)

  def to_dict(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email,
      'password': self.password,
      'role': self.role,
      'subscription': self.subscription
    }