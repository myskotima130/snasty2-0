import React, { Component } from "react";
import Slider from "react-slick";
import onClickOutside from "react-onclickoutside";
import styles from "./Slider.scss";

class SliderMenu extends Component {
  myClickOutsideHandler() {
    this.props.setIsOpen(false);
  }

  render() {
    console.log(this.props);
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

    return (
      <div className={styles.slider}>
        <Slider {...settings}>
          {this.props.product.images.map((image, index) => (
            <img
              key={index}
              className={styles.productImage}
              alt={this.props.product.title}
              src={image}
            />
          ))}
        </Slider>
      </div>
    );
  }
}

const clickOutsideConfig = {
  handleClickOutside: function(instance) {
    return instance.myClickOutsideHandler;
  }
};

export default onClickOutside(SliderMenu, clickOutsideConfig);
