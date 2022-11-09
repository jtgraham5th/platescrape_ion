import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  useIonPopover,
} from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useData } from "../data/DataContext";
import "./RecipeTracker.css";
import { useEffect, useState } from "react";

const RecipeTracker: React.FC<{
  setSelectedRecipe: any;
  selectedRecipe: any;
}> = ({ setSelectedRecipe, selectedRecipe }) => {
  const { shoppingList_state, shoppingList_loading } = useData().shopping;
  const { recipes_state, recipes_loading } = useData().recipes;

  const shoppingList = !shoppingList_loading ? shoppingList_state.docs : [];
  const recipes = !recipes_loading ? recipes_state.docs : [];

  const [results, setResults] = useState<any[]>([]);
  const [missingIngredients, setMissingIngredients] = useState<any[]>([]);
  const Popover = () => (
    <IonContent>
      <IonList>
        <IonItem className="popoverHeader">
          <small>Missing Ingredients:</small>
        </IonItem>
        {missingIngredients.map((item: string) => {
          return (
            <IonItem className="popoverItem">
              <small>{item}</small>
              <IonButton
                slot="end"
                fill="clear"
                size="small"
                // onClick={() => addRecipe(recipe)}
              >
                <IonIcon src={addCircleOutline} />
              </IonButton>
            </IonItem>
          );
        })}
      </IonList>
    </IonContent>
  );

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  useEffect(() => {
    let tempRecipes: any[] = [];
    let tempShoppingList: any[] = [];

    shoppingList.forEach((item: any) => {
      const ingredient = item.data();
      tempShoppingList.push(ingredient);
    });

    recipes.forEach((recipe: any) => {
      const tempRecipe = recipe.data();
      for (const ingredient of tempRecipe.ingredients) {
        if (tempShoppingList.some((item) => item.name === ingredient.name)) {
          tempRecipes.push(tempRecipe);
          break;
        }
      }
    });

    console.log(tempRecipes);
    setResults(tempRecipes);
     // eslint-disable-next-line
  }, []);
  const getRecipeInfo = (e: any, recipe: any) => {
    if (selectedRecipe.name === recipe.name) {
      setSelectedRecipe({ name: "", ingredients: [] });
      return;
    }
    setSelectedRecipe({ name: "", ingredients: [] });
    console.log(recipe);
    let tempShoppingList: any[] = [];
    let ingredientsList: any[] = [];
    let missingIngredients: any[] = [];

    shoppingList.forEach((item: any) => {
      const ingredient = item.data();
      tempShoppingList.push(ingredient);
    });

    recipe.ingredients.forEach((ingredient: any, index: any) => {
      if (tempShoppingList.some((item) => item.name === ingredient.name)) {
        ingredientsList.push(ingredient.name);
      }
      missingIngredients.push(ingredient.name);
    });
    setSelectedRecipe({ name: recipe.name, ingredients: ingredientsList });
    setMissingIngredients(missingIngredients);
    present({
      event: e,
      showBackdrop: false,
      size: "cover",
      htmlAttributes: { className: "dogs" },
    });
    console.log(recipe.name, ingredientsList);
  };

  return (
    <>
      <IonListHeader>Recipes in this list</IonListHeader>
      <IonRow>
        {results.map((recipe: any) => {
          return (
            <IonChip onClick={(e) => getRecipeInfo(e, recipe)}>
              <IonAvatar>
                <img alt="Silhouette of a person's head" src={recipe.image} />
              </IonAvatar>
              <IonLabel>{recipe.name}</IonLabel>
            </IonChip>
          );
        })}
      </IonRow>
    </>
  );
};

export default RecipeTracker;
