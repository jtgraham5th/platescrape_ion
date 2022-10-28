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
  useIonModal,
} from "@ionic/react";
import {
  starOutline,
  peopleOutline,
  timeOutline,
  createOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { BookmarkBorderIcon, BookmarkIcon } from "../components/icons";
import EmptyContainer from "../components/EmptyContainer";
import { useData } from "../data/DataContext";

import styles from "./RecipeView.module.scss";
import CreateRecipeModal from "../components/CreateRecipeModal";
import RVIngredientsHeader from "../components/RVIngredientsHeader";
import RVSlidingListItem from "../components/RVSlidingListItem";

interface ContainerProps {
  recipe: any;
  close: any;
}
const RecipeView: React.FC<ContainerProps> = ({ recipe, close }) => {
  const { addToFavorites } = useData().recipes;
  const pageRef = useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const recipes = useData().recipes.getRecipes();
  const [segment, setSegment] = useState("ingredients");
  const [presentToast, dismissToast] = useIonToast();
  const [present, dismiss] = useIonModal(CreateRecipeModal, {
    dismiss: () => dismiss(),
    recipeData: recipe,
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
                <IonIcon size="large" icon={arrowBackOutline} />
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
        <div
          className={`${styles.headerInfo} animate__animated animate__slideInLeft`}
        >
          <h1>{recipe.name}</h1>
        </div>
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
                  <IonIcon icon={createOutline} />
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
              <RVIngredientsHeader recipe={recipe} />
              {recipe.ingredients.map((ingredient: any, index: number) => {
                return (
                  <RVSlidingListItem index={index} ingredient={ingredient} />
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
                      <h4>{step}</h4>
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
