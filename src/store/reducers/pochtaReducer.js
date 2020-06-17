import { GET_CITY, GET_PRICE } from "../actions/types";
const initialState = {
  warehouses: [],
  price: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY:
      return { ...state, warehouses: action.payload };
    case GET_PRICE:
      return { ...state, price: action.payload };
    default:
      return state;
  }
};
