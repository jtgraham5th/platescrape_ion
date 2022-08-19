import {
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  useIonToast,
  useIonAlert,
  IonProgressBar,
} from "@ionic/react";
import { KitchenIcon, ShoppingCartIcon } from "./icons";
import { useData } from "../data/DataContext";

import styles from "../pages/RecipeView.module.scss";

interface ContainerProps {
  recipe: any;
}
const RVIngredientsHeader: React.FC<ContainerProps> = ({ recipe }) => {
  const { addRecipeIngredientsShopping } = useData().shopping;
  const { addRecipeIngredientsKitchen } = useData().kitchen;
  const shoppingList = useData().shopping.shoppingList_state.docs;
  const fridge = useData().kitchen.kitchen_state.docs;
  const [presentToast, dismissToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const checkShoppingCart = (ingredient: any) => {
    if (shoppingList.find((item: any) => item.data().name === ingredient)) {
      return true;
    }
    return false;
  };
  const checkFridge = (ingredient: any) => {
    if (fridge.find((item: any) => item.data().name === ingredient)) {
      return true;
    }
    return false;
  };
  const checkEntireShoppingCart = () => {
    let itemCount = 0;
    recipe.ingredients.forEach((item: any) => {
      if (checkShoppingCart(item.name)) {
        itemCount++;
      }
    });
    return itemCount / recipe.ingredients.length;
  };
  const checkEntireKitchen = () => {
    let itemCount: number = 0;
    recipe.ingredients.forEach((item: any) => {
      if (checkFridge(item.name)) {
        itemCount++;
      }
    });
    return itemCount / recipe.ingredients.length;
  };

  const addAllToShoppingList = () => {
    addRecipeIngredientsShopping(recipe.ingredients);
    recipe.ingredients.forEach((ingredient: any) => {});
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `Ingredients for '${recipe.name}' have been added to your Shopping List`,
      duration: 3000,
    });
  };
  const addAllToKitchen = () => {
    addRecipeIngredientsKitchen(recipe.content.ingredientLines);
    recipe.ingredients.forEach((ingredient: any) => {});
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `Ingredients for '${recipe.name}' have been added to your Kitchen`,
      duration: 3000,
    });
  };

  return (
    <IonRow className={styles.ingredientHeader}>
      <IonCol size="6">Ingredients ({recipe.ingredients.length})</IonCol>
      <IonCol size="6" className={styles.ingredientButtons}>
        <IonRow>
          <IonCol size="8">
            {checkEntireShoppingCart() >= 1 ? (
              <small>You can make this recipe!</small>
            ) : (
              <small>
                {Math.floor(100 * checkEntireShoppingCart())}% of ingredients on
                your Shopping List.
              </small>
            )}
            <IonProgressBar
              value={checkEntireShoppingCart()}
              color="primary"
            ></IonProgressBar>
          </IonCol>
          <IonCol size="4">
            <IonButton
              onClick={() =>
                presentAlert({
                  header: "Add All Ingredients?",
                  subHeader: `Do you want to add all the ingredients for this recipe to your shopping list?`,
                  buttons: [
                    {
                      text: "yes",
                      role: "confirm",
                      handler: () => {
                        addAllToShoppingList();
                      },
                    },
                    {
                      text: "no",
                      role: "cancel",
                    },
                  ],
                })
              }
              size="small"
              disabled={checkEntireShoppingCart() >= 1 ? true : false}
            >
              <IonIcon src={ShoppingCartIcon} size="small" slot="icon-only" />
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="8">
            {checkEntireKitchen() >= 1 ? (
              <small>All items on your shopping list!</small>
            ) : (
              <small>
                {Math.floor(100 * checkEntireKitchen())}% of ingredients in your
                Kitchen.
              </small>
            )}
            <IonProgressBar
              value={checkEntireKitchen()}
              color="primary"
            ></IonProgressBar>
          </IonCol>
          <IonCol size="4">
            <IonButton
              onClick={() =>
                presentAlert({
                  header: "Add All Ingredients?",
                  // subHeader: 'Important message',
                  subHeader: `Do you want to add all the ingredients for this recipe to your kitchen?`,
                  buttons: [
                    {
                      text: "yes",
                      role: "confirm",
                      handler: () => {
                        addAllToKitchen();
                      },
                    },
                    {
                      text: "no",
                      role: "cancel",
                    },
                  ],
                })
              }
              size="small"
              disabled={checkEntireKitchen() >= 1 ? true : false}
            >
              <IonIcon src={KitchenIcon} size="small" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};

export default RVIngredientsHeader;
