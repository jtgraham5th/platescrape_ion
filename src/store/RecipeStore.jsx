import { Store } from "pullstate";
import { useData } from "../data/DataContext";

const RecipeStore = new Store({
  total: 0,
  recipes: [],
});

export default RecipeStore;

export const addToFavorites = (newRecipe) => {
  RecipeStore.update((s) => {
    if (s.recipes.find((recipe) => recipe.name === newRecipe.name)) {
      useData().recipes.removeRecipe(newRecipe.name);
      s.recipes = s.recipes.filter((recipe) => recipe.name !== newRecipe.name);
    } else {
      useData().recipes.saveRecipe(newRecipe);
      s.recipes = [...s.recipes, newRecipe];
    }
  });
};
