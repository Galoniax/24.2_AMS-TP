import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='templates/assets')

@app.route('/')
def root(): 
    return render_template('index.html')


# Función para cargar los datos del archivo db.json
def load_users():
    try:
        with open('utils/mocks/db.json', 'r') as file:
            data = json.load(file)
            return data['users']  # Retorna la lista de usuarios
    except FileNotFoundError:
        return []
    
    

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    dni = data.get('dni')
    fecha_nacimiento = data.get('date')

    # Cargar la lista de usuarios
    users = load_users()

    # Verificar si el usuario ya existe
    for user in users:
        if user['email'] == email:
            return jsonify({"error": "El usuario ya existe"}), 400

    # Crear el nuevo usuario
    new_user = {
        "email": email,
        "password": password
    }
    
    new_client = {
        "name": name,
        "dni": dni,
        "date": fecha_nacimiento,
        "vip": False
    }
    
    
    
    
    # Agregar el nuevo usuario a la lista
    users.append(new_user)
    
    
    
    

    # Guardar los cambios en el archivo db.json
    with open('utils/mocks/db.json', 'w') as file:
        json.dump({"users": users}, file)
        

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Cargar la lista de usuarios
    users = load_users()

    # Verificar si el email y password coinciden con algún usuario
    for user in users:
        if user['email'] == email and user['password'] == password:
            return jsonify({"message": "Inicio de sesión exitoso"}), 200
    
    return jsonify({"error": "Credenciales incorrectas"}), 401




if __name__ == "__main__":
    app.run(debug=True)