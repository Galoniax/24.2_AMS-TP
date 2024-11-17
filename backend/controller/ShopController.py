from flask import Blueprint, jsonify, request
from backend.security.auth import token_required, has_any_role
import json
import os
from datetime import datetime
from backend.config.config import DATABASE_FILE, API_PREFIX
from backend.util.token_util import get_user_id_from_token

shop_controller = Blueprint('shop_controller', __name__, url_prefix=f"/{API_PREFIX}/")

def load_data():
    if os.path.exists(DATABASE_FILE):
        with open(DATABASE_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_data(data):
    with open(DATABASE_FILE, 'w') as f:
        json.dump(data, f, indent=4)
        
@shop_controller.route('/purchase', methods=['POST'])
@token_required
def register_purchase():
    user_id = get_user_id_from_token()
    if user_id is None:
        return jsonify({"message": "Usuario no autenticado"}), 401

    data = load_data()
    purchases = data.get("purchases", [])

    purchase_data = request.json
    user_id = int (purchase_data.get("userId"))
    books = purchase_data.get("books")
    total_price = purchase_data.get("totalPrice")
    timestamp = purchase_data.get("timestamp") or datetime.now().isoformat()
    shipping_method = purchase_data.get("shippingMethod")

    new_purchase = {
        "userId": user_id,
        "books": books,
        "totalPrice": total_price,
        "timestamp": timestamp,
        "shippingMethod": shipping_method
    }

    purchases.append(new_purchase)
    data['purchases'] = purchases
    save_data(data)

    return jsonify({"message": "Compra registrada exitosamente"}), 201

# ver ventas (admin)

@shop_controller.route('/sales', methods=['GET'])
@token_required
@has_any_role(['ADMIN'])
def get_sales():
    with open(DATABASE_FILE) as db_file:
        data = json.load(db_file)
        purchases = data.get('purchases', [])
        return jsonify(purchases), 200

# ver compras (cliente)

@shop_controller.route('/purchases_by_user', methods=['GET'])
@token_required
def get_purchases_by_user():
    user_id = get_user_id_from_token()
    if user_id is None:
        return jsonify({"message": "Usuario no autenticado"}), 401

    with open(DATABASE_FILE) as db_file:
        data = json.load(db_file)
        purchases = data.get('purchases', [])
        
        # Filtrar las compras que pertenezcan al usuario
        user_purchases = [purchase for purchase in purchases if purchase.get("userId") == user_id]

    return jsonify(user_purchases), 200