from flask import Flask, render_template
from flask_migrate import Migrate
from backend.config.DatabaseHelper import db, init_db
from backend.controller.UserController import user_controller
from backend.controller.BookController import book_controller
from backend.controller.CategoryController import category_controller
from backend.controller.ShopController import shop_controller
from flask_cors import CORS

app = Flask(__name__, static_folder='templates/assets')

origins = ["http://localhost:5173", "http://127.0.0.1:5000"]

CORS(app, origins=origins, supports_credentials=True)

init_db(app)
migrate = Migrate(app, db)

app.register_blueprint(user_controller)
app.register_blueprint(book_controller)
app.register_blueprint(category_controller)
app.register_blueprint(shop_controller)

@app.route('/')
def root():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
