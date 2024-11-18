from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()

def init_db(app):
    try:
        load_dotenv()
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(app)
        print("Conexión a la base de datos configurada correctamente.")
    except Exception as e:
        print(f"Error al configurar la base de datos: {e}")
