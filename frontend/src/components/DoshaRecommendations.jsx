// src/components/DoshaRecommendations.jsx
import React from "react";
import { recommendations } from "../utils/recommendations";

const DoshaRecommendations = ({ dosha }) => {
  if (!dosha) return null;

  const { recipes, exercises } = recommendations[dosha];
  return (
    <div className="mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center mb-4">
        Recommendations for {dosha} Dosha
      </h3>
      <div>
        <h4 className="text-xl font-bold">Recipes:</h4>
        <ul className="list-disc list-inside">
          {recipes.map((recipe, index) => (
            <li key={index}>
              <strong>{recipe.name}</strong>: {recipe.benefits}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-bold">Exercises:</h4>
        <ul className="list-disc list-inside">
          {exercises.map((exercise, index) => (
            <li key={index}>
              <strong>{exercise.name}</strong>: {exercise.benefits} (
              {exercise.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoshaRecommendations;
