import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMealByCategory,
  selectCategoryRecipes,
  getCategoryError,
  getCategoryStatus,
} from "../slice/recipeSlice";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
const CategorySearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const selectedCategoryRecipes = useSelector(selectCategoryRecipes);
  const categoryStatus = useSelector(getCategoryStatus);
  const categoryError = useSelector(getCategoryError);
  useEffect(() => {
    dispatch(fetchMealByCategory(category));
  }, []);
  useEffect(() => {
    console.log("Category Recipes:", selectedCategoryRecipes);
  }, [selectedCategoryRecipes]);

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
      background-color: #fff1ef;;
      transform: scale(1.03);
    }
  `;
  const handleMeadId = (id) => {
    console.log("Meal ID clicked:", id);
    navigate(`/meal/${id}`);
  };

  return (
    <>
         <Navbar />
      {selectedCategoryRecipes ? (
        <div>
          <h4>Recipes in Category: {category}</h4>

          {categoryStatus === "loading" && <p>Loading all categories...</p>}
          {categoryStatus === "failed" && <p>Error: {categoryError}</p>}
          {categoryStatus === "succeeded" &&
            selectedCategoryRecipes?.meals?.length > 0 && (
              <StyledImages style={{ padding: 0 }}>
                {selectedCategoryRecipes.meals.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    onClick={() => handleMeadId(recipe.idMeal)}
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

                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      {recipe.strMeal}
                    </span>
                  </RecipeCard>
                ))}
              </StyledImages>
            )}
        </div>
      ) : (
        <div>No recipes found for category: {category}</div>
      )}
    </>
  );
};

export default CategorySearch;
