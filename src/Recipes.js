import React from "react";
import Recipe from "./Recipe";
import FormCreateRecipe from "./FormCreateRecipe";
import RecipesContext from "./RecipesContext";

function Recipes() {
  const { recipes, loggedin } = React.useContext(RecipesContext);
  return (
    <section>
      {loggedin && <FormCreateRecipe />}
      {recipes.map((recipe, index) => (
        <Recipe key={`${recipe._id}-${index}`} recipe={recipe} />
      ))}
    </section>
  );
}

export default Recipes;
