import React from "react";
import styles from "./Product.scss";
import { Link } from "react-router-dom";

const Product = ({ product: { title, id, images, assortment, isSale } }) => {
  return (
    <div className={styles.wrapper}>
      <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
        <img className={styles.productImage} alt="product" src={images[0]} />
      </Link>
      <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.priceBasket}>
          {isSale > 0 && <div className={styles.saleCircle}>-{isSale}%</div>}
          <h3 className={styles.price}>{assortment[0].price.toFixed(2)} грн</h3>
          <div className={styles.img}>
            <img
              alt="basket"
              width="40px"
              src={require("../../../../../../assets/images/basket.png")}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
