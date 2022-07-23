import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { trashBin, addCircleOutline, addOutline } from "ionicons/icons";
import { ShoppingStore } from "../store";
import {
  addShoppingItem,
  removeShoppingItem,
  addShoppingCategory,
} from "../store/ShoppingStore";
import { addKitchenItem, addKitchenCategory } from "../store/KitchenStore";
import { getShoppingList, getCategories } from "../store/Selectors";
import "./Shopping.css";
import { useEffect, useState } from "react";
import CreateItemModal from "../components/CreateItemModal";
import BrandHeader from "../components/BrandHeader";
import EmptyContainer from "../components/EmptyContainer";

const Shopping: React.FC = () => {
  const shopping = ShoppingStore.useState(getShoppingList);
  const categories = ShoppingStore.useState(getCategories);
  const [shoppingList, setShoppingList] = useState([]);
  const [presentToast, dismissToast] = useIonToast();

  useEffect(() => {
    console.log(shopping);
    setShoppingList(shopping);
  }, [shopping]);

  const addToKitchen = (index: number) => {
    addKitchenItem(shopping[index]);
    addKitchenCategory(shopping[index].category);
    removeShoppingItem(index);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${shopping[index].name} has been added to your Kitchen`,
      duration: 3000,
    });
  };
  const [present, dismiss] = useIonModal(CreateItemModal, {
    dismiss: () => dismiss(),
    listName: "Shopping List",
    addToList: addShoppingItem,
    addCategory: addShoppingCategory,
  });
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [0.75, 1],
    initialBreakpoint: 0.75,
    backdropBreakpoint: 0.75,
  };

  return (
    <IonPage>
      <IonHeader>
        <BrandHeader />
      </IonHeader>
      <IonContent fullscreen>
        {shoppingList.length > 0 ? (
        <IonList>
          {categories.map((category: any, i: number) => {
            return (
              <IonItemGroup key={i}>
                <IonItemDivider>
                  <IonLabel className="category-label">{category}</IonLabel>
                </IonItemDivider>

                {shoppingList.map((ingredient: any, index: number) => {
                  return ingredient.category === category ? (
                    <IonItemSliding key={index}>
                      <IonItem lines="none" detail={false}>
                        <IonLabel>
                          <h4>{ingredient.name}</h4>
                        </IonLabel>
                        <IonLabel>
                          <small>
                            {ingredient.quantity} {ingredient.unit}
                          </small>
                        </IonLabel>
                      </IonItem>
                      <IonItemOptions side="start">
                        <IonItemOption
                          color="main"
                          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                          onClick={() => addToKitchen(index)}
                        >
                          <IonIcon icon={addCircleOutline} />
                        </IonItemOption>
                      </IonItemOptions>
                      <IonItemOptions side="end">
                        <IonItemOption
                          color="main"
                          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                          onClick={() => removeShoppingItem(index)}
                        >
                          <IonIcon icon={trashBin} />
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  ) : null;
                })}
              </IonItemGroup>
            );
          })}
        </IonList>) : <EmptyContainer name="Shopping List" />}
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => present(modalOptions)}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Shopping;
