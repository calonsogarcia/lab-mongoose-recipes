const mongoose = require("mongoose");
//For carolina
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({ title: "Our own soup", cuisine: "Our cuisine" });
  })
  .then((singleRecipe) => {
    console.log("Created 1 recipe");
    return Recipe.insertMany(data);
  })
  .then((manyRecipes) => {
    console.log("Created multiple recipes");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log("Updated recipe", updatedRecipe);
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Carrot Cake Deleted", deletedRecipe);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
