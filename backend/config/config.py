import os

API_PREFIX = "api/v1"
SECRET_KEY = "e5f92e895c622c62a88fe7e94e7a49a9"
DATABASE_FILE = os.path.join(os.path.dirname(__file__), '../../db/db.json')
DEFAULT_PAGE_SIZE = 10
DEFAULT_PAGE_NUMBER = 0