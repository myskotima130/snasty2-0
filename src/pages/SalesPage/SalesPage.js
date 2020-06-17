import React from "react";
import styles from "./SalesPage.scss";
import Ads from "../../components/Ads/Ads";
import Products from "../MainPage/components/Products/Products";

const SalesPage = () => {
  return (
    <div className={styles.wrapper}>
      <Ads />
      <div>
        <h1 className={styles.title}>Скидки этой недели</h1>
        <Products sales />
      </div>
    </div>
  );
};

export default SalesPage;
