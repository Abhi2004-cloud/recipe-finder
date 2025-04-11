import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("ingredients", formData.ingredients);
    data.append("instructions", formData.instructions);
    data.append("cuisine", formData.cuisine);
    if (imageFile) {
      data.append("image", imageFile);
    }

    // ...imports
    await axios.post(
      "https://recipe-finder-final2.vercel.app/api/recipes",
      data
    );    

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add a Recipe</h2>
      <form
        onSubmit={handleSubmit}
        className="row g-3"
        encType="multipart/form-data"
      >
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            name="ingredients"
            placeholder="Ingredients"
            rows="3"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            name="instructions"
            placeholder="Instructions"
            rows="4"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
