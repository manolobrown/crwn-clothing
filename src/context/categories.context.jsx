import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORIES_ACTION_TYPES = {
  CATEGORIES_MAP: "CATEGORIES_MAP",
};

const INITIAL_STATE = {
  categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case CATEGORIES_ACTION_TYPES.CATEGORIES_MAP:
        return {
          ...state,
          categoriesMap: payload,
        };
      default:
        throw new Error(
          `Unsupported action type: ${type} in categoriesReducer`
        );
    }
  };

  const [{ categoriesMap }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const setCategoriesMap = (categoriesMap) => {
    dispatch(
      createAction(CATEGORIES_ACTION_TYPES.CATEGORIES_MAP, categoriesMap)
    );
  };
  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategories();
  }, []);
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
