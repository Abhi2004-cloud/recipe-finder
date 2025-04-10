import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`https://recipe-finder-2-two.vercel.app/api/recipes?search=${searchTerm}`);
      if (Array.isArray(res.data)) {
        setRecipes(res.data);
      } else {
        throw new Error("API did not return an array");
      }
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Recipes</h2>
      <input
        type="text"
        placeholder="Search by title, cuisine or ingredients"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
      />
      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm">
                {recipe.image && (
                  <img
                  src={`https://recipe-finder-2-two.vercel.app/${recipe.image}`}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                )}
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;




