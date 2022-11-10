import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
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
  list_state: any;
  addItem: any;
}> = ({ setSelectedRecipe, selectedRecipe, list_state, addItem }) => {
  // const { shoppingList_state, shoppingList_loading } = useData().shopping;
  const { recipes_state, recipes_loading } = useData().recipes;

  // const shoppingList = !shoppingList_loading ? shoppingList_state.docs : [];
  const recipes = !recipes_loading ? recipes_state.docs : [];

  const [results, setResults] = useState<any[]>([]);
  const [missingIngredients, setMissingIngredients] = useState<any[]>([]);
  const Popover = () => (
    <IonContent>
      {missingIngredients.length > 1 ? (
        <IonList>
          <IonItem className="popoverHeader">
            <small>Missing {missingIngredients.length} Ingredients:</small>
          </IonItem>
          {missingIngredients.map((item: any) => {
            return (
              <IonItem className="popoverItem">
                <small>{item.name}</small>
                <IonButton
                  slot="end"
                  fill="clear"
                  size="small"
                  onClick={() => {addToList(item)}}
                >
                  <IonIcon src={addCircleOutline} />
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
      ) : (
        <IonList>
          <IonItem className="popoverHeader">
            <small>You have everything you need to make this recipe!</small>
          </IonItem>
        </IonList>
      )}
    </IonContent>
  );
  const addToList =(item:any) => {
    addItem(item);
    setMissingIngredients((prevState: any) => prevState.filter((ingredient: any) => ingredient.name !== item.name))
  }

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  useEffect(() => {
    let tempRecipes: any[] = [];
    let tempShoppingList: any[] = [];

    list_state.forEach((item: any) => {
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

    list_state.forEach((item: any) => {
      const ingredient = item.data();
      tempShoppingList.push(ingredient);
    });

    for (const ingredient of recipe.ingredients) {
      if (tempShoppingList.some((item) => item.name === ingredient.name)) {
        ingredientsList.push(ingredient.name);
      } else {
        missingIngredients.push(ingredient);
      }
    }
    setSelectedRecipe({ name: recipe.name, ingredients: ingredientsList });
    setMissingIngredients(missingIngredients);
    present({
      event: e,
      showBackdrop: false,
      size: "cover",
      // htmlAttributes: { className: "dogs" },
      side: "right",
      alignment: "start",
      arrow: false,
      // onWillDismiss: () => setSelectedRecipe({ name: "", ingredients: [] }),
    });
  };

  return (
    <>
      <div className="recipe-tracker-header">Recipes in this list:</div>
      <IonRow className="recipe-tracker">
        {results.map((recipe: any) => {
          return (
            <IonChip
              outline={selectedRecipe.name !== recipe.name}
              onClick={(e) => getRecipeInfo(e, recipe)}
            >
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
