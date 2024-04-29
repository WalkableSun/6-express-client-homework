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
  const [loading, setLoading] = useToggle(true);
  const [error, setError] = React.useState("");
  const { get, post, del, put } = useFetch(`/api/recipes`);
  const value = { recipes, loggedin };

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => {
      setRecipes([data, ...recipes]);
    });
  };

  const deleteRecipe = (recipeId) => {
    console.log("recipeId:", recipeId);
    del(`/api/recipes/${recipeId}`).then(
      setRecipes((recipes) =>
        recipes.filter((recipe) => recipe._id !== recipeId)
      )
    );
  };

  const editRecipe = (updatedRecipe) => {
    console.log(updatedRecipe);
    put(`/api/recipes/${updatedRecipe._id}`, updatedRecipe).then(
      get("/api/recipes").then((data) => {
        setRecipes(data);
      })
    );
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setLoading(true);
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  // if (loading === true) {
  //   return <p>Loading</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <RecipesContext.Provider value={value}>
      <main>
        <BrowserRouter>
          <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
          <Routes>
            {/* NOTE - we no longer pass recipes as a prop to Recipes */}
            <Route
              path="/"
              element={
                <Recipes //loggedin={loggedin}
                  addRecipe={addRecipe}
                />
              }
            />
            <Route
              path="/:recipeId"
              element={
                <RecipeDetail
                  recipes={recipes}
                  deleteRecipe={deleteRecipe}
                  // loggedin={loggedin}
                  editRecipe={editRecipe}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
    </RecipesContext.Provider>
  );
}

export default App;
