import {
  GET_BASKET,
  ADD_PRODUCT,
  SET_PRODUCT,
  REMOVE_PRODUCT
} from "../actions/types";
const initialState = localStorage.getItem("basket")
  ? JSON.parse(localStorage.getItem("basket"))
  : [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BASKET:
      return state;
    case SET_PRODUCT: {
      const newState = state.map(prod => {
        if (
          prod.title === action.payload.title &&
          prod.weight === action.payload.weight
        ) {
          return action.payload;
        }
        return prod;
      });

      return newState;
    }
    case ADD_PRODUCT: {
      let flag = false;
      const newState = state.map(prod => {
        if (
          prod.title === action.payload.title &&
          prod.weight === action.payload.weight
        ) {
          flag = true;
          prod.quantity = prod.quantity + action.payload.quantity;
          return prod;
        }
        return prod;
      });
      if (flag) {
        return [...newState];
      }
      return [...newState, action.payload];
    }
    case REMOVE_PRODUCT:
      return [
        //eslint-disable-next-line
        ...state.filter(prod => {
          if (
            prod.title === action.payload.title &&
            prod.weight === action.payload.weight
          ) {
          } else {
            return prod;
          }
        })
      ];
    default:
      return state;
  }
};
