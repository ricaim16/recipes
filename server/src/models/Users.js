import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{type: mongoose.Schema.Types.ObjectId  ,  ref: "recipes"}]
});

// Create the User model //users must same with the collection name
const UserModel = mongoose.model("users", UserSchema);

// Export the User model
export { UserModel };