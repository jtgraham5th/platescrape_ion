import { useContext, useEffect } from "react";
import { useAuth } from "../data/AuthContext";
import {
  // getFirestore,
  // query,
  // getDocs,
  collection,
  // where,
  // addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
// import { useFirebaseApp } from "./FirebaseContext";
import React from "react";

type DataContextProps = {
  recipes: any;
  kitchen: any;
  shopping: any;
};

const DataContext = React.createContext<DataContextProps>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider(props: React.PropsWithChildren<any>) {
  const { db, getUser } = useAuth();
  const currentUID = getUser() ? getUser().uid : null;
  const [recipes_state, recipes_loading] = useCollection(
    collection(db, `users/${currentUID}/recipes`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [shoppingList_state, shoppingList_loading] = useCollection(
    collection(db, `users/${currentUID}/shoppingList`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [kitchen_state, kitchen_loading] = useCollection(
    collection(db, `users/${currentUID}/kitchen`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [shoppingList_categories_state] = useDocument(
    doc(db, `users/${currentUID}/categories/shopping`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [kitchen_categories_state] = useDocument(
    doc(db, `users/${currentUID}/categories/kitchen`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [recipes_categories_state, recipes_categories_loading] = useDocument(
    doc(db, `users/${currentUID}/categories/recipes`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [allRecipeCategories] = useDocument(doc(db, `categories/recipes`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [allIngredientCategories] = useDocument(
    doc(db, `categories/ingredients`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  let shoppingItemCategories: any = [];
  let kitchenItemCategories: any = [];

  useEffect(() => {
    if (currentUID) {
      const allCategories = allIngredientCategories?.data();

      shoppingList_state?.docs.forEach((ingredient: any) => {
        const item = ingredient.data();
        shoppingItemCategories.push(item.category);
        if (!allCategories?.[item.category].includes(item.name)) {
          updateDoc(doc(db, `categories/ingredients`), {
            [`${item.category}`]: arrayUnion(item.name),
          });
          console.log("--update ingredient categories--");
        }
      });

      kitchen_state?.docs.forEach(async (ingredient: any) => {
        const item = ingredient.data();
        kitchenItemCategories.push(item.category);
        if (!allCategories?.[item.category].includes(item.name)) {
          updateDoc(doc(db, `categories/ingredients`), {
            [`${item.category}`]: arrayUnion(item.name),
          });
          console.log("--update item categories--");
        }
      });
    }
  }, [allIngredientCategories]);

  useEffect(() => {
    const shoppingListCategories = shoppingList_categories_state?.data();

    try {
      shoppingList_state?.docs.forEach((ingredient: any) => {
        const item = ingredient.data();
        if (shoppingListCategories && !shoppingListCategories?.activeCategories.includes(item.category)) {
          updateDoc(doc(db, `users/${currentUID}/categories/shopping`), {
            activeCategories: arrayUnion(item.category),
            allCategories: arrayUnion(item.category),
          });
          console.log("--update USER shopping categories--");
        }
      });
    } catch (err: any) {
      setDoc(doc(db, `users/${currentUID}/categories/shopping`), {
        activeCategories: arrayUnion(...shoppingItemCategories),
        allCategories: arrayUnion(...shoppingItemCategories),
      });
      console.log("--set USER shopping categories--");
    }
    shoppingList_categories_state
      ?.data()
      ?.activeCategories.forEach((category: any) => {
        if (
          !shoppingList_state?.docs.find(
            (ing: any) => ing.data().category === category
          )
        ) {
          updateDoc(doc(db, `users/${currentUID}/categories/shopping`), {
            activeCategories: arrayRemove(category),
          });
          console.log("--remove USER shopping categories--");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingList_state]);

  useEffect(() => {
    if (currentUID) {
      const kitchenCategories = kitchen_categories_state?.data();

      try {
        kitchen_state?.docs.forEach((ingredient: any) => {
          const item = ingredient.data();
          if (kitchenCategories && !kitchenCategories?.activeCategories.includes(item.category)) {
            updateDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
              activeCategories: arrayUnion(item.category),
              allCategories: arrayUnion(item.category),
            });
            console.log("--update USER kitchen categories--");
          }
        });
      } catch (err: any) {
        console.error(err);
        setDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
          activeCategories: arrayUnion(...kitchenItemCategories),
          allCategories: arrayUnion(...kitchenItemCategories),
        });
        console.log("--set USER kitchen categories--");
      }
      kitchen_categories_state
        ?.data()
        ?.activeCategories.forEach((category: any) => {
          if (
            !kitchen_state?.docs.find(
              (ing: any) => ing.data().category === category
            )
          ) {
            updateDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
              activeCategories: arrayRemove(category),
            });
            console.log("--remove USER kitchen categories--");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitchen_state]);

  useEffect(() => {
    if (currentUID) {
      let courseCategories: any = [];
      let cuisineCategories: any = [];
      let dishCategories: any = [];
      let nutritionCategories: any = [];
      let techniqueCategories: any = [];
      recipes_state?.docs.forEach(async (item: any) => {
        const recipe = item.data();
        recipe.category.course &&
          recipe.category.course.length > 0 &&
          recipe.category.course.forEach(async (item: any) => {
            courseCategories.push(item);
          });
        recipe.category.cuisine &&
          recipe.category.cuisine.length > 0 &&
          recipe.category.cuisine.forEach(async (item: any) => {
            cuisineCategories.push(item);
          });
        recipe.category.dish &&
          recipe.category.dish.length > 0 &&
          recipe.category.dish.forEach(async (item: any) => {
            dishCategories.push(item);
          });
        recipe.category.nutrition &&
          recipe.category.nutrition.length > 0 &&
          recipe.category.nutrition.forEach(async (item: any) => {
            nutritionCategories.push(item);
          });
        recipe.category.technique &&
          recipe.category.technique.length > 0 &&
          recipe.category.technique.forEach(async (item: any) => {
            techniqueCategories.push(item);
          });
      });
      try {
        updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
          course: arrayUnion(...courseCategories),
          cusine: arrayUnion(...cuisineCategories),
          dish: arrayUnion(...dishCategories),
          nutrition: arrayUnion(...nutritionCategories),
          technique: arrayUnion(...techniqueCategories),
        });
        console.log("--update USER recipe categories--");

        updateDoc(doc(db, `categories/recipes`), {
          course: arrayUnion(...courseCategories),
          cusine: arrayUnion(...cuisineCategories),
          dish: arrayUnion(...dishCategories),
          nutrition: arrayUnion(...nutritionCategories),
          technique: arrayUnion(...techniqueCategories),
        });
        console.log("--update recipe categories--");
      } catch (err: any) {
        console.error(err);
        setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
          course: arrayUnion(...courseCategories),
          cusine: arrayUnion(...cuisineCategories),
          dish: arrayUnion(...dishCategories),
          nutrition: arrayUnion(...nutritionCategories),
          technique: arrayUnion(...techniqueCategories),
        });
        console.log("--set user recipe categories--");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes_state]);

  const saveRecipe = async (recipe: any) => {
    try {
      await setDoc(doc(db, `users/${currentUID}/recipes`), recipe);
      console.log("--save recipe--");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  const removeRecipe = async (recipe: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/recipes`, recipe));
      console.log("--remove recipe--");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  ///// RECIPE FUNCTIONS ///////
  const addToFavorites = async (newRecipe: any) => {
    if (
      recipes_state?.docs.find(
        (recipe: any) => recipe.data().name === newRecipe.name
      )
    ) {
      try {
        await deleteDoc(doc(db, `users/${currentUID}/recipes`, newRecipe.name));
        console.log("--remove from favorites--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    } else {
      try {
        await setDoc(
          doc(db, `users/${currentUID}/recipes`, newRecipe.name),
          newRecipe
        );
        console.log("--set new favorite--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  const getRecipes = () => {
    if (recipes_state?.docs) {
      return recipes_state.docs;
    } else {
      return [];
    }
  };
  const getRecipesCategories = () => {
    if (recipes_categories_state?.data()?.course) {
      return recipes_categories_state.data();
    } else {
      setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
        course: [],
        cuisine: [],
        dish: [],
        nutrition: [],
        technique: [],
      });
      console.log("--set recipe categories if empty--");

      return recipes_categories_state?.data();
    }
  };
  const getAllRecipesCategories = () => {
    return allRecipeCategories?.data();
  };
  const updateRecipe = async (newRecipe: any, oldRecipe: any) => {
    console.log(recipes_state?.docs[0].data(), oldRecipe);
    if (
      recipes_state?.docs.find(
        (recipe: any) => recipe.data().name === oldRecipe.name
      )
    ) {
      try {
        await deleteDoc(doc(db, `users/${currentUID}/recipes`, oldRecipe.name));
        console.log("--delete old recipe--");

        await setDoc(
          doc(db, `users/${currentUID}/recipes`, newRecipe.name),
          newRecipe
        );
        console.log("--update with new recipe--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    } else {
      try {
        await setDoc(
          doc(db, `users/${currentUID}/recipes`, newRecipe.name),
          newRecipe
        );
        console.log("--update new recipe--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  ///// SHOPPING LIST FUNCTIONS ///////
  const addRecipeIngredientsShopping = (ingredientList: any) => {
    const batch = db.batch();
    ingredientList.forEach(async (ingredient: any) => {
      /* check to see if ingredient already exisit in the shoppingList*/
      if (
        shoppingList_state?.docs.find(
          (e: any) => e.name === ingredient.name.toLowerCase()
        )
      ) {
        let updateIngredient: any = shoppingList_state?.docs.find(
          (e: any) => e.name === ingredient.name.toLowerCase()
        );
        updateIngredient.quantity =
          updateIngredient.quantity + ingredient.quantity;
        ///UPDATE DOCUMENT IN FIREBASE
      } else {
        try {
          let newIngredient = {
            name: ingredient.name.toLowerCase(),
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
          };
          await batch.setDoc(
            doc(db, `users/${currentUID}/shoppingList`, newIngredient.name),
            newIngredient
          );
          console.log("--set ingredients--");
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }
    });
    batch.commit();
  };
  const addShoppingItem = async (newItem: any) => {
    if (
      shoppingList_state?.docs.find(
        (item: any) => item.name === newItem.name.toLowerCase()
      )
    ) {
      let updateItem: any = shoppingList_state?.docs.find(
        (e: any) => e.name === newItem.name.toLowerCase()
      );
      updateItem.quantity = updateItem.quantity + newItem.quantity;
      ///UPDATE DOCUMENT IN FIREBASE
    } else {
      try {
        await setDoc(
          doc(db, `users/${currentUID}/shoppingList`, newItem.name),
          newItem
        );
        console.log("--set shopping list new item--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  const removeShoppingItem = async (item: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/shoppingList`, item.name));
      console.log("--remove shopping item--");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  const getShoppingListCategories = () => {
    if (shoppingList_categories_state?.data()?.activeCategories) {
      return shoppingList_categories_state?.data()?.activeCategories;
    } else {
      setDoc(doc(db, `users/${currentUID}/categories/shopping`), {
        activeCategories: [],
        allCategories: [],
      });
      console.log("--set shopping categories if empty--");

      return shoppingList_categories_state?.data()?.activeCategories;
    }
  };
  const getAllShoppingListCategories = () => {
    if (shoppingList_categories_state?.data()?.allCategories) {
      return shoppingList_categories_state?.data()?.allCategories;
    } else {
      setDoc(doc(db, `users/${currentUID}/categories/shopping`), {
        allCategories: [],
      });
      console.log("--set shopping categories if empty #2--");

      return shoppingList_categories_state?.data()?.allCategories;
    }
  };
  const getAllIngredientCategories = () => {
    return allIngredientCategories?.data();
  };

  ///// KITCHEN FUNCTIONS ///////
  const addRecipeIngredientsKitchen = (ingredientList: any) => {
    const batch = db.batch();
    ingredientList.forEach(async (ingredient: any) => {
      /* check to see if ingredient already exisit in the shoppingList*/
      if (
        kitchen_state?.docs.find(
          (e: any) => e.name === ingredient.name.toLowerCase()
        )
      ) {
        let updateIngredient: any = kitchen_state?.docs.find(
          (e: any) => e.name === ingredient.name.toLowerCase()
        );
        updateIngredient.quantity =
          updateIngredient.quantity + ingredient.quantity;
        ///UPDATE DOCUMENT IN FIREBASE
      } else {
        try {
          let newIngredient = {
            name: ingredient.name.toLowerCase(),
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
          };
          await batch.setDoc(
            doc(db, `users/${currentUID}/kitchen`, newIngredient.name),
            newIngredient
          );
          console.log("--set kitchen ingredients--");
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }
    });
    batch.commit();
  };

  const addKitchenItem = async (newItem: any) => {
    if (
      kitchen_state?.docs.find(
        (item: any) => item.name === newItem.name.toLowerCase()
      )
    ) {
      let updateItem: any = kitchen_state?.docs.find(
        (e: any) => e.name === newItem.name.toLowerCase()
      );
      updateItem.quantity = updateItem.quantity + newItem.quantity;
      ///UPDATE DOCUMENT IN FIREBASE
    } else {
      try {
        await setDoc(
          doc(db, `users/${currentUID}/kitchen`, newItem.name),
          newItem
        );
        console.log("--set ktichen item--");
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  const removeKitchenItem = async (item: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/kitchen`, item.name));
      console.log("--delete kitchen item--");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  const getKitchenCategories = () => {
    if (kitchen_categories_state?.data()?.activeCategories) {
      return kitchen_categories_state.data()?.activeCategories;
    } else {
      setDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
        activeCategories: [],
        allCategories: [],
      });
      console.log("--update kitchen categories--");

      return kitchen_categories_state?.data()?.activeCategories;
    }
  };

  const recipes = {
    recipes_state,
    recipes_loading,
    recipes_categories_state,
    recipes_categories_loading,
    updateRecipe,
    getRecipes,
    getRecipesCategories,
    getAllRecipesCategories,
    addToFavorites,
    removeRecipe,
    saveRecipe,
  };
  const shopping = {
    shoppingList_state,
    shoppingList_loading,
    getShoppingListCategories,
    getAllShoppingListCategories,
    getAllIngredientCategories,
    addRecipeIngredientsShopping,
    addShoppingItem,
    removeShoppingItem,
  };
  const kitchen = {
    kitchen_state,
    kitchen_loading,
    getKitchenCategories,
    addRecipeIngredientsKitchen,
    addKitchenItem,
    removeKitchenItem,
  };

  return (
    <DataContext.Provider value={{ recipes, kitchen, shopping }}>
      {props.children}
    </DataContext.Provider>
  );
}
