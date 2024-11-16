import logging
from logging.config import fileConfig

from flask import current_app

from alembic import context


# Este es el objeto de configuración de Alembic.
config = context.config

# Configuración para el logging
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

# Función para obtener el motor de base de datos
def get_engine():
    try:
        # Compatibilidad con Flask-SQLAlchemy versiones más antiguas
        return current_app.extensions['migrate'].db.get_engine()
    except (TypeError, AttributeError):
        # Para Flask-SQLAlchemy>=3
        return current_app.extensions['migrate'].db.engine

# Función para obtener la URL de la base de datos
def get_engine_url():
    try:
        return get_engine().url.render_as_string(hide_password=False).replace(
            '%', '%%')
    except AttributeError:
        return str(get_engine().url).replace('%', '%%')

# Configuración de SQLAlchemy URL
config.set_main_option('sqlalchemy.url', get_engine_url())

# Importar metadata de los modelos
from backend.config.DatabaseHelper import db
from backend.models import Book, Category  # Importa los modelos aquí

# Configurar la metadata para la autogeneración
target_metadata = db.metadata

# Función para migraciones en modo offline
def run_migrations_offline():
    """Ejecutar migraciones en 'modo offline'."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# Función para migraciones en modo online
def run_migrations_online():
    """Ejecutar migraciones en 'modo online'."""
    connectable = get_engine()

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            **current_app.extensions['migrate'].configure_args
        )

        with context.begin_transaction():
            context.run_migrations()

# Detectar si el entorno es offline o online y ejecutar la función correspondiente
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
