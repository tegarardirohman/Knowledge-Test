from flask import Blueprint, request, jsonify
from app.services.product_service import create_product, get_all_products, get_product_by_id, update_product, delete_product
from flask_jwt_extended import jwt_required
from flasgger import swag_from

product_bp = Blueprint('product', __name__, url_prefix='/api/v1/products')

# Endpoint untuk mendapatkan semua produk
@product_bp.route('/', methods=['GET'])
@swag_from({
    'tags': ['Products'],
    'description': 'Get all products.',
    'responses': {
        200: {
            'description': 'List of all products',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'name': {'type': 'string'},
                        'description': {'type': 'string'},
                        'price': {'type': 'number'}
                    }
                }
            }
        }
    }
})
def get_products():
    try:
        products = get_all_products()
        return jsonify([{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price} for p in products]), 200
    except Exception:
        return jsonify({'message': 'Internal server error while fetching products'}), 500

# Endpoint untuk mendapatkan produk berdasarkan ID
@product_bp.route('/<int:product_id>', methods=['GET'])
@swag_from({
    'tags': ['Products'],
    'description': 'Get product by ID.',
    'parameters': [
        {
            'name': 'product_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Product data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'}
                }
            }
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def get_product(product_id):
    try:
        product = get_product_by_id(product_id)
        if product:
            return jsonify({'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price}), 200
        return jsonify({'message': 'Product not found'}), 404
    except Exception:
        return jsonify({'message': 'Internal server error while fetching product'}), 500

# Endpoint untuk menambahkan produk baru
@product_bp.route('/', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Products'],
    'description': 'Add a new product.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'description': 'Product data',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'}
                },
                'required': ['name', 'description', 'price']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Product created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'}
                }
            }
        },
        400: {
            'description': 'Missing required fields'
        }
    }
})
def add_product():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    
    if not name or not description or not price or not isinstance(price, (int, float)):
        return jsonify({'message': 'Missing or invalid required fields'}), 400

    try:
        new_product = create_product(name, description, price)
        return jsonify({'id': new_product.id, 'name': new_product.name, 'description': new_product.description, 'price': new_product.price}), 201
    except Exception:
        return jsonify({'message': 'Internal server error while creating product'}), 500

# Endpoint untuk memperbarui produk
@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Products'],
    'description': 'Update an existing product.',
    'parameters': [
        {
            'name': 'product_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to update'
        },
        {
            'name': 'body',
            'in': 'body',
            'description': 'Updated product data',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Product updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'}
                }
            }
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def update_product_view(product_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')

    try:
        updated_product = update_product(product_id, name, description, price)
        if updated_product:
            return jsonify({'id': updated_product.id, 'name': updated_product.name, 'description': updated_product.description, 'price': updated_product.price}), 200
        return jsonify({'message': 'Product not found'}), 404
    except Exception:
        return jsonify({'message': 'Internal server error while updating product'}), 500

# Endpoint untuk menghapus produk
@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Products'],
    'description': 'Delete a product.',
    'parameters': [
        {
            'name': 'product_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Product deleted successfully'
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def delete_product_view(product_id):
    try:
        if delete_product(product_id):
            return jsonify({'message': 'Product deleted successfully'}), 200
        return jsonify({'message': 'Product not found'}), 404
    except Exception:
        return jsonify({'message': 'Internal server error while deleting product'}), 500
