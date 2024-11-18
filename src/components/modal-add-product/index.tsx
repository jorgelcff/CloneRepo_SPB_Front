import React, { useState } from "react";
import "./styles.css";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  product: Product;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(product, quantity);
    onClose();
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar ao Carrinho</h2>
        <div className="modal-content">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">Preço: R$ {product.price.toFixed(2)}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="quantity">Quantidade</label>
            <div className="quantity-controls">
              <button
                type="button"
                onClick={handleDecrement}
                className="quantity-button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.stock}
                required
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="quantity-button"
              >
                +
              </button>
            </div>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="add-button">
              Adicionar ao Carrinho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToCartModal;
