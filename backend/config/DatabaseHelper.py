from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:42344807@localhost:3306/libreria_yenny'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)


# Actualiza app.py para registrar migraciones:

# python
# Copiar código
# from flask_migrate import Migrate
# from backend.config.DatabaseHelper import db

# # Añadir esto después de inicializar la app y db
# migrate = Migrate(app, db)
# Ejecuta los siguientes comandos para inicializar y aplicar las migraciones:

# bash
# Copiar código
# flask db init
# flask db migrate -m "Inicializar base de datos"
# flask db upgrade