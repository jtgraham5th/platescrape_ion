import {
  IonCard,
  IonButton,
  IonIcon,
  IonCardContent,
  IonRow,
  IonCol,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import {
  globeOutline,
  starOutline,
  star,
  starHalf,
  eyeOutline,
} from "ionicons/icons";
import { getRecipes } from "../store/Selectors";
import { addToFavorites } from "../store/RecipeStore";
import {
  addRecipeIngredientsShopping,
  addShoppingCategory,
} from "../store/ShoppingStore";
import { useEffect, useState } from "react";
import { RecipeStore } from "../store";
import styles from "./RecipeCard.module.scss";
import RecipeView from "../pages/RecipeView";
import { BookmarkBorderIcon, BookmarkIcon, PlaylistAddIcon } from "./icons";

interface ContainerProps {
  recipe: any;
  index: number;
}

const RecipeCard: React.FC<ContainerProps> = ({ recipe, index }) => {
  const recipes = RecipeStore.useState(getRecipes);
  const [isFavorite, setIsFavorite] = useState(false);
  const [presentToast, dismissToast] = useIonToast();

  const addRecipe = (recipe: any) => {
    addRecipeIngredientsShopping(recipe.ingredients);
    recipe.ingredients.forEach((ingredient: any) => {
      addShoppingCategory(ingredient.category);
    });
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `Ingredients for '${recipe.name}' have been added to your Shopping List`,
      duration: 3000,
    });
  };

  const addFavorite = (recipe: any) => {
    addToFavorites(recipe);
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `'${recipe.name}' has been added to your Recipes`,
      duration: 3000,
    });
  };
  const [present, dismiss] = useIonModal(RecipeView, {
    close: () => dismiss(),
    recipe: recipe,
  });
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };
  useEffect(() => {
    const tempIsFavorite = recipes.find(
      (faveRecipe: any) => faveRecipe.name === recipe.name
    );

    setIsFavorite(tempIsFavorite);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  return (
    <IonCard className={styles.card} key={index}>
      <div className={styles.header} onClick={() => present(modalOptions)}>
        <img src={recipe.image} alt="drink type" />
        <h1>{recipe.name}</h1>
      </div>
      <IonCardContent className={styles.content}>
        <IonRow className={styles.cardRow}>
          <IonCol size="4" className={styles.ratings}>
            {Array.apply(null, Array(5)).map((e, i) =>
              i + 1 <= recipe.rating ? (
                <IonIcon key={i} icon={star} size="large" />
              ) : (recipe.rating % 1).toFixed(1) === "0.5" ? (
                <IonIcon key={i} icon={starHalf} size="large" />
              ) : (
                <IonIcon key={i} icon={starOutline} size="large" />
              )
            )}
          </IonCol>
          <IonCol size="8" className={styles.buttons}>
            <IonButton
              fill="clear"
              size="large"
              onClick={() => present(modalOptions)}
            >
              <IonIcon src={eyeOutline} />
            </IonButton>

            <IonButton
              fill="clear"
              size="large"
              onClick={() => addFavorite(recipe)}
            >
              <IonIcon
                className={styles.bookmark}
                src={isFavorite ? BookmarkIcon : BookmarkBorderIcon}
              />
            </IonButton>

            <IonButton
              fill="clear"
              size="large"
              onClick={() => addRecipe(recipe)}
            >
              <IonIcon src={PlaylistAddIcon} />
            </IonButton>

            <IonButton fill="clear" size="large">
              <IonIcon icon={globeOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;
