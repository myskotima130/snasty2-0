import { GET_BASKET, ADD_PRODUCT, SET_PRODUCT, REMOVE_PRODUCT } from "./types";

export const getBasket = () => dispatch => dispatch({ type: GET_BASKET });

export const addProduct = product => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: product
  });
};

export const setProduct = product => dispatch => {
  dispatch({
    type: SET_PRODUCT,
    payload: product
  });
};

export const removeProduct = product => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: product
  });
};
