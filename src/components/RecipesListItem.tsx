import {
  IonButton,
  IonIcon,
  useIonModal,
  useIonToast,
  IonItem,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import {
  globeOutline,
  starOutline,
  eyeOutline,
  personCircle,
} from "ionicons/icons";
import RecipeView from "../pages/RecipeView";
import { useData } from "../data/DataContext";

import styles from "./SmallRecipeCard.module.scss";
import { PlaylistAddIcon } from "./icons";

interface ContainerProps {
  recipe: any;
  index: number;
}

const RecipesListItem: React.FC<ContainerProps> = ({ recipe, index }) => {
  const { addRecipeIngredientsShopping } = useData().shopping;

  const [presentToast, dismissToast] = useIonToast();

  const addRecipe = (recipe: any) => {
    addRecipeIngredientsShopping(recipe.ingredients);
    recipe.ingredients.forEach((ingredient: any) => {
      // addShoppingCategory(ingredient.category);
    });
    presentToast({
      buttons: [{ text: "x", handler: dismissToast }],
      message: `Ingredients for '${recipe.name}' have been added to your Shopping List`,
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
  return (
    <IonItem key={index}>
      <IonThumbnail slot="start">
        <img src={recipe.image} alt={recipe.name} />
      </IonThumbnail>
      <IonLabel className={styles.itemLabel}>{recipe.name}</IonLabel>
      {!recipe.user ? (
        <>
          <IonIcon
            icon={starOutline}
            size="small"
            className={styles.itembuttons}
            />
            <small>{recipe.rating}</small>
        </>
      ) : (
        <IonIcon
          slot="end"
          icon={personCircle}
          size="small"
          className={styles.itembuttons}
        />
      )}

      <IonButton
        slot="end"
        fill="clear"
        size="small"
        className={styles.itembuttons}
        onClick={() => addRecipe(recipe)}
      >
        <IonIcon src={PlaylistAddIcon} />
      </IonButton>
      <IonButton
        slot="end"
        fill="clear"
        size="small"
        className={styles.itembuttons}
      >
        <IonIcon icon={globeOutline} />
      </IonButton>
      <IonButton
        slot="end"
        fill="clear"
        size="small"
        className={styles.itembuttons}
        onClick={() => present(modalOptions)}
      >
        <IonIcon icon={eyeOutline} />
      </IonButton>
    </IonItem>
  );
};

export default RecipesListItem;
