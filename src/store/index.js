import recipeSlice from "../slice/recipeSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    recipes: recipeSlice,
  },
});
