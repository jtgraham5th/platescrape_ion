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
  const [allIngredientCategories] = useDocument(doc(db, `categories/ingredients`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  useEffect(() => {
    shoppingList_state?.docs.forEach(async (ingredient: any) => {
      const item = ingredient.data();
      try {
        await updateDoc(doc(db, `users/${currentUID}/categories/shopping`), {
          activeCategories: arrayUnion(item.category),
          allCategories: arrayUnion(item.category),
        });
        await updateDoc(doc(db, `categories/ingredients`), {
          [`${item.category}`]: arrayUnion(item.name),
        });

      } catch (err: any) {
        await setDoc(doc(db, `users/${currentUID}/categories/shopping`), {
          activeCategories: arrayUnion(item.category),
          allCategories: arrayUnion(item.category),
        });
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
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingList_state]);

  useEffect(() => {
    kitchen_state?.docs.forEach(async (ingredient: any) => {
      const item = ingredient.data();
      try {
        await updateDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
          activeCategories: arrayUnion(item.category),
          allCategories: arrayUnion(item.category),
        });
        await updateDoc(doc(db, `categories/ingredients`), {
          [`${item.category}`]: arrayUnion(item.name),
        });

      } catch (err: any) {
        console.error(err);
        await setDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
          activeCategories: arrayUnion(item.category),
          allCategories: arrayUnion(item.category),
        });
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
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitchen_state]);
  // const shoppingCategories = async () => {
  //   console.log(shoppingList_categories_state?.data());
  //   kitchen_categories_state?.data()?.activeCategories.forEach(
  //     async (categoryName: any) => {
  //       console.log(categoryName);
  //       await updateDoc(doc(db, `categories/ingredients`), {
  //         [`${categoryName}`]: [],
  //       });
  //     }
  //   );
  // };
  useEffect(() => {
    recipes_state?.docs.forEach(async (item: any) => {
      const recipe = item.data();
      recipe.category.course &&
        recipe.category.course.length > 0 &&
        recipe.category.course.forEach(async (item: any) => {
          try {
            await updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              course: arrayUnion(item),
            });
            await updateDoc(doc(db, `categories/recipes`), {
              course: arrayUnion(item),
            });
          } catch (err: any) {
            console.error(err);
            await setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              course: arrayUnion(item),
            });
          }
        });
      recipe.category.cuisine &&
        recipe.category.cuisine.length > 0 &&
        recipe.category.cuisine.forEach(async (item: any) => {
          try {
            await updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              cuisine: arrayUnion(item),
            });
            await updateDoc(doc(db, `categories/recipes`), {
              cuisine: arrayUnion(item),
            });
          } catch (err: any) {
            console.error(err);
            await setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              cuisine: arrayUnion(item),
            });
          }
        });
      recipe.category.dish &&
        recipe.category.dish.length > 0 &&
        recipe.category.dish.forEach(async (item: any) => {
          try {
            await updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              dish: arrayUnion(item),
            });
            await updateDoc(doc(db, `categories/recipes`), {
              dish: arrayUnion(item),
            });
          } catch (err: any) {
            console.error(err);
            await setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              dish: arrayUnion(item),
            });
          }
        });
      recipe.category.nutrition &&
        recipe.category.nutrition.length > 0 &&
        recipe.category.nutrition.forEach(async (item: any) => {
          try {
            await updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              nutrition: arrayUnion(item),
            });
            await updateDoc(doc(db, `categories/recipes`), {
              nutrition: arrayUnion(item),
            });
          } catch (err: any) {
            console.error(err);
            await setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              nutrition: arrayUnion(item),
            });
          }
        });
      recipe.category.technique &&
        recipe.category.technique.length > 0 &&
        recipe.category.technique.forEach(async (item: any) => {
          try {
            await updateDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              technique: arrayUnion(item),
            });
            await updateDoc(doc(db, `categories/recipes`), {
              technique: arrayUnion(item),
            });
          } catch (err: any) {
            console.error(err);
            await setDoc(doc(db, `users/${currentUID}/categories/recipes`), {
              technique: arrayUnion(item),
            });
          }
        });
      // kitchen_categories_state?.data()?.categories.forEach((category: any) => {
      //   if (
      //     !kitchen_state?.docs.find(
      //       (ing: any) => ing.data().category === category
      //     )
      //   ) {
      //     updateDoc(doc(db, `users/${currentUID}/categories/kitchen`), {
      //       categories: arrayRemove(category),
      //     });
      //   }
      // });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes_state]);

  const saveRecipe = async (recipe: any) => {
    try {
      await setDoc(doc(db, `users/${currentUID}/recipes`), recipe);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  const removeRecipe = async (recipe: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/recipes`, recipe));
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
      return recipes_categories_state?.data();
    }
  };
  const getAllRecipesCategories = () => {
    return allRecipeCategories?.data();
  };

  ///// SHOPPING LIST FUNCTIONS ///////
  const addRecipeIngredientsShopping = (ingredientList: any) => {
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
          await setDoc(
            doc(db, `users/${currentUID}/shoppingList`, newIngredient.name),
            newIngredient
          );
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }
    });
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
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  const removeShoppingItem = async (item: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/shoppingList`, item.name));
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
      return shoppingList_categories_state?.data()?.allCategories;
    }
  };
  const getAllIngredientCategories = () => {
    return allIngredientCategories?.data()
  };

  ///// KITCHEN FUNCTIONS ///////
  const addRecipeIngredientsKitchen = (ingredientList: any) => {
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
          await setDoc(
            doc(db, `users/${currentUID}/kitchen`, newIngredient.name),
            newIngredient
          );
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }
    });
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
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    }
  };
  const removeKitchenItem = async (item: any) => {
    try {
      await deleteDoc(doc(db, `users/${currentUID}/kitchen`, item.name));
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
      return kitchen_categories_state?.data()?.activeCategories;
    }
  };

  const recipes = {
    recipes_state,
    recipes_loading,
    recipes_categories_state,
    recipes_categories_loading,
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