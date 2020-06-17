import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Element } from "react-scroll";
import { getProduct } from "../../store/actions/productActions";
import { addProduct } from "../../store/actions/basketActions";
import styles from "./ProductPage.scss";
import Categories from "../../components/Categories/Categories";
import Assortment from "./components/Assortment";
import SliderMenu from "./components/SliderMenu";
import Slider from "react-slick";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const ProductPage = ({ match, product, getProduct, addProduct }) => {
  useEffect(() => {
    getProduct(match.params.id);
    // eslint-disable-next-line
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  if (!product) {
    return (
      <div
        className="spinner-border text-success"
        style={{ width: "50px", height: "50px", margin: "5% 50%" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    const Arrow = props => {
      const { className, onClick } = props;
      return (
        <div className={`${className} ${styles.arrow} `} onClick={onClick} />
      );
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />
    };

    if (isOpen) {
      return (
        <div className={`${styles.sliderWrapper} ${styles.sliderClick}`}>
          <SliderMenu product={product} setIsOpen={setIsOpen} />
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.categories}>
          <Categories />
        </div>
        <div className={styles.categoriesMobile}>
          <Categories mobile />
        </div>
        <div className={styles.wrapperSection}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.titleSection}>
            <div className={styles.sliderWrapper}>
              <div className={styles.slider}>
                <Slider {...settings}>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={styles.productImage}
                      alt={product.title}
                      src={image}
                      onClick={() => setIsOpen(true)}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div>
              <div className={styles.section}>
                <div className={styles.priceRange}>
                  {product.assortment.length > 1 ? (
                    <p>
                      {`${product.assortment[0].price.toFixed(2)} - 
                ${product.assortment[
                  product.assortment.length - 1
                ].price.toFixed(2)} грн`}
                    </p>
                  ) : (
                    <p>{`${product.assortment[0].price.toFixed(2)} грн`}</p>
                  )}
                </div>
                <Link
                  activeClass="active"
                  to="prices"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className={styles.buyRange}
                >
                  Купить
                  <img
                    alt="basket"
                    width="36px"
                    src={require("../../assets/images/basket.png")}
                  />
                </Link>
              </div>
              <div className={styles.description}>
                <h2>Характеристики</h2>
                <span>
                  Материал: <span>{product.material}</span>
                </span>
                <h5>{product.description}</h5>
              </div>
            </div>
          </div>
          <div className={styles.assortmentWrapper}>
            <Element name="prices">
              {product.assortment.map((assortment, index) => (
                <Assortment
                  key={index}
                  image={product.images[0]}
                  addProduct={addProduct}
                  title={product.title}
                  assortment={assortment}
                  isSale={product.isSale}
                />
              ))}
            </Element>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  product: state.products.current
});

export default connect(
  mapStateToProps,
  { getProduct, addProduct }
)(ProductPage);
