import { Routes, Route, Link } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Recipe Finder
          </Link>
          <div className="collapse navbar-collapse">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/add-recipe">
                Add Recipe
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> 
      </Routes>
    </div>
  );
}

export default App;
