import React from "react";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import RecipesContext from "./RecipesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import Nav from "./Nav";
import useToggle from "./hooks/useToggle";

function App() {
  const [recipes, setRecipes] = React.useState([]);
  const [loggedin, setLoggedin] = useToggle(true);
  const [loading, setLoading] = React.useState(true);
  const { get, post, del, put } = useFetch(`/api/recipes`);

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => setRecipes([data, ...recipes]));
  };

  const deleteRecipe = (recipeId) => {
    del(`/api/recipes/${recipeId}`).then(() =>
      setRecipes((recipes) =>
        recipes.filter((recipe) => recipe._id !== recipeId)
      )
    );
  };

  const editRecipe = (updatedRecipe) => {
    put(`/api/recipes/${updatedRecipe._id}`, updatedRecipe).then(() => {
      get("/api/recipes").then((data) => setRecipes(data));
    });
  };

  React.useEffect(() => {
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [get]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loggedin,
        setLoggedin,
        addRecipe,
        deleteRecipe,
        editRecipe,
      }}
    >
      <main>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/:recipeId" element={<RecipeDetail />} />
          </Routes>
        </BrowserRouter>
      </main>
    </RecipesContext.Provider>
  );
}

export default App;
