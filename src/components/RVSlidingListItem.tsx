import {
  IonIcon,
  IonItem,
  useIonToast,
  IonLabel,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonBadge,
} from "@ionic/react";
import {
  checkboxOutline,
  squareOutline,
  addCircleOutline,
  home,
} from "ionicons/icons";
import { useData } from "../data/DataContext";

import styles from "../pages/RecipeView.module.scss";

interface ContainerProps {
  ingredient: any;
  index: number;
}
const RVSlidingListItem: React.FC<ContainerProps> = ({ ingredient, index }) => {
  const { addShoppingItem, removeShoppingItem } = useData().shopping;
  const { addKitchenItem } = useData().kitchen;
  const shoppingList = useData().shopping.shoppingList_state.docs;
  const fridge = useData().kitchen.kitchen_state.docs;
  const [presentToast, dismissToast] = useIonToast();

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

  const addToShoppingList = (ingredient: any) => {
    addShoppingItem(ingredient);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${ingredient.name}' has been added to your Shopping List`,
      duration: 3000,
    });
  };
  const addToKitchen = (ingredient: any) => {
    if (ingredient.name) {
      addKitchenItem(ingredient);
    } else {
      addKitchenItem(ingredient);
    }
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${ingredient.name}' has been added to your Kitchen`,
      duration: 3000,
    });
  };

  const removeFromShoppingList = (ingredient: any) => {
    removeShoppingItem(ingredient);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `'${ingredient.name}' has been removed from your Shopping List`,
      duration: 3000,
    });
  };

  return (
    <IonItemSliding key={index}>
      <IonItem
        detail={false}
        key={index}
        lines="full"
        className={styles.ingredientItem}
      >
        <IonIcon
          onClick={
            checkShoppingCart(ingredient.name)
              ? () => removeFromShoppingList(ingredient)
              : () => addToShoppingList(ingredient)
          }
          icon={
            checkShoppingCart(ingredient.name) ? checkboxOutline : squareOutline
          }
        />
        <IonLabel
          className={`ion-text-wrap ion-margin-start ${styles.itemLabel}`}
        >
          <h3>
            {ingredient.name}{" "}
            {checkFridge(ingredient.name) ? (
              <IonBadge>
                <IonIcon icon={home} />
              </IonBadge>
            ) : null}
          </h3>
          <p>
            {(ingredient.quantity === null ? "" : ingredient.quantity) +
              " " +
              ingredient.unit}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          color="success"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          onClick={() => addToKitchen(ingredient)}
        >
          <IonIcon icon={addCircleOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RVSlidingListItem;
