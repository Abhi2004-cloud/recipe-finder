const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const search = req.query.search;

    let query = {};
    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive
      query = {
        $or: [
          { title: regex },
          { cuisine: regex },
          { ingredients: regex }
        ]
      };
    }

    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.createRecipe = async (req, res) => {
    try {
      const { title, ingredients, instructions, cuisine } = req.body;
  
      let imagePath = '';
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`; // 🔥 This is the path to the saved image
      }
  
      const newRecipe = new Recipe({
        title,
        ingredients,
        instructions,
        cuisine,
        image: imagePath
      });
  
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

exports.updateRecipe = async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
