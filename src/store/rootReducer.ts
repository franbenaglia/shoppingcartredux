import { combineReducers } from "@reduxjs/toolkit";
import { shoppingCartReducer } from "./shoppingcart/reducer";

// Import other reducers as needed

export const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
