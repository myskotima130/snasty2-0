import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCT, SET_LOADING } from "./types";
// import { setAlert } from "../reducers/alertReducer";

export const getProducts = query => async dispatch => {
  dispatch({ type: SET_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.get(`api/products?${query}`, null, config);

    const data = res.data.map(item => {
      if (item.isSale > 0) {
        const saleRate = (100 - item.isSale / 2) / 100;
        const newAssortment = item.assortment.map(i => ({
          weight: i.weight,
          price: i.price * saleRate
        }));
        return { ...item, assortment: newAssortment };
      }
      return item;
    });

    dispatch({
      type: GET_PRODUCTS,
      payload: data
    });
  } catch (error) {
    // setAlert(error.response.data);
  }
};

export const getProduct = id => async dispatch => {
  dispatch({ type: SET_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.get(`/api/products/${id}`, null, config);

    if (res.data.isSale > 0) {
      const newAssortment = res.data.assortment.map(i => ({
        weight: i.weight,
        price: i.price * 1.05 * 0.9
      }));
      console.log(newAssortment);
      dispatch({
        type: GET_PRODUCT,
        payload: { ...res.data, assortment: newAssortment }
      });
    } else {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      });
    }
  } catch (error) {
    // setAlert(error.response.data);
  }
};
