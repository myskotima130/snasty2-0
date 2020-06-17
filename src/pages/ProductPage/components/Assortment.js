import React, { useState } from "react";
import styles from "./Assortment.scss";

const Assortment = ({
  assortment: { weight, price },
  title,
  image,
  addProduct,
  isSale
}) => {
  const [count, setCount] = useState(1);
  const addCount = () => setCount(Number(count, 10) + 1);
  const decrCount = () => {
    if (count > 1) setCount(count - 1);
  };
  const onBuyClick = () =>
    addProduct({ image, title, weight, price, quantity: count });
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <p>{weight}</p>
      <div className={styles.priceWrapper}>
        <p className={styles.price}>
          {isSale > 0 && (
            <>
              <svg>
                <line x1="0" y1="65%" x2="80%" y2="25%" />
              </svg>
              <span>
                {((price.toFixed(2) * 100) / (100 - isSale)).toFixed(2)} грн{" "}
              </span>
            </>
          )}
          <span> {price.toFixed(2)} грн</span>
        </p>
        <div className={styles.countWrapper}>
          <div className={styles.decrCount} onClick={decrCount}>
            {"-"}
          </div>
          <input
            className={styles.count}
            value={count}
            onChange={e => {
              if (e.target.value > -1) {
                setCount(e.target.value);
              }
            }}
          />
          <div className={styles.addCount} onClick={addCount}>
            {"+"}
          </div>
        </div>
        <div onClick={onBuyClick} className={styles.buy}>
          Купить
          <img
            alt="basket"
            width="40px"
            src={require("../../../assets/images/basket.png")}
          />
        </div>
      </div>
    </div>
  );
};

export default Assortment;
