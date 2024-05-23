const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dataFilePath = path.join(__dirname, "recipes.json");

// Read the JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath);
    const jsonData = JSON.parse(data);
    return jsonData.recipes || [];
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
};

//................. Write to the JSON file

const writeData = (recipes) => {
  fs.writeFileSync(dataFilePath, JSON.stringify({ recipes }, null, 2));
};
// const writeData = (recipes) => {
//   const jsonData = {
//     recipes: recipes,
//     total: recipes.length,
//     skip: 0,
//     limit: recipes.length,
//   };
//   fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
// };

//..................... CRUD Endpoints


app.post("/recipes", (req, res) => {
  const recipes = readData();
  const newRecipe = req.body;
  newRecipe.id = Date.now();
  recipes.push(newRecipe);
  writeData(recipes);
  res.status(201).json(newRecipe); // Send back the entire new recipe object
});

// Read all recipes
app.get("/recipes", (req, res) => {
  const recipes = readData();
  res.json(recipes);
});

//..................... ..Read a specific recipe
app.get("/recipes/:id", (req, res) => {
  const recipes = readData();
  const recipe = recipes.find((r) => r.id == req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send("Recipe not found");
  }
});

// Update a recipe
app.put("/recipes/:id", (req, res) => {
  const recipes = readData();
  const index = recipes.findIndex((r) => r.id == req.params.id);
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...req.body };
    writeData(recipes);
    res.json(recipes[index]);
  } else {
    res.status(404).send("Recipe not found");
  }
});

// Delete a recipe
app.delete("/recipes/:id", (req, res) => {
  let recipes = readData();
  const initialLength = recipes.length;
  recipes = recipes.filter((r) => r.id != req.params.id);
  if (recipes.length < initialLength) {
    writeData(recipes);
    res.json({
      message: `Recipe with ID ${req.params.id} deleted successfully`,
    });
    // res.sendStatus(204);
  } else {
    res.status(404).send("Recipe not found");
  }
});

// ..............................Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
