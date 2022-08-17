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
import CreateItemModal from "../components/CreateItemModal";
import BrandHeader from "../components/BrandHeader";
import EmptyContainer from "../components/EmptyContainer";
import { useData } from "../data/DataContext";

import "./Shopping.css";

const Shopping: React.FC = () => {
  const {
    shoppingList_state,
    shoppingList_loading,
    addShoppingItem,
    removeShoppingItem,
    getShoppingListCategories,
  } = useData().shopping;
  const shoppingList = !shoppingList_loading ? shoppingList_state.docs : [];
  const { addKitchenItem } = useData().kitchen;
  const categories = getShoppingListCategories();
  const [presentToast, dismissToast] = useIonToast();
  const addToKitchen = (item: any) => {
    addKitchenItem(item);
    removeShoppingItem(item);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${item.name} has been added to your Kitchen`,
      duration: 3000,
    });
  };
  const [present, dismiss] = useIonModal(CreateItemModal, {
    dismiss: () => dismiss(),
    listName: "Shopping List",
    addToList: addShoppingItem,
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
        {!shoppingList_loading && shoppingList.length > 0 ? (
          <IonList>
            {categories.map((category: any, i: number) => {
              return (
                <IonItemGroup key={i}>
                  <IonItemDivider>
                    <IonLabel className="category-label">{category}</IonLabel>
                  </IonItemDivider>

                  {shoppingList.map((item: any, index: number) => {
                    const ingredient = item.data();
                    return ingredient.category === category ? (
                      <IonItemSliding key={index} className="slider">
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
                        <IonItemOptions side="end">
                          <IonItemOption
                            color="danger"
                            style={{
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            onClick={() => removeShoppingItem(ingredient)}
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
          <EmptyContainer name="Shopping List" />
        )}
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
