import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import logo from "./assets/img/logo-teal.svg";

library.add(faStar);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-vinted--zv98mr42qr6r.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const menu = cart[i];
    total = total + menu.price * menu.quantity;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (menu) => {
    const newCart = [...cart];

    const found = newCart.find((elem) => elem.id === menu.id);

    if (found) {
      found.quantity++;
    } else {
      newCart.push({ ...menu, quantity: 1 });
    }

    setCart(newCart);
  };

  const handleRemoveCart = (menu) => {
    const newCart = [...cart];

    const found = newCart.find((elem) => elem.id === menu.id);

    if (found.quantity === 1) {
      const index = newCart.indexOf(found);
      newCart.splice(index, 1);
    } else {
      found.quantity--;
    }

    setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header>
        <div className="container">
          <div className="header">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="section-1">
            <div className="header-text">
              <h1>{data.restaurant.name}</h1>
              <p className="description">{data.restaurant.description}</p>
            </div>

            <div>
              <img
                className="main-img"
                src={data.restaurant.picture}
                alt="main-img"
              />
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="container cart-section">
            <div className="menu">
              {data.categories.map((title, index) => {
                if (title.meals.length !== 0) {
                  return (
                    <div key={title.name + index} className="menu-category">
                      <h2>{title.name}</h2>
                      <div className="menu-details">
                        {title.meals.map((menu) => {
                          return (
                            <div key={menu.id} className="menu-item">
                              <div
                                className="each-menu"
                                onClick={() => {
                                  handleAddToCart(menu);
                                }}
                              >
                                <div className="menu-text">
                                  <h3>{menu.title}</h3>
                                  <p>{menu.description}</p>

                                  <div className="popular">
                                    <div className="price">
                                      <span className="prix">
                                        {menu.price} €
                                      </span>

                                      {menu.popular && (
                                        <>
                                          <FontAwesomeIcon
                                            icon={faStar}
                                            className="star"
                                          />
                                          <span>Populaire</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="pictures-menu">
                                  {menu.picture && (
                                    <img
                                      className="menu-img"
                                      src={menu.picture}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="cart">
              {cart.length === 0 ? (
                <div className="item-card">
                  <button className="not-valid-cart">Valider mon panier</button>
                  <div className="empty-cart">Votre panier est vide</div>
                </div>
              ) : (
                <div className="item-card">
                  <button className="valid-cart">Valider mon panier</button>
                  <div>
                    {cart.map((menu) => {
                      return (
                        <div key={menu.id}>
                          <button
                            onClick={() => {
                              handleRemoveCart(menu);
                            }}
                          >
                            -
                          </button>
                          <span>{menu.quantity}</span>
                          <button
                            onClick={() => {
                              handleAddToCart(menu);
                            }}
                          >
                            +
                          </button>
                          <span>{menu.title}</span>
                          <span>
                            {(menu.price * menu.quantity).toFixed(2)} €
                          </span>
                        </div>
                      );
                    })}
                    <p>Total {total.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
