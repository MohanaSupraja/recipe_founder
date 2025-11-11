import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchRecipes,
  fetchRecipesBySearch,
  fetchMealById,
  fetchMealByCategory,
  selectAllRecipes,
  selectSearchRecipes,
  selectCategoryRecipes,
  mealData,
  getAllRecipesStatus,
  getCategoryStatus,
  getAllRecipesError,
  getCategoryError,
  getSearchRecipesStatus,
  getSearchRecipesError,
  getMealStatus,
  getMealError,
} from "../slice/recipeSlice";
import SearchDebounce from "../hooks/SearchDebounce";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
const Main = () => {
  const dispatch = useDispatch();

  // 🔹 Redux store data
  const allRecipes = useSelector(selectAllRecipes);
  const searchRecipes = useSelector(selectSearchRecipes);
  const mealDetails = useSelector(mealData);

  // 🔹 Status & error states
  const allStatus = useSelector(getAllRecipesStatus);
  const allError = useSelector(getAllRecipesError);
  const searchStatus = useSelector(getSearchRecipesStatus);
  const searchError = useSelector(getSearchRecipesError);
  const mealStatus = useSelector(getMealStatus);
  const mealError = useSelector(getMealError);

  // 🔹 UI control states
  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showAllRecipes, setShowAllRecipes] = useState(true);
  const [showSearchRecipes, setShowSearchRecipes] = useState(false);
  const [showMealDetails, setShowMealDetails] = useState(false);
 const navigate = useNavigate();
  // ✅ Use debounce hook correctly
  const debouncedSearch = SearchDebounce(search, 500);

  useEffect(() => {
    console.log("all:",allRecipes)
  }, [allRecipes]);
  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(fetchRecipesBySearch(debouncedSearch));
      setShowSearchRecipes(true);
      setShowAllRecipes(false);
      setShowMealDetails(false);
    } else {
      dispatch(fetchRecipes());
      setShowAllRecipes(true);
      setShowSearchRecipes(false);
      setShowMealDetails(false);
    }
  }, [debouncedSearch, dispatch]);

  const handleSearch = (e) => {
    console.log("Search Input:", e.target.value);
    setSearch(e.target.value);
  };

  // 🔹 Handle meal click
  const handleMeal = (id) => {
    console.log("Meal ID clicked:", id);
    navigate(`/meal/${id}`);
    // setSelectedMeal(id);
    // dispatch(fetchMealById(id));
    // setShowMealDetails(true);
    // setShowAllRecipes(false);
    // setShowSearchRecipes(false);
  };


  // 🔹 Handle back navigation
  const handleBack = () => {
    setShowMealDetails(false);
    if (search.trim()) {
      setShowSearchRecipes(true);
    } else {
      setShowAllRecipes(true);
    }
  };


const SearchAllRecipes = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 10px;
  margin-top:2%;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff6f61;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #e85b50;
  }
`;

const StyledImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  justify-items: center;
`;

const RecipeCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ffe5e0;
    transform: scale(1.03);
  }
`;
const SearchStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 3% 0;
`;

const handleCategory = (category) => {
    console.log("Category clicked:", category);
    navigate(`/category/${category}`);
  };
  return (
    <>
    <Navbar />
    <div style={{ padding: "20px" ,height:"80vh"}}>
      {/* 🔍 Search box */}
      <SearchStyle>
      <input
        type="text"
        value={search}
        placeholder="Search by Ingrediant..."
        onChange={handleSearch}
        style={{
          padding: "8px",
          width: "250px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      </SearchStyle>

        {showAllRecipes && (
        <SearchAllRecipes>
          {allStatus === "loading" && <p>Loading all categories...</p>}
          {allStatus === "failed" && <p>Error: {allError}</p>}
          {allStatus === "succeeded" && allRecipes?.categories?.length > 0 && (
            <StyledImages>
              {allRecipes.categories.map((category) => (
                <RecipeCard
                  key={category.idCategory}
                  onClick={() => handleCategory(category.strCategory)}
                >
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginTop: "8px",
                    }}
                  >
                    {category.strCategory}
                  </span>
                </RecipeCard>
              ))}
            </StyledImages>
          )}
        </SearchAllRecipes>
      )}

      {showSearchRecipes && (
        <>
          {searchStatus === "loading" && <p>Searching recipes...</p>}
          {searchStatus === "failed" && <p>Error: {searchError}</p>}
          {searchStatus === "succeeded" && searchRecipes?.meals?.length > 0 && (
            <StyledImages style={{ padding: 0 }}>
              {searchRecipes.meals.map((recipe) => (
                <RecipeCard>
                <li
                  key={recipe.idMeal}
                  style={{
                    listStyle: "none",
                    marginBottom: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onClick={() => handleMeal(recipe.idMeal)}
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: "500", }}>
                    {recipe.strMeal}
                  </span>
                </li>
                </RecipeCard>
              ))}
            </StyledImages>
          )}
        </>
      )}


  
    </div>
    </>
  );
};

export default Main;
