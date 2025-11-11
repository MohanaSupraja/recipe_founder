import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
// ✅ Fetch all recipes (e.g., random meals or a default list)
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(err.response.data?.message || "Failed to fetch recipes.");
    }
  }
);

// ✅ Fetch recipes by search
export const fetchRecipesBySearch = createAsyncThunk(
  "recipes/fetchRecipesBySearch",
  async (search, { rejectWithValue }) => {
    try {
        console.log("Searching recipes with query:", search);
      const response = await axios.get(`${BASE_URL}/search.php?s=${search}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(err.response.data?.message || "Failed to fetch search results.");
    }
  }
);

// ✅ Fetch meal by ID
export const fetchMealById = createAsyncThunk(
  "recipes/fetchMealById",
  async (id, { rejectWithValue }) => {
    try {
        console.log("Fetching meal with ID:", id,"url:",`${BASE_URL}/lookup.php?i=${id}`);

      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      
      return response.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(err.response.data?.message || "Failed to fetch meal details.");
    }
  }
);

// www.themealdb.com/api/json/v1/1

export const fetchMealByCategory = createAsyncThunk(
  "recipes/fetchMealByCategory",
  async (category, { rejectWithValue }) => {
    try {
        console.log("Fetching meal with category:", category);

      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(err.response.data?.message || "Failed to fetch meal details.");
    }
  }
);


// ✅ Initial State
const initialState = {
  allRecipes: [],
  searchRecipes: [],
  mealDetails: {},
  categoryRecipies: [],
  allStatus: "idle",
  searchStatus: "idle",
  mealStatus: "idle",
  categoryStatus: "idle",
  allError: null,
  searchError: null,
  mealError: null,
  categoryError: null,
};

// ✅ Slice
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch all recipes ---
      .addCase(fetchRecipes.pending, (state) => {
        state.allStatus = "loading";
        state.allError = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.allStatus = "succeeded";
        state.allRecipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload || "Something went wrong while fetching recipes.";
      })

      // --- Fetch recipes by search ---
      .addCase(fetchRecipesBySearch.pending, (state) => {
        state.searchStatus = "loading";
        state.searchError = null;
      })
      .addCase(fetchRecipesBySearch.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchRecipes = action.payload;
      })
      .addCase(fetchRecipesBySearch.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.payload || "Something went wrong while searching recipes.";
      })

      // --- Fetch meal by ID ---
      .addCase(fetchMealById.pending, (state) => {
        state.mealStatus = "loading";
        state.mealError = null;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.mealStatus = "succeeded";
        state.mealDetails = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.mealStatus = "failed";
        state.mealError = action.payload || "Something went wrong while fetching meal details.";
      })
        // --- Fetch meal by Category ---
        .addCase(fetchMealByCategory.pending, (state) => {
            state.categoryStatus = "loading";
            state.categoryError = null;
        })
        .addCase(fetchMealByCategory.fulfilled, (state, action) => {
            state.categoryStatus = "succeeded";
            state.categoryRecipies = action.payload;
        })
        .addCase(fetchMealByCategory.rejected, (state, action) => {
            state.categoryStatus = "failed";
            state.categoryError = action.payload || "Something went wrong while fetching meal details.";
        });

  },
});

export default recipeSlice.reducer;

// ✅ Selectors
export const selectAllRecipes = (state) => state.recipes.allRecipes;
export const selectSearchRecipes = (state) => state.recipes.searchRecipes;
export const mealData = (state) => state.recipes.mealDetails;
export const selectCategoryRecipes = (state) => state.recipes.categoryRecipies;


export const getAllRecipesStatus = (state) => state.recipes.allStatus;
export const getSearchRecipesStatus = (state) => state.recipes.searchStatus;
export const getMealStatus = (state) => state.recipes.mealStatus;
export const getCategoryStatus = (state) => state.recipes.categoryStatus;

export const getAllRecipesError = (state) => state.recipes.allError;
export const getSearchRecipesError = (state) => state.recipes.searchError;
export const getMealError = (state) => state.recipes.mealError;
export const getCategoryError = (state) => state.recipes.categoryError;