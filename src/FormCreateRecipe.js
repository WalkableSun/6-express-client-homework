import React from "react";
import Button from "./Button";
import RecipesContext from "./RecipesContext";

const FormCreateRecipe = () => {
  const [values, setValues] = React.useState({
    title: "Recipe Title",
    image: "toast.png",
    description: "Description of the recipe",
    year: "2024",
  });

  const { addRecipe } = React.useContext(RecipesContext);

  const createRecipe = (event) => {
    event.preventDefault();
    const recipe = {
      title: values.title,
      image: values.image,
      description: values.description,
      year: values.year,
    };
    addRecipe(recipe);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <h3>Add Recipe Form</h3>
      <form onSubmit={createRecipe}>
        <input
          type="text"
          placeholder="Recipe title"
          value={values.title}
          name="title"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Recipe image"
          value={values.image}
          name="image"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Recipe description"
          name="description"
          onChange={handleInputChange}
          value={values.description}
        />
        <input
          type="text"
          placeholder="Recipe year"
          value={values.year}
          name="year"
          onChange={handleInputChange}
        />

        <Button type="submit">Add Recipe</Button>
      </form>
    </div>
  );
};

export default FormCreateRecipe;
