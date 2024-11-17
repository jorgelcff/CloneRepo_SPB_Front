import { useState } from "react";
import "./styles.css";
import { Card } from "../../components/card/card";
import { useFoodData } from "../../hooks/useFoodData";
import { CreateModal } from "../../components/card/createModal/create-modal";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Home: React.FC = () => {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="container">
      <Header />
      {/* <a href="#" className="logo-container">
        <img
          src="https://front-bmq.vercel.app/midia/logo2.png"
          className="logo"
          alt="Logo Bem me quer"
        />
      </a>
      <section id="header">
        <div className="navbar-container">
          <ul id="navbar">
            <li>
              <a href="htmls/skincare.html">Skincare</a>
            </li>
            <li>
              <a href="htmls/pele.html">Pele</a>
            </li>
            <li>
              <a href="htmls/olhos.html">Olhos</a>
            </li>
            <li>
              <a href="htmls/boca.html">Boca</a>
            </li>
            <li>
              <a href="htmls/vegan.html">Vegan</a>
            </li>
          </ul>
        </div>
        <div className="navbar-container">
          <form className="search-form" action="#" method="get">
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar..."
            />
          </form>
        </div>
      </section>
       */}
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
      <div className="card-grid">
        {data?.map((foodData) => (
          <Card
            key={foodData.id}
            price={foodData.price}
            title={foodData.title}
            image={foodData.image}
          />
        ))}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>novo</button>
    </div>
  );
};

export default Home;
