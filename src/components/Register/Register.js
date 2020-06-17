import React, { useState, useEffect } from "react";
import { setAlert } from "../../store/actions/alertActions";
import { register, clearErrors } from "../../store/actions/authActions";
import { connect } from "react-redux";
import styles from "./Register.scss";

const Register = ({
  history,
  auth: { error, isAuthenticated },
  register,
  clearErrors,
  setAlert
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Данный пользователь уже существует") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Пожалуйста введите все данные", "danger");
    } else if (password !== password2) {
      setAlert("Пароли не совпадают", "danger");
    } else if (name.length > 20) {
      setAlert("Имя не должно превышать 20 символов", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className={`${styles.wrapper} form-container`}>
      <h1 className={styles.title}>Регистрация</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Имя</label>
          <div className={styles.input}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              max="20"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div className={styles.input}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <div className={styles.input}>
            <input
              autoComplete="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password2">Подтвердите пароль</label>
          <div className={styles.input}>
            <input
              autoComplete="password"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <input className={styles.submit} type="submit" value="Register" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, clearErrors, setAlert }
)(Register);
