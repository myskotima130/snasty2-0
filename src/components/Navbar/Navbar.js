import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.scss";
import { connect } from "react-redux";
import Basket from "../Basket/Basket";

const Navbar = basket => {
  const basketLength = basket.basket.length;
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <>
      <nav className={`${styles.wrapper} navbar navbar-expand-sm navbar-light`}>
        <div className={styles.wrapperLinks}>
          <Link
            className={`${styles.link}`}
            to="/"
            onClick={() => setIsDisplayed(false)}
          >
            Снасти
          </Link>
          <button
            className="navbar-toggler float-right mt-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`${styles.links} collapse navbar-collapse`}
            id="navbarNav"
          >
            <ul className={`navbar-nav`}>
              <li className="nav-item">
                <Link className={styles.sales} to="/sales">
                  Акции
                </Link>
              </li>
              <li className="nav-item">
                <Link className={styles.link} to="/contacts">
                  Контакты
                </Link>
              </li>

              <li className="nav-item">
                <Link className={styles.link} to="/delivery">
                  Доставка
                </Link>
              </li>
              <li className="nav-item">
                <Link className={styles.link} to="/about">
                  О нас
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <span onClick={() => setIsDisplayed(!isDisplayed)}>
          <img
            alt="basket"
            width="40px"
            src={require("../../assets/images/basket.png")}
          />
          {basketLength > 0 && (
            <span className={styles.basketLength}>{basketLength}</span>
          )}
        </span>
      </nav>
      {isDisplayed && (
        <div className={styles.basketWrapper}>
          <Basket />
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  basket: state.basket
});

export default connect(
  mapStateToProps,
  null
)(Navbar);
