import { Store } from "pullstate";

const KitchenStore = new Store({
  total: 0,
  fridge: [],
  categories: [],
});

export default KitchenStore;
export const addRecipeIngredientsKitchen = (ingredientList) => {
  KitchenStore.update((k) => {
    ingredientList.forEach((ingredient) => {
      /* check to see if ingredient already exisit in the shoppingList*/
      if (
        k.fridge.find(
          (e) => e.name === ingredient.name.toLowerCase()
        )
      ) {
        let updateIngredient = k.fridge.find(
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
        k.fridge = [...k.fridge, newIngredient];
      }
    });
    console.log(k.fridge);
  });
};

export const addKitchenItem = (newItem) => {
  console.log(newItem);
  KitchenStore.update((k) => {
    if (k.fridge.find((item) => item.name === newItem.name.toLowerCase())) {
      let updateItem = k.fridge.find(
        (item) => item.name === newItem.name.toLowerCase()
      );
      updateItem.quantity = updateItem.quantity + newItem.quantity;
    } else {
      k.fridge = [...k.fridge, newItem];
    }
  });
};
export const addKitchenCategory = (category) => {
  KitchenStore.update((k) => {
    if (!k.categories.includes(category)) {
      k.categories = [...k.categories, category];
    }
    console.log(k.categories);
  });
};
export const removeKitchenItem = (itemIndex) => {
  KitchenStore.update((k) => {
    const categoryName = k.fridge[itemIndex].category;
    k.fridge.splice(itemIndex, 1);
    if (!k.fridge.find((item) => item.category === categoryName)) {
      k.categories = k.categories.filter(
        (category) => category !== categoryName
      );
    }
  });
};
