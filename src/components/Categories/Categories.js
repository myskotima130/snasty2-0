import React, { useEffect } from "react";
import styles from "./Categories.scss";
import Category from "./components/Category/Category";
import { connect } from "react-redux";
import { getProducts } from "../../store/actions/productActions";
import {
  getCategories,
  setActiveCategory
} from "../../store/actions/categoriesActions";

const Categories = ({
  categories,
  mobile,
  setActiveCategory,
  getCategories,
  getProducts,
  history
}) => {
  useEffect(() => {
    getCategories();
    //eslint-disable-next-line
  }, [categories]);
  if (mobile) {
    return (
      <div className={`${styles.dropdownStyle} dropdown`}>
        <button
          style={{ width: "100%", marginTop: "-50px", background: "#80b529" }}
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Категории
        </button>
        <div
          style={{ width: "100%" }}
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          {categories.map(category => (
            <Category
              key={category.id}
              category={category}
              setActiveCategory={setActiveCategory}
              getProducts={getProducts}
              getCategories={getCategories}
              history={history}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h4>Категории</h4>
      {categories.map(category => (
        <Category
          key={category.id}
          category={category}
          setActiveCategory={setActiveCategory}
          getProducts={getProducts}
          getCategories={getCategories}
          history={history}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    getCategories,
    setActiveCategory,
    getProducts
  }
)(Categories);
