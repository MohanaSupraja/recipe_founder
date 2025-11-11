import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMealById,
  mealData,
  getMealStatus,
  getMealError,
} from "../slice/recipeSlice";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const MealDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
//   const navigate = useNavigate();

  const mealDetails = useSelector(mealData);
  const mealStatus = useSelector(getMealStatus);
  const mealError = useSelector(getMealError);

  useEffect(() => {
    if (id) {
      dispatch(fetchMealById(id));
    }
  }, [dispatch, id]);

  const meal = mealDetails?.meals?.[0];

  return (
    <>
      <Navbar />
      <MealDetailsContainer>
        {mealStatus === "loading" && <p>Loading meal details...</p>}
        {mealStatus === "failed" && <p>Error: {mealError}</p>}
        {mealStatus === "succeeded" && meal && (
          <>
            <Header>Meal Details</Header>

            <MealContent>
              {/* ---------- LEFT TEXT ---------- */}
              <TextSection>
                <h2>{meal.strMeal}</h2>
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>

                <h3>Ingredients</h3>
                <IngredientList>
                  {Array.from({ length: 20 }, (_, i) => i + 1)
                    .map((n) => {
                      const ingredient = meal[`strIngredient${n}`];
                      const measure = meal[`strMeasure${n}`];
                      if (ingredient && ingredient.trim() !== "") {
                        return (
                          <li key={n}>
                            <span>{ingredient}</span>
                            {measure && (
                              <span className="measure"> - {measure}</span>
                            )}
                          </li>
                        );
                      }
                      return null;
                    })
                    .filter(Boolean)}
                </IngredientList>
              </TextSection>

              {/* ---------- RIGHT IMAGE ---------- */}
              <ImageSection>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`${meal.strMealThumb}/medium`, "_blank")
                  }
                />
              </ImageSection>
            </MealContent>
            {/*  src={meal.strMealThumb.replace("/preview", "/medium")} */}
            {/* ---------- PROCEDURE BELOW ---------- */}
            <ProcedureSection>
              <h3>Procedure</h3>
              <p>{meal.strInstructions}</p>
            </ProcedureSection>
          </>
        )}
      </MealDetailsContainer>
    </>
  );
};

export default MealDetails;

//
// ---------- Styled Components ----------
//

const MealDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 10px 20px;
  padding: 2px 20px 30px;
  background-color: #fff8f6;
  border-radius: 12px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  color: #ff6f61;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
`;

const MealContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const TextSection = styled.div`
  flex: 1;
  h2 {
    color: #333;
    font-size: 20px;
    padding-left: 15px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #555;
    padding-left: 15px;
    margin: 4px 0;
  }
  h3 {
    margin-top: 16px;
    padding-left: 15px;
    color: #ff6f61;
  }
`;

const IngredientList = styled.ul`
  list-style-type: disc;
  li {
    margin-bottom: 2px;
    color: #444;
    .measure {
      color: #777;
      font-style: italic;
    }
  }
`;

const ImageSection = styled.div`
  flex-shrink: 0;
  img {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out;
  }
  img:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100%;

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
    }
  }
`;

const ProcedureSection = styled.div`
  margin-top: 0px;
  background-color: #fff1ef;
  padding: 5px 20px 10px;
  border-radius: 10px;

  h3 {
    color: #ff6f61;
    margin-bottom: 10px;
  }

  p {
    line-height: 1.4;
    color: #444;
    white-space: pre-line; /* keeps line breaks from API */
  }
`;
