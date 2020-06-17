import { SEND_ORDER } from "../actions/types";
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER:
      return action.payload;
    default:
      return state;
  }
};
