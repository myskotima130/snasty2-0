import { GET_CATEGORIES, SET_ACTIVE_CATEGORIES } from "../actions/types";
const initialState = [
  {
    id: "asd1",
    category: "Все товары",
    isActive: true
  },
  {
    id: "asd2",
    category: "Воблеры",
    isActive: false
  },
  {
    id: "asd3",
    category: "Груза",
    isActive: false
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return state;
    case SET_ACTIVE_CATEGORIES: {
      const newState = state.map(({ category, id }) => ({
        id,
        category,
        isActive: action.payload.category === category ? true : false
      }));
      return newState;
    }
    default:
      return state;
  }
};
