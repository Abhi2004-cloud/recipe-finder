const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


// Main routes
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById); // ✅ New route for fetching a recipe by ID
router.post('/', upload.single('image'), recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;


