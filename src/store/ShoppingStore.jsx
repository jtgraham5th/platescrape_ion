import { Store } from "pullstate";

const ShoppingStore = new Store({
  total: 0,
  shoppingList: [],
  categories: [],
});

export default ShoppingStore;

export const addRecipeIngredientsShopping = (ingredientList) => {
  ShoppingStore.update((s) => {
    ingredientList.forEach((ingredient) => {
      /* check to see if ingredient already exisit in the shoppingList*/
      if (
        s.shoppingList.find(
          (e) => e.name === ingredient.name.toLowerCase()
        )
      ) {
        let updateIngredient = s.shoppingList.find(
          (e) => e.name === ingredient.name.toLowerCase()
        );
        updateIngredient.quantity =
          updateIngredient.quantity + ingredient.quantity;
      } else {
        let newIngredient = {
          name: ingredient.name.toLowerCase(),
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          category: ingredient.category,
        };
        s.shoppingList = [...s.shoppingList, newIngredient];
      }
    });
    console.log(s.shoppingList);
  });
};
export const addShoppingCategory = (category) => {
  ShoppingStore.update((s) => {
    if (!s.categories.includes(category)) {
      s.categories = [...s.categories, category];
    }
    console.log(s.categories);
  });
};
export const removeShoppingItem = (itemIndex) => {
  ShoppingStore.update((s) => {
    const categoryName = s.shoppingList[itemIndex].category;
    s.shoppingList.splice(itemIndex, 1);
    if (!s.shoppingList.find((item) => item.category === categoryName)) {
      s.categories = s.categories.filter(
        (category) => category !== categoryName
      );
    }
  });
};
export const addShoppingItem = (newItem) => {
  ShoppingStore.update((s) => {
    if (
      s.shoppingList.find((item) => item.name === newItem.name.toLowerCase())
    ) {
      let updateItem = s.shoppingList.find(
        (item) => item.name === newItem.name.toLowerCase()
      );
      updateItem.quantity = updateItem.quantity + newItem.quantity;
    } else {
      s.shoppingList = [...s.shoppingList, newItem];
    }
  });
};
export const createNewIngredient = (ingredient) => {
  const newIngredient = {
    name: ingredient.ingredient.toLowerCase(),
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    category: ingredient.category,
  };
  return newIngredient;
};
