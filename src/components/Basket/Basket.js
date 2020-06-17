import React, { useEffect, useState } from "react";
import styles from "./Basket.scss";
import BasketItem from "./components/BasketItem";
import { logout } from "../../store/actions/authActions";
import { setProduct, removeProduct } from "../../store/actions/basketActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";
import { loadUser } from "../../store/actions/authActions";
import { getCities, getPrice } from "../../store/actions/pochtaActions";
import { sendOrder } from "../../store/actions/orderActions";
import { setAlert } from "../../store/actions/alertActions";

const Basket = ({
  auth: { isAuthenticated, user, loading },
  basket,
  logout,
  loadUser,
  setProduct,
  removeProduct,
  setAlert,
  getCities,
  getPrice,
  price,
  sendOrder,
  warehouses
}) => {
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    warehouse: ""
  });

  useEffect(() => {
    loadUser();
    localStorage.setItem("basket", JSON.stringify(basket));
    getPiceParcel();
    //eslint-disable-next-line
  }, [basket, warehouses, orderInfo.warehouse]);
  const text = basket.length ? "text" : "disable";
  const [isOrder, setIsOrder] = useState(false);
  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    phone: true
  });

  const getPiceParcel = () => {
    if (orderInfo.warehouse && warehouses.length) {
      const recipient = warehouses[0].cityRef;
      const weight =
        basket.reduce(
          (sum, obj) => sum + parseInt(obj.weight, 10) * obj.quantity,
          0
        ) / 1000;
      const cost = basket
        .reduce(
          (sum, obj) =>
            sum +
            obj.price *
              obj.quantity *
              ((100 - (user ? user.discount : 0)) / 100),
          0
        )
        .toFixed(2);
      console.log(recipient, weight, cost);
      getPrice(recipient, weight, cost);
    }
  };

  const onChangeCity = e => {
    getCities(e.target.value);
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const onChange = e => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
    if (e.target.name === "warehouse" && warehouses.length) {
      getPiceParcel();
      console.log("get price");
    }
  };

  const onClickOrder = () => {
    if (isOrder) {
      //eslint-disable-next-line
      const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailRes = emailRe.exec(orderInfo.email);
      if (!emailRes) {
        setAlert("Введите корректо Email", "danger");
        setIsValid({ ...isValid, email: false });
        setTimeout(() => setIsValid({ ...isValid, email: true }), 3500);
      }

      if (!orderInfo.phone) {
        setAlert("Введите Ваш телефонный номер", "danger");
        setIsValid({ ...isValid, phone: false });
        setTimeout(() => setIsValid({ ...isValid, phone: true }), 3500);
      }

      const nameRe = /[А-Яа-я]+\s[А-Яа-я]+/;
      const nameRes = nameRe.exec(orderInfo.name);
      if (!nameRes) {
        setAlert("Введите корректно Фамилию и Имя", "danger");
        setIsValid({ ...isValid, name: false });
        setTimeout(() => setIsValid({ ...isValid, name: true }), 3500);
      }

      if (emailRes && orderInfo.phone && nameRes) {
        const data = {
          recipient: orderInfo,
          items: [
            ...basket.map(({ price, quantity, title, weight }) => ({
              price,
              quantity,
              title,
              weight
            }))
          ],
          total: basket
            .reduce(
              (sum, obj) =>
                sum +
                obj.price *
                  obj.quantity *
                  ((100 - (user ? user.discount : 0)) / 100),
              0
            )
            .toFixed(2),
          delivery: price
        };
        sendOrder(data);
      }
    }

    if (basket.length > 0) {
      setIsOrder(true);
    } else {
      setAlert("Вы ничего не добавили в корзину", "warning");
    }
  };

  const onClickBack = () => setIsOrder(false);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <div className={styles.welcom}>
      <Link className={styles.welcomText} to="#">
        {user && user.name}, добро пожаловать{" "}
      </Link>
      <Link className={styles.logout} onClick={onLogout} href="#!" to="#">
        <i className="fas fa-sign-out-alt" />
        <span className="hide-sm">Выйти</span>
      </Link>
    </div>
  );

  const guestLinks = (
    <div className={styles.header}>
      <Link className={styles.register} to="/registration">
        Регистрируйся и получи скидку
      </Link>
      <Link className={styles.login} to="/login">
        Вход
      </Link>
    </div>
  );

  return loading ? (
    <div
      className="spinner-border text-success"
      style={{ width: "50px", height: "50px", margin: "5% 50%" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.mainSection}>
        {isAuthenticated ? authLinks : guestLinks}
        <div className={styles.callUs}>
          <h3 className={styles.call}>Принимаем Ваши заказы</h3>
          <h3 className={styles.number}>096 827 71 74</h3>
        </div>
        <div>
          {isOrder ? (
            <div className={styles.form}>
              <div onClick={onClickBack} className={styles.yourOrderTitle}>
                <i className="material-icons">reply</i> Ваш заказ{" "}
                <span>{basket.length}</span>
              </div>
              <form>
                <label style={{ color: isValid.name ? "#325000" : "red" }}>
                  Фамилия и Имя
                </label>
                <div className={styles.input}>
                  <input
                    type="text"
                    placeholder="Введите фамилию и имя"
                    value={orderInfo.name}
                    name="name"
                    onChange={onChange}
                  />
                </div>
                <label style={{ color: isValid.phone ? "#325000" : "red" }}>
                  Телефон
                </label>
                <div className={styles.input}>
                  <MaskedInput
                    mask={[
                      "+",
                      "3",
                      "8",
                      "(",
                      /[0-9]/,
                      /\d/,
                      /\d/,
                      ")",
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/
                    ]}
                    className="form-control"
                    type="tel"
                    placeholder="Введите телефон"
                    name="phone"
                    onChange={onChange}
                    value={orderInfo.phone}
                  />
                </div>
                <div>
                  <label style={{ color: isValid.email ? "#325000" : "red" }}>
                    Email
                  </label>
                  <div className={styles.input}>
                    <input
                      type="email"
                      placeholder="Введите email"
                      onChange={onChange}
                      name="email"
                      value={orderInfo.email}
                    />
                  </div>
                  <label>Город</label>
                  <div className={styles.input}>
                    <input
                      type="text"
                      placeholder="Введите город"
                      onChange={onChangeCity}
                      name="city"
                      value={orderInfo.city}
                    />
                  </div>
                  <label>Отделение Новой Почты</label>
                  <div className={styles.input}>
                    <select
                      className="browser-default"
                      placeholder="Введите телефон"
                      name="warehouse"
                      value={orderInfo.warehouse}
                      onChange={onChange}
                    >
                      <option>Выберите отделение</option>
                      {warehouses.map((warehouse, index) => (
                        <option
                          key={index}
                          style={{ color: "red" }}
                          value={warehouse.description}
                        >
                          {warehouse.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <>
              {basket.length ? (
                <div className={styles.productsList}>
                  {basket.map((basketItem, index) => (
                    <BasketItem
                      key={index}
                      item={basketItem}
                      setProduct={setProduct}
                      removeProduct={removeProduct}
                    />
                  ))}
                  {isAuthenticated ? (
                    <label>{`Ваша скидка: ${user.discount}%`}</label>
                  ) : (
                    <div>Зарегистрируйтесь и получите накопительную скидку</div>
                  )}
                </div>
              ) : (
                <div className={styles.yourOrder}>
                  <h4>
                    Ваш заказ
                    <br />
                    появится тут
                  </h4>
                  <img
                    alt="karp"
                    width="200px"
                    hspace="25%"
                    src={require("../../assets/images/karp.png")}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        {basket.length > 0 && (
          <>
            {price > 0 && isOrder && (
              <div className={styles.sum} style={{ fontSize: "18px" }}>
                Доставка Новой Почты: {price} грн
              </div>
            )}
            <div className={styles.sum}>
              Сумма заказа:{" "}
              {basket
                .reduce(
                  (sum, obj) =>
                    sum +
                    obj.price *
                      obj.quantity *
                      ((100 - (user ? user.discount : 0)) / 100),
                  0
                )
                .toFixed(2)}
              {" грн"}
            </div>
          </>
        )}
        <div onClick={onClickOrder} className={styles.buy}>
          <h3 className={styles[text]}>Оформить заказ</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  basket: state.basket,
  warehouses: state.pochta.warehouses,
  price: state.pochta.price
});

export default connect(
  mapStateToProps,
  {
    logout,
    setProduct,
    removeProduct,
    setAlert,
    loadUser,
    getCities,
    getPrice,
    sendOrder
  }
)(Basket);
