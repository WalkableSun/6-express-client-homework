import React from "react";
import { Link, useParams } from "react-router-dom";
import FormEditRecipe from "./FormEditRecipe";
import RecipesContext from "./RecipesContext";
import Button from "./Button";

function RecipeDetail() {
  const { recipes, loggedin, deleteRecipe, editRecipe } =
    React.useContext(RecipesContext);
  const { recipeId } = useParams();
  const [recipeDeleted, setRecipeDeleted] = React.useState(false);
  const [recipeEdited, setRecipeEdited] = React.useState(false);

  const currRecipe = recipes.filter((recipe) => recipe._id === recipeId);
  const thisRecipe = { ...currRecipe[0] };

  const delRecipe = () => {
    deleteRecipe(thisRecipe._id);
    setRecipeDeleted(true);
  };

  const handleEditRecipe = (updatedRecipe) => {
    editRecipe(updatedRecipe);
    setRecipeEdited(true);
  };

  if (recipeDeleted) {
    return (
      <>
        <p>Recipe deleted!</p>
        <Link to="/">Home</Link>
      </>
    );
  }

  if (recipeEdited) {
    return (
      <>
        <p>Recipe edited!</p>
        <Link to="/">Home</Link>
      </>
    );
  }

  return (
    <div>
      <img src={`/img/${thisRecipe.image}`} alt={thisRecipe.title} />
      <h1>{thisRecipe.title}</h1>
      <p>{thisRecipe.description}</p>

      {loggedin && (
        <>
          <FormEditRecipe
            thisRecipe={thisRecipe}
            editRecipe={handleEditRecipe}
          />
          <Button func={() => delRecipe()} $variant="delete">
            Delete
          </Button>
        </>
      )}

      <Link to="/">Home</Link>
    </div>
  );
}

export default RecipeDetail;
