import React from "react";
import Recipe from "./Recipe";
import FormCreateRecipe from "./FormCreateRecipe";
import RecipesContext from "./RecipesContext";

function Recipes() {
  const { recipes, loggedin } = React.useContext(RecipesContext);
  return (
    <section>
      {loggedin && <FormCreateRecipe />}
      {recipes.map((recipe) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </section>
  );
}

export default Recipes;
