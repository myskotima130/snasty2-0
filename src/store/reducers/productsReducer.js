import { SET_LOADING, GET_PRODUCTS, GET_PRODUCT } from "../actions/types";

const initialState = {
  products: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_PRODUCTS: {
      return {
        ...state,
        loading: false,
        products: action.payload
      };
    }
    case GET_PRODUCT: {
      return {
        ...state,
        loading: false,
        current: action.payload
      };
    }
    default:
      return state;
  }
};
