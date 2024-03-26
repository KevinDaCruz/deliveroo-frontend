import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

import logo from "./assets/img/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-vinted--zv98mr42qr6r.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className="container">
            <div className="menu">
              {data.categories.map((title, index) => {
                if (title.meals.length !== 0) {
                  return (
                    <>
                      <div className="menu-category">
                        <h2 key={title.name + index}>{title.name}</h2>
                        <div className="menu-details">
                          {title.meals.map((menu) => {
                            return (
                              <>
                                <div className="menu-item">
                                  <div className="each-menu">
                                    <div className="menu-text">
                                      <h3>{menu.title}</h3>
                                      <p>{menu.description}</p>
                                      <div className="price">
                                        <span className="prix">
                                          {menu.price} €
                                        </span>
                                        <div>
                                          <FontAwesomeIcon icon={faStar} />
                                          {menu.popular && (
                                            <span className="popular">
                                              Populaire
                                            </span>
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
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
