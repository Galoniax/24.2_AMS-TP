from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    try:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:42344807@localhost:3306/libreria_yenny'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(app)
        print("Conexión a la base de datos configurada correctamente.")
    except Exception as e:
        print(f"Error al configurar la base de datos: {e}")