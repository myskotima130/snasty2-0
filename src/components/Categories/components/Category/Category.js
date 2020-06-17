import React, { useState } from "react";
import styles from "./Category.scss";
import { Redirect } from "react-router-dom";

const Category = ({
  category: { category, isActive },
  setActiveCategory,
  getProducts,
  getCategories,
  history
}) => {
  const [redirect, setRedirect] = useState(false);
  const onClick = () => {
    setActiveCategory({ category, isActive: true });
    getCategories();
    getProducts(`category=${category}`);
    if (!history) {
      setRedirect(true);
    }
  };
  const active = isActive ? "active" : "passive";
  if (redirect) return <Redirect to="/" />;
  return (
    <h3 className={styles[active]} onClick={onClick}>
      {category}
    </h3>
  );
};

export default Category;
