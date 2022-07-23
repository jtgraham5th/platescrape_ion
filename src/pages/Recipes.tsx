import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonModal,
} from "@ionic/react";
import "./Recipes.css";
import { RecipeStore } from "../store";
import { getRecipes } from "../store/Selectors";
import SmallRecipeCard from "../components/SmallRecipeCard";
import CreateRecipeModal from "../components/CreateRecipeModal";
import { PostAddIcon } from "../components/icons";
import BrandHeader from "../components/BrandHeader";
import EmptyContainer from "../components/EmptyContainer";

const Recipes: React.FC = () => {
  const recipes = RecipeStore.useState(getRecipes);
  const [present, dismiss] = useIonModal(CreateRecipeModal, {
    dismiss: () => dismiss(),
  });

  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  return (
    <IonPage>
      <IonHeader>
      <BrandHeader />
      </IonHeader>

      <IonContent fullscreen>
        <IonButton className="create-recipe" expand="full" shape="round" onClick={() => present(modalOptions)}>
          <IonIcon src={PostAddIcon} />
          Create Your Own Recipe
        </IonButton>
        {recipes.length > 0 ? (
        <div className="container">
          {recipes.map((recipe: any, index: number) => {
            return <SmallRecipeCard key={index} index={index} recipe={recipe} />;
          })}
        </div>):<EmptyContainer name="Recipes" />}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
