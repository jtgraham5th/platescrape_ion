import { createSelector } from "reselect";

const getState = (state) => state;

//  General getters
export const getRecipes = createSelector(getState, (state) => state.recipes);
export const getShoppingList = createSelector(
  getState,
  (state) => state.shoppingList
);
export const getKitchenItems = createSelector(
  getState,
  (state) => state.fridge
);
export const getCategories = createSelector(
  getState,
  (state) => state.categories
);
export const getTags = createSelector(getState, (state) => state.tags);

//  More specific getters
export const getDrink = (id) =>
  createSelector(
    getState,
    (state) => state.drinks.filter((c) => parseInt(c.id) === parseInt(id))[0]
  );
export const checkShoppingCart = (ingredient) =>
  createSelector(getState, (state) =>
    state.shoppingList.find((item) => item.name === ingredient.toLowerCase())
  );
export const getUser = (id) =>
  createSelector(
    getState,
    (state) => state.users.filter((c) => parseInt(c.id) === parseInt(id))[0]
  );
