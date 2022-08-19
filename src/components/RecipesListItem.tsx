import {
  IonCard,
  IonButton,
  IonIcon,
  IonCardContent,
  IonRow,
  IonCol,
  useIonModal,
  useIonToast,
  IonItem,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import {
  globeOutline,
  starOutline,
  star,
  eyeOutline,
  personCircle,
} from "ionicons/icons";
import RecipeView from "../pages/RecipeView";
import { BookmarkBorderIcon, BookmarkIcon, PlaylistAddIcon } from "./icons";
import { useData } from "../data/DataContext";

import styles from "./SmallRecipeCard.module.scss";

interface ContainerProps {
  recipe: any;
  index: number;
}

const RecipesListItem: React.FC<ContainerProps> = ({ recipe, index }) => {
  const { addToFavorites } = useData().recipes;
  const { addRecipeIngredientsShopping } = useData().shopping;
  const recipes = useData().recipes.getRecipes();

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
  const tempIsFavorite = recipes.find(
    (faveRecipe: any) => faveRecipe.data().name === recipe.name
  );

  return (
    <IonItem key={index}>
      <IonThumbnail slot="start">
        <img src={recipe.image} alt={recipe.name} />
      </IonThumbnail>
      <IonLabel>{recipe.name}</IonLabel>
      {!recipe.user ? (
        <IonIcon icon={starOutline} slot="end" size="small">
          {recipe.rating}
        </IonIcon>
      ) : (
        <IonIcon
          slot="end"
          icon={personCircle}
          size="small"
          className={styles.userCreated}
        />
      )}

      <IonButton
        slot="end"
        fill="clear"
        size="small"
        onClick={() => addRecipe(recipe)}
      >
        <IonIcon src={PlaylistAddIcon} />
      </IonButton>
      <IonButton slot="end" fill="clear" size="small">
        <IonIcon icon={globeOutline} />
      </IonButton>
      <IonButton
        slot="end"
        fill="clear"
        size="small"
        onClick={() => present(modalOptions)}
      >
        <IonIcon icon={eyeOutline} />
      </IonButton>
    </IonItem>
    // <IonCard key={index} className={styles.RecipesListItem}>
    //   <div className={styles.header} onClick={() => present(modalOptions)}>
    //     <img src={recipe.image} alt="drink type" />
    //     <h3>{recipe.name}</h3>
    //   </div>
    //   <IonCardContent className={styles.content}>
    //     <IonRow className={styles.cardRow}>
    //       <IonCol size="12" className={styles.buttons}>
    //         <IonButton
    //           fill="clear"
    //           size="small"
    //           onClick={() => present(modalOptions)}
    //         >
    //           <IonIcon icon={eyeOutline} />
    //         </IonButton>

    //         <IonButton
    //           fill="clear"
    //           size="small"
    //           onClick={() => addFavorite(recipe)}
    //         >
    //           <IonIcon
    //             style={{ fill: "maroon" }}
    //             src={tempIsFavorite ? BookmarkIcon : BookmarkBorderIcon}
    //           />
    //         </IonButton>

    //         <IonButton
    //           fill="clear"
    //           size="small"
    //           onClick={() => addRecipe(recipe)}
    //         >
    //           <IonIcon src={PlaylistAddIcon} />
    //         </IonButton>

    //         <IonButton fill="clear" size="small">
    //           <IonIcon icon={globeOutline} />
    //         </IonButton>
    //       </IonCol>
    //       {!recipe.user ? <IonCol size="12" className={styles.ratings}>
    //          {Array.apply(null, Array(5)).map((e, i) =>
    //           i + 1 <= recipe.rating ? (
    //             <IonIcon key={i} icon={star} size="small" />
    //           ) : (recipe.rating % 1).toFixed(1) === "0.5" ? (
    //             <IonIcon key={i} icon={star} size="small" />
    //           ) : (
    //             <IonIcon key={i} icon={starOutline} size="small" />
    //           )
    //         ) }
    //       </IonCol>: <IonIcon icon={personCircle} size='large' className={styles.userCreated}/>}
    //     </IonRow>
    //   </IonCardContent>
    // </IonCard>
  );
};

export default RecipesListItem;
