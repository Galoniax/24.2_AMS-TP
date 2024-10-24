from flask import Flask, render_template
from backend.controller.UserController import user_controller
from backend.controller.BookController import book_controller
from backend.controller.CategoryController import category_controller
from flask_cors import CORS 

app = Flask(__name__, static_folder='templates/assets')

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(user_controller)
app.register_blueprint(book_controller)
app.register_blueprint(category_controller)

@app.route('/')
def root():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)