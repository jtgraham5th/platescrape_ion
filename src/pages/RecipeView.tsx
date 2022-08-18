import { useEffect, useRef, useState } from "react";
import {
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonItem,
  IonRow,
  IonCol,
  IonButtons,
  IonContent,
  IonGrid,
  IonList,
  IonListHeader,
  IonPage,
  IonToolbar,
  useIonToast,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonBadge,
  IonChip,
  useIonModal,
} from "@ionic/react";
import {
  starOutline,
  peopleOutline,
  timeOutline,
  checkboxOutline,
  squareOutline,
  addCircleOutline,
  home,
  add,
  caretBack,
  personCircle,
} from "ionicons/icons";
import {
  BookmarkBorderIcon,
  BookmarkIcon,
  KitchenIcon,
  ShoppingCartIcon,
} from "../components/icons";
import EmptyContainer from "../components/EmptyContainer";
import { useData } from "../data/DataContext";

import styles from "./RecipeView.module.scss";
import CreateRecipeModal from "../components/CreateRecipeModal";

interface ContainerProps {
  recipe: any;
  close: any;
}
const RecipeView: React.FC<ContainerProps> = ({ recipe, close }) => {
  const { addToFavorites } = useData().recipes;
  const { addRecipeIngredientsShopping, addShoppingItem, removeShoppingItem } =
    useData().shopping;
  const { addRecipeIngredientsKitchen, addKitchenItem } = useData().kitchen;
  const pageRef = useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const recipes = useData().recipes.getRecipes();
  const shoppingList = useData().shopping.shoppingList_state.docs;
  const fridge = useData().kitchen.kitchen_state.docs;
  const [segment, setSegment] = useState("ingredients");
  const [presentToast, dismissToast] = useIonToast();
  const [present, dismiss] = useIonModal(CreateRecipeModal, {
    dismiss: () => dismiss(),
    recipeData: recipe
  });
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  const toggleSegment = (value: any) => {
    setSegment(value);
  };

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
    return itemCount;
  };
  const checkEntireKitchen = () => {
    let itemCount = 0;
    recipe.ingredients.forEach((item: any) => {
      if (checkFridge(item.name)) {
        itemCount++;
      }
    });
    return itemCount;
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

  const removeFromShoppingList = (ingredient: any) => {
    removeShoppingItem(ingredient);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `'${ingredient.name}' has been removed from your Shopping List`,
      duration: 3000,
    });
  };
  const addFavorite = (recipe: any) => {
    addToFavorites(recipe);
    if (!isFavorite) {
      presentToast({
        buttons: [{ text: "x", handler: dismissToast }],
        message: `'${recipe.name}' has been added to your Recipes`,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const tempIsFavorite = recipes.find(
      (faveRecipe: any) => faveRecipe.data().name === recipe.name
    );

    setIsFavorite(tempIsFavorite);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage ref={pageRef}>
      <IonContent fullscreen>
        <div className={styles.headerImage}>
          <img src={recipe.image} alt="main cover" />
          <IonToolbar className={styles.recipeHeader}>
            <IonButtons slot="start">
              <IonButton
                className={styles.customBackBtn}
                fill="clear"
                size="large"
                color="main"
                onClick={close}
              >
                <IonIcon size="large" icon={caretBack} />
              </IonButton>
            </IonButtons>

            <IonButtons slot="end" className={styles.bookmark}>
              <IonButton
                fill="clear"
                size="large"
                onClick={() => addFavorite(recipe)}
              >
                <IonIcon
                  icon={isFavorite ? BookmarkIcon : BookmarkBorderIcon}
                />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </div>
        <div
          className={`${styles.headerInfo} animate__animated animate__slideInLeft`}
        >
          <h1>{recipe.name}</h1>
        </div>

        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol size="4">
              <IonCardTitle>
                <IonIcon icon={peopleOutline} />
              </IonCardTitle>
              <IonCardSubtitle>serves {recipe.servings}</IonCardSubtitle>
            </IonCol>
            <IonCol size="4">
              <IonCardTitle>
                <IonIcon icon={timeOutline} />
              </IonCardTitle>
              <IonCardSubtitle>
                {recipe.time !== 0 ? `${recipe.time} mins` : "N/A"}
              </IonCardSubtitle>
            </IonCol>
            {!recipe.user ? (
              <IonCol size="4">
                <IonCardTitle>
                  <IonIcon icon={starOutline} />
                </IonCardTitle>
                <IonCardSubtitle>{recipe.rating}</IonCardSubtitle>
              </IonCol>
            ) : (
              <IonCol size="4">
                <IonCardTitle onClick={() => present(modalOptions)}>
                  <IonIcon icon={personCircle} />
                </IonCardTitle>
                <IonCardSubtitle>Edit Recipe</IonCardSubtitle>
              </IonCol>
            )}
          </IonRow>

          <IonRow className="ion-text-center">
            <IonCol size="12">
              <IonSegment onIonChange={(e) => toggleSegment(e.detail.value)}>
                <IonSegmentButton value="ingredients">
                  <IonLabel>Ingredients</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="directions">
                  <IonLabel>Directions</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          {segment === "ingredients" && recipe.ingredients && (
            <IonList>
              <IonListHeader className={styles.listHeader}>
                <IonRow className={styles.ingredientHeader}>
                  <IonCol size="6">
                    Ingredients ({recipe.ingredients.length})
                  </IonCol>
                  <IonCol size="6" className={styles.ingredientButtons}>
                    <IonChip onClick={() => addAllToShoppingList()}>
                      <IonRow>
                        <IonCol size="4">
                          <small>
                            {checkEntireShoppingCart()}/
                            {recipe.ingredients.length}
                          </small>
                          <IonIcon
                            src={ShoppingCartIcon}
                            color="primary"
                            size="small"
                          />
                        </IonCol>
                        <IonCol size="8">
                          <small>Add all Items to Shopping List</small>
                          <IonIcon icon={add} color="primary" size="large" />
                        </IonCol>
                      </IonRow>
                    </IonChip>
                    <IonChip onClick={() => addAllToKitchen()}>
                      <IonRow>
                        <IonCol size="4">
                          <small>
                            {checkEntireKitchen()}/{recipe.ingredients.length}
                          </small>
                          <IonIcon
                            src={KitchenIcon}
                            color="primary"
                            size="small"
                          />
                        </IonCol>
                        <IonCol size="8">
                          <small>Add all Items to Kitchen</small>
                          <IonIcon icon={add} color="primary" size="large" />
                        </IonCol>
                      </IonRow>
                    </IonChip>
                  </IonCol>
                </IonRow>
              </IonListHeader>
              {recipe.ingredients.map((ingredient: any, index: number) => {
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
                          checkShoppingCart(ingredient.name)
                            ? checkboxOutline
                            : squareOutline
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
                          {(ingredient.quantity === null
                            ? ""
                            : ingredient.quantity) +
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
              })}
            </IonList>
          )}

          {segment === "directions" &&
            recipe.directions &&
            (recipe.directions.length > 0 ? (
              <IonList>
                <IonListHeader className={styles.listHeader}>
                  Directions
                </IonListHeader>
                {recipe.directions.map((step: any, index: number) => {
                  return (
                    <IonItem key={index}>
                      {/* <IonLabel> */}
                      <h4>{step}</h4>
                      {/* </IonLabel> */}
                      <IonButton shape="round" fill="outline" slot="start">
                        {index + 1}
                      </IonButton>
                    </IonItem>
                  );
                })}
              </IonList>
            ) : (
              <EmptyContainer name="Directions" />
            ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecipeView;
