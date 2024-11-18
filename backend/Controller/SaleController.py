from flask import Blueprint, jsonify, request
from backend.security.auth import token_required, has_any_role
from backend.util.token_util import get_user_id_from_token
from backend.config.config import API_PREFIX
from backend.services import SaleService

sale_controller = Blueprint('sale', __name__, url_prefix=f"/{API_PREFIX}/")

@sale_controller.route('/', methods=['POST'])
@token_required
def register_sale():
  user_id = get_user_id_from_token()
  if user_id is None:
    return jsonify({"message": "Usuario no autenticado"}), 401

  try:
    data = request.json
    books = data.get("books")
    total_price = data.get("totalPrice")
    shipping_method = data.get("shippingMethod")

    if not books or not total_price or not shipping_method:
        return jsonify({"message": "Faltan datos requeridos"}), 400

    sale = SaleService.register_sale(user_id, books, total_price, shipping_method)
    return jsonify({"message": "Venta registrada exitosamente", "sale": sale}), 201
  except Exception as e:
    return jsonify({"message": str(e)}), 500


@sale_controller.route('/', methods=['GET'])
@token_required
@has_any_role(['ADMIN'])
def get_sales():
  try:
    sales = SaleService.get_all_sales()
    return jsonify(sales), 200
  except Exception as e:
    return jsonify({"message": str(e)}), 500


@sale_controller.route('/user', methods=['GET'])
@token_required
def get_sales_by_user():
  user_id = get_user_id_from_token()
  if user_id is None:
    return jsonify({"message": "Usuario no autenticado"}), 401

  try:
    sales = SaleService.get_sales_by_user(user_id)
    return jsonify(sales), 200
  except Exception as e:
    return jsonify({"message": str(e)}), 500
