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
import BrandHeader from "../components/BrandHeader";
import EmptyContainer from "../components/EmptyContainer";
import { useData } from "../data/DataContext";

import "./Shopping.css";
import { useEffect, useState } from "react";
import RecipeTracker from "../components/RecipeTracker";
import { Virtuoso } from "react-virtuoso";

const Shopping: React.FC = () => {
  const {
    shoppingList_state,
    shoppingList_loading,
    addShoppingItem,
    removeShoppingItem,
    getShoppingList,
    getShoppingListCategories,
  } = useData().shopping;
  const { addKitchenItem } = useData().kitchen;
  const shoppingList = getShoppingList();
  const categories = getShoppingListCategories();
  const [results, setResults] = useState(getShoppingList());
  const [selectedRecipe, setSelectedRecipe] = useState<{
    name: string;
    ingredients: string[];
  }>({
    name: "",
    ingredients: [],
  });

  useEffect(() => {
    setResults(getShoppingList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingList_state]);
 
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
  const search = (e: any) => {
    const searchTerm = e.currentTarget.value;

    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      const newResults = shoppingList.filter((e: any) =>
        e.data().name.toLowerCase().includes(searchTermLower)
      );
      setResults(newResults);
    } else {
      setResults(shoppingList);
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
        <RecipeTracker
          list_state={shoppingList}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          addItem={addShoppingItem}
        />
        {!shoppingList_loading && shoppingList.length > 0 ? (
          <Virtuoso
            style={{ height: "70%", paddingBottom: "3rem" }}
            // className="recipeList"
            data={categories}
            itemContent={(index: number, category: any) => {
              return (
                <IonItemGroup key={index}>
                  <IonItemDivider>
                    <IonLabel className="category-label">{category}</IonLabel>
                  </IonItemDivider>
                  {results.map((item: any, index: number) => {
                    const ingredient = item.data();
                    return ingredient.category === category ? (
                      <IonItemSliding key={index} className="slider">
                        <IonItem
                          lines="none"
                          className={
                            selectedRecipe.ingredients.includes(ingredient.name)
                              ? "highlight"
                              : ""
                          }
                          detail={false}
                        >
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
            }}
          />
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
