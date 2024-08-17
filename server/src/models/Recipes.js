import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, // Set to false if not mandatory
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
); // This line adds `createdAt` and `updatedAt` fields

export const RecipesModel = mongoose.model("Recipes", recipeSchema);
