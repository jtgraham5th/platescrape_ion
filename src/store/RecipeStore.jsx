import { Store } from "pullstate";

const RecipeStore = new Store({
  total: 0,
  recipes: [],
});

export default RecipeStore;

export const addToFavorites = (newRecipe) => {
  RecipeStore.update((s) => {
    if (
      s.recipes.find(
        (recipe) => recipe.name === newRecipe.name
      )
    ) {
      s.recipes = s.recipes.filter(
        (recipe) => recipe.name !== newRecipe.name
      );
    } else {
      s.recipes = [...s.recipes, newRecipe];
    }
  });
};
