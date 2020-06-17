import React, { useState, useEffect } from "react";
import styles from "./BasketItem.scss";

const BasketItem = ({
  item: { title, image, weight, price, quantity },
  setProduct,
  removeProduct
}) => {
  const [count, setCount] = useState(quantity);
  console.log(image);
  useEffect(() => {
    setCount(quantity);
    //eslint-disable-next-line
  }, [quantity]);
  const addCount = () => {
    setProduct({ title, image, weight, price, quantity: count + 1 });
    setCount(Number(count, 10) + 1);
  };
  const decrCount = () => {
    if (count > 1) {
      setProduct({
        title,
        image,
        weight,
        price,
        quantity: count - 1
      });
      setCount(count - 1);
    }
  };
  const onCloseClick = () => removeProduct({ title, weight });

  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <img alt={title} src={image} />
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>
          {title} {weight} г
        </h4>
        <div className={styles.countSection}>
          <p className={styles.price}>{price.toFixed(2)} грн</p>
          <div className={styles.countWrapper}>
            <div className={styles.decrCount} onClick={decrCount}>
              {"-"}
            </div>
            <input
              className={styles.count}
              value={count}
              onChange={e => {
                if (e.target.value > -1) {
                  setCount(Number(e.target.value, 10));
                  setProduct({
                    title,
                    image,
                    weight,
                    price,
                    quantity: Number(e.target.value, 10)
                  });
                }
              }}
            />
            <div className={styles.addCount} onClick={addCount}>
              {"+"}
            </div>
          </div>
          <p className={styles.sum}>{(price * count).toFixed(2)} грн</p>
        </div>
      </div>
      <span onClick={onCloseClick} className={styles.close}>
        x
      </span>
    </div>
  );
};

export default BasketItem;
