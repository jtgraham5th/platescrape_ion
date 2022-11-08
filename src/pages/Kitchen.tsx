// import { useEffect, useState } from "react";
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
  IonSearchbar,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import {
  trashBin,
  addCircleOutline,
  addOutline,
  searchSharp,
} from "ionicons/icons";
import CreateItemModal from "../components/CreateItemModal";
import EmptyContainer from "../components/EmptyContainer";
import BrandHeader from "../components/BrandHeader";
import { useData } from "../data/DataContext";

import "./Kitchen.css";
import { useState } from "react";

const Kitchen: React.FC = () => {
  const {
    kitchen_state,
    kitchen_loading,
    addKitchenItem,
    removeKitchenItem,
    getKitchenCategories,
  } = useData().kitchen;
  const fridgeList = !kitchen_loading ? kitchen_state.docs : [];
  const { addShoppingItem } = useData().shopping;
  const categories = getKitchenCategories();
  const [presentToast, dismissToast] = useIonToast();
  const [results, setResults] = useState(fridgeList);

  const addToShoppingList = (item: any) => {
    addShoppingItem(item);
    removeKitchenItem(item);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `${item.name} has been added to your Shopping List`,
      duration: 3000,
    });
  };
  const [present, dismiss] = useIonModal(CreateItemModal, {
    dismiss: () => dismiss(),
    listName: "Kitchen",
    addToList: addKitchenItem,
  });

  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [0.75, 1],
    initialBreakpoint: 0.75,
    backdropBreakpoint: 0.75,
  };
  const search = (e: any) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);

    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      const newResults = fridgeList.filter((e: any) =>
        e.data().name.toLowerCase().includes(searchTermLower)
      );
      setResults(newResults);
    } else {
      setResults(fridgeList);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <BrandHeader />
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          onIonChange={(e) => search(e)}
          id="searchbar"
          searchIcon={searchSharp}
          placeholder="Search Ingredients"
        />

        {!kitchen_loading && fridgeList.length > 0 ? (
          <IonList>
            {categories.map((category: any, i: number) => {
              return (
                <IonItemGroup key={i}>
                  <IonItemDivider>
                    <IonLabel className="category-label">{category}</IonLabel>
                  </IonItemDivider>

                  {results.map((item: any, index: number) => {
                    const ingredient = item.data();
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
                            color="success"
                            style={{
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            onClick={() => addToShoppingList(ingredient)}
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
                            onClick={() => removeKitchenItem(ingredient)}
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
