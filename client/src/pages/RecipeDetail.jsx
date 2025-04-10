import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-finder-2-two.vercel.app/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: "600px", width: "100%" }}>
        {recipe.image && (
          <img
          src={`https://recipe-finder-2-two.vercel.app/${recipe.image}`}
          alt={recipe.title}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
        )}
        <div className="card-body">
          <h4 className="card-title mb-3">{recipe.title}</h4>
          <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <hr />
          <p><strong>Ingredients:</strong></p>
          <p className="card-text">{recipe.ingredients}</p>
          <p><strong>Instructions:</strong></p>
          <p className="card-text">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;



