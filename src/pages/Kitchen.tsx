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
import { KitchenStore } from "../store";
import {
  addKitchenItem,
  removeKitchenItem,
  addKitchenCategory,
} from "../store/KitchenStore";
import { addShoppingItem, addShoppingCategory } from "../store/ShoppingStore";
import { getKitchenItems, getCategories } from "../store/Selectors";
import "./Kitchen.css";
import { useEffect, useState } from "react";
import CreateItemModal from "../components/CreateItemModal";
import EmptyContainer from "../components/EmptyContainer";
import BrandHeader from "../components/BrandHeader";

const Kitchen: React.FC = () => {
  const fridge = KitchenStore.useState(getKitchenItems);
  const categories = KitchenStore.useState(getCategories);
  const [fridgeList, setFridgeList] = useState([]);
  const [presentToast, dismissToast] = useIonToast();

  useEffect(() => {
    console.log(fridge);
    setFridgeList(fridge);
  }, [fridge]);

  const addToShoppingList = (index: number) => {
    addShoppingItem(fridge[index]);
    addShoppingCategory(fridge[index].category);
    removeKitchenItem(index);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${fridge[index].name} has been added to your Shopping List`,
      duration: 3000,
    });
  };
  const [present, dismiss] = useIonModal(CreateItemModal, {
    dismiss: () => dismiss(),
    listName: "Kitchen",
    addToList: addKitchenItem,
    addCategory: addKitchenCategory,
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
        {fridgeList.length > 0 ? (
          <IonList>
            {categories.map((category: any, i: number) => {
              return (
                <IonItemGroup key={i}>
                  <IonItemDivider>
                    <IonLabel className="category-label">{category}</IonLabel>
                  </IonItemDivider>

                  {fridgeList.map((ingredient: any, index: number) => {
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
                            style={{
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            onClick={() => addToShoppingList(index)}
                          >
                            <IonIcon icon={addCircleOutline} />
                          </IonItemOption>
                        </IonItemOptions>
                        <IonItemOptions side="end">
                          <IonItemOption
                            color="main"
                            style={{
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            onClick={() => removeKitchenItem(index)}
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
          </IonList>
        ) : (
          <EmptyContainer name="Kitchen" />
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => present(modalOptions)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Kitchen;
