import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../../../store/actions/productActions";
import Product from "./components/Product/Product";
import styles from "./Products.scss";

const Products = ({
  products: { products, loading },
  getProducts,
  categories,
  sales
}) => {
  useEffect(() => {
    if (sales) {
      getProducts(`sale=true`);
    } else {
      const category = categories.filter(c => c.isActive === true);
      getProducts(`category=${category[0].category}`);
    }

    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading || products === null ? (
        <div
          className="spinner-border text-success"
          style={{ width: "50px", height: "50px", margin: "5% 40% 5% 20%" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {products.length ? (
            <div className={styles.wrapper}>
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <h2 style={{ margin: "0 auto" }}>Товара нет</h2>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  products: state.products,
  categories: state.categories
});

// const mapDispatchToProps = dispatch => ({
//   getProducts: () => dispatch(getProducts())
// });

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
