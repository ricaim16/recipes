import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    console.log("Saving recipe with ID:", recipeID, "for user:", userID);
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      console.log("Save response:", response.data);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className={`px-4 py-2 rounded text-white ${
                    isRecipeSaved(recipe._id)
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition`}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-gray-700 text-base mb-4">
                {recipe.description}
              </p>

              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-56 object-cover mb-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-3">Ingredients</h3>
                <ul className="list-disc pl-6 text-gray-700 text-base mb-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-medium mb-3">Instructions</h3>
                <p className="text-gray-700 text-base mb-5">
                  {recipe.instructions}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-700 text-base">
                    Cooking Time: {recipe.cookingTime} minutes
                  </p>
                  <button
                    onClick={() => handleEdit(recipe._id)}
                    className="px-4  py-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center mt-10 space-x-2">
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleShare(recipe._id)}
                    className="px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => handleComment(recipe._id)}
                    className="px-4 py-2 rounded-full text-white bg-yellow-500 hover:bg-yellow-600 transition"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};









