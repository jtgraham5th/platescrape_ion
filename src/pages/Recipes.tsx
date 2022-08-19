import {
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToggle,
  useIonModal,
} from "@ionic/react";
import SmallRecipeCard from "../components/SmallRecipeCard";
import CreateRecipeModal from "../components/CreateRecipeModal";
import { PostAddIcon } from "../components/icons";
import BrandHeader from "../components/BrandHeader";
import EmptyContainer from "../components/EmptyContainer";
import { useData } from "../data/DataContext";

import "./Recipes.css";
import { filterOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

const Recipes: React.FC = () => {
  const {
    getRecipesCategories,
    recipes_state,
    recipes_loading,
    recipes_categories_loading,
  } = useData().recipes;
  const recipes = !recipes_loading ? recipes_state.docs : [];
  const [present, dismiss] = useIonModal(CreateRecipeModal, {
    dismiss: () => dismiss(),
  });
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const categories = !recipes_categories_loading ? getRecipesCategories() : [];
  const [category, setCategory] = useState();
  const [userCreated, setUserCreated] = useState();
  const [results, setResults] = useState(recipes);

  const toggleFilter = () => {
    if (!accordionGroup.current) {
      return;
    }
    const accordion = accordionGroup.current;

    if (accordion.value === "second") {
      accordion.value = undefined;
    } else {
      accordion.value = "second";
    }
  };
  const searchWithFilter = (selectedCategory: any) => {
    if (category) {
      const newResults = results.filter((e: any) => {
        if (e.data().category[category]) {
          return e
            .data()
            .category[category]?.find(
              (e: any) => e["display-name"] === selectedCategory
            );
        }
        return e;
      });
      setResults(newResults);
    } else {
      setResults(recipes);
    }
  };

  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  useEffect(() => {
    if (userCreated) {
      const newResults = results.filter((e: any) => e.data().user === true);
      setResults(newResults);
    } else {
      setResults(recipes);
    }
    // eslint-disable-next-line
  }, [userCreated]);

  const accordionGroupChange = (ev: AccordionGroupCustomEvent) => {
    const selectedValue = ev.detail.value;
    console.log(selectedValue)
      if (selectedValue === undefined ||selectedValue === "second") { 
        setResults(recipes) }
  };
  return (
    <IonPage>
      <IonHeader>
        <BrandHeader />
      </IonHeader>

      <IonContent fullscreen>
        <IonAccordionGroup ref={accordionGroup} onIonChange={accordionGroupChange}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonIcon icon={filterOutline} />
              <IonLabel>Filter</IonLabel>
            </IonItem>
            <IonSegment scrollable value="heart" slot="content">
              {categories &&
                Object.keys(categories).map((value: any, index: any) => {
                  return (
                    <IonSegmentButton
                      key={index}
                      value={value}
                      onClick={(e: any) => {
                        setCategory(e.target.value);
                        toggleFilter();
                      }}
                    >
                      {value}
                    </IonSegmentButton>
                  );
                })}
            </IonSegment>
          </IonAccordion>
          <IonAccordion value="second">
            <IonSegment scrollable value="heart" slot="content">
              {category &&
                categories[`${category}`].map((value: any, index: any) => {
                  return (
                    <IonSegmentButton
                      key={index}
                      value={value["display-name"]}
                      onClick={(e: any) => searchWithFilter(e.target.value)}
                    >
                      {value["display-name"]}
                    </IonSegmentButton>
                  );
                })}
            </IonSegment>
          </IonAccordion>
        </IonAccordionGroup>
        <IonItem>
          <IonLabel>Show User Created Recipes</IonLabel>
          <IonToggle
            checked={userCreated}
            onIonChange={(e: any) => setUserCreated(e.detail.checked)}
          />
        </IonItem>
        <IonButton
          className="create-recipe"
          expand="full"
          shape="round"
          onClick={() => present(modalOptions)}
        >
          <IonIcon src={PostAddIcon} />
          Create Your Own Recipe
        </IonButton>
        {results.length > 0 ? (
          <div className="container">
            {results.map((recipe: any, index: number) => {
              return (
                <SmallRecipeCard
                  key={index}
                  index={index}
                  recipe={recipe.data()}
                />
              );
            })}
          </div>
        ) : (
          <EmptyContainer name="Recipes" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
