import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductSerivce";
import AddToCartModal from "../../components/modal-add-product";
import CartService from "../../services/CartService";
import { Card } from "../../components/card/card";

const productService = new ProductService();

const cartService = new CartService();

const BocaPage: React.FC = () => {
  const categoria = "cat-4";
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    document.title = "Boca - BMQ";
  }, []);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getAllProducts(categoria);
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  const handleAddToCart = async (product: any, quantity: number) => {
    try {
      await cartService.addItemToCart(user.id, {
        productId: product.id,
        quantity,
      });
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
    }
  };
  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          fontSize: "4rem",
          margin: "1rem",
          color: "#999ad2",
        }}
      >
        Produtos para a Boca
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1rem",
          margin: "1rem 0",
          color: "#999ad2",
        }}
      >
        Welcome to the boca page. Here you will find a variety of boca products
        to suit your needs.
      </p>

      {isLoading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="card-grid-items">
          {data.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        product={selectedProduct}
      />
    </div>
  );
};

export default BocaPage;
