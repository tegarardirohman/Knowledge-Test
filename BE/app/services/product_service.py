from app.models.product import db, Product
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import NotFound, BadRequest

# Menangani error pada pembuatan produk
def create_product(name, description, price):
    try:
        # Validasi input
        if not name or not description or not price:
            raise BadRequest("Missing required fields: name, description, or price")

        new_product = Product(name=name, description=description, price=price)
        db.session.add(new_product)
        db.session.commit()
        return new_product
    except BadRequest as e:
        db.session.rollback()
        raise e  # Raise BadRequest exception
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception(f"Database error: {str(e)}")
    except Exception as e:
        db.session.rollback()
        raise Exception(f"Error while creating product: {str(e)}")

# Menangani error saat mengambil semua produk
def get_all_products():
    try:
        return Product.query.all()
    except SQLAlchemyError as e:
        raise Exception(f"Error fetching products: {str(e)}")

# Menangani error saat mengambil produk berdasarkan ID
def get_product_by_id(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            raise NotFound(f"Product with ID {product_id} not found")
        return product
    except NotFound as e:
        raise e
    except SQLAlchemyError as e:
        raise Exception(f"Error fetching product with ID {product_id}: {str(e)}")
    except Exception as e:
        raise Exception(f"Unexpected error: {str(e)}")

# Menangani error saat memperbarui produk
def update_product(product_id, name, description, price):
    try:
        product = Product.query.get(product_id)
        if not product:
            raise NotFound(f"Product with ID {product_id} not found")
        
        # Validasi input
        if not name or not description or not price:
            raise BadRequest("Missing required fields: name, description, or price")
        
        product.name = name
        product.description = description
        product.price = price
        db.session.commit()
        return product
    except NotFound as e:
        raise e
    except BadRequest as e:
        db.session.rollback()
        raise e
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception(f"Error updating product: {str(e)}")
    except Exception as e:
        db.session.rollback()
        raise Exception(f"Unexpected error while updating product: {str(e)}")

# Menangani error saat menghapus produk
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            raise NotFound(f"Product with ID {product_id} not found")
        
        db.session.delete(product)
        db.session.commit()
        return True
    except NotFound as e:
        raise e
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception(f"Error deleting product with ID {product_id}: {str(e)}")
    except Exception as e:
        db.session.rollback()
        raise Exception(f"Unexpected error while deleting product: {str(e)}")
