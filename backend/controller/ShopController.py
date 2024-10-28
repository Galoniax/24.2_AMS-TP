from flask import Blueprint, jsonify, request
from backend.controller.UserController import save_data
from backend.security.auth import token_required, has_any_role
import json
import os
import requests
from datetime import datetime
from backend.config.config import DATABASE_FILE, API_PREFIX
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