import React, { useEffect } from "react";
import Products from "./components/Products/Products";
import styles from "./MainPage.scss";
import { connect } from "react-redux";
import { getCategories } from "../../store/actions/categoriesActions";
import Categories from "../../components/Categories/Categories";

const MainPage = ({ getCategories, history }) => {
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.categories}>
          <Categories history={history} />
        </div>
        <div className={styles.categoriesMobile}>
          <Categories history={history} mobile />
        </div>
        <Products />
      </div>
    </div>
  );
};

export default connect(
  null,
  { getCategories }
)(MainPage);
