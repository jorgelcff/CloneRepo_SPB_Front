import { useEffect, useState } from "react";
import "./styles.css";
import { Card } from "../../components/card/card";
import ProductService from "../../services/ProductSerivce";

const productService = new ProductService();

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getAllProducts();
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      // Verifica se o produto já está no carrinho
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Atualiza a quantidade do produto existente
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Adiciona o novo produto ao carrinho
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="container">
      <section className="promo-section background-image">
        <div className="promo-content">
          <h1 className="promo-title">Melu</h1>
          <div className="promo-copy">
            <div className="t-h4">
              <p>
                <b>Cuide da Sua pele</b>
              </p>
            </div>
            <div className="promo-link-group">
              <a
                aria-label="Get Started Link"
                href="htmls/"
                className="promo-link"
              >
                Ver mais
              </a>
              <a
                aria-label="Get Started Link"
                href="htmls/"
                className="promo-link"
              >
                Melu
              </a>
            </div>
          </div>
        </div>
      </section>
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
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
