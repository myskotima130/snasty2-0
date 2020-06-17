import React, { useState, useEffect } from "react";
import { login, clearErrors } from "../../store/actions/authActions";
import { setAlert } from "../../store/actions/alertActions";
import { connect } from "react-redux";
import styles from "./Login.scss";

const Login = ({
  history,
  auth: { error, isAuthenticated },
  setAlert,
  clearErrors,
  login
}) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Данные неверны") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Пожалуйста заполните все поля", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className={`${styles.wrapper} form-container`}>
      <h1 className={styles.title}>Вход в интернет-магазин</h1>
      <form onSubmit={onSubmit}>
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
            />
          </div>
        </div>
        <input className={styles.submit} type="submit" value="Login" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login, setAlert, clearErrors }
)(Login);
