import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import categoriesReducer from "./categoriesReducer";
import basketReducer from "./basketReducer";
import pochtaReducer from "./pochtaReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  products: productsReducer,
  auth: authReducer,
  alerts: alertReducer,
  categories: categoriesReducer,
  basket: basketReducer,
  pochta: pochtaReducer,
  order: orderReducer
});
