import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonRow,
  IonSearchbar,
  IonCol,
  IonButton,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonButtons,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import { caretBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import "swiper/css";
import "swiper/css/free-mode";
import { FeedStore } from "../store";
import { getTags, getCategories } from "../store/Selectors";
import RecipeCard from "../components/RecipeCard";
import styles from "./Feed.module.scss";
import BrandHeader from "../components/BrandHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../data/AuthContext";
import { useHistory } from "react-router";
import EmptyContainer from "../components/EmptyContainer";

const Feed: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState([]);
  const [load, setLoad] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const categories = FeedStore.useState(getCategories);
  const tags = FeedStore.useState(getTags);
  const [segment, setSegment] = useState("cuisines");

  const history = useHistory();
  const { auth } = useAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user?.uid) history.push("/feed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const toggleSegment = (value: any) => {
    setSegment(value);
  };

  const convertRecipe = (recipe: any) => {
    let newRecipe: {
      name: string;
      servings: number;
      time: string;
      image: string;
      ingredients: Array<any>;
      directions: Array<any>;
      user: boolean;
      category: object;
      rating: number;
    } = {
      name: recipe.display.displayName,
      servings: recipe.content.details.numberOfServings,
      time: recipe.content.details.totalTime,
      image: recipe.display.images[0],
      ingredients: [],
      directions: recipe.content.preparationSteps,
      user: false,
      category: recipe.content.tags,
      rating: recipe.content.reviews.averageRating
        ? recipe.content.reviews.averageRating.toFixed(1)
        : 0,
    };
    recipe.content.ingredientLines.forEach((ingredient: any) => {
      let newIngredient = {
        name: ingredient.ingredient.toLowerCase(),
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        category: ingredient.category,
      };
      newRecipe.ingredients.push(newIngredient);
    });
    return newRecipe;
  };
  // const getCategoriesList = async () => {
  //   const options = {
  //     headers: {
  //       "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
  //       "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
  //     },
  //   };
  //   await axios
  //     .get("https://yummly2.p.rapidapi.com/categories/list", options)
  //     .then((res: any) => {
  //       for (let i = 8; i <= 10; i++) {
  //         let newCategoryArray: any = [];
  //         res.data["browse-categories"][i]["display"]["categoryTopics"].forEach(
  //           (e: any) => {
  //             let option = { name: "", image: "", id: "" };
  //             option.name = e.display.displayName;
  //             option.image = e.display.categoryImage || e.display.iconImage;
  //             option.id = e.display.tag || "";
  //             newCategoryArray.push(option);
  //           }
  //         );
  //         // setCategories((prevState: any) => ({
  //         //   ...prevState,
  //         //   [res.data["browse-categories"][i]["tracking-id"]]: newCategoryArray,
  //         // }));
  //       }
  //     });
  //   console.log(categories);
  // };

  // const getTagsList = async () => {
  //   const options = {
  //     headers: {
  //       "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
  //       "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
  //     },
  //   };
  //   await axios
  //     .get("https://yummly2.p.rapidapi.com/tags/list", options)
  //     .then((res: any) => {
  //       const selectedCategories = ["user-diet", "user-allergy"];

  //       selectedCategories.forEach((category) => {
  //         let newCategoryArray: any = [];
  //         res.data["en-US"][`${category}`].forEach((e: any) => {
  //           let option = { name: "", image: "", id: "" };
  //           option.name = e.name;
  //           option.image = e.imageUrl;
  //           option.id = e.id;
  //           newCategoryArray.push(option);
  //         });
  //         // setTags((prevState: any) => ({
  //         //   ...prevState,
  //         //   [category]: newCategoryArray,
  //         // }));
  //       });
  //       console.log(tags);
  //     });
  // };

  const searchRecipes = async (e: any) => {
    e.preventDefault();
    setNoResults(false)
    setLoad(true);
    const options = {
      params: { start: "0", maxResult: "20", q: query },
      headers: {
        "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
    };
    await axios
      .get("https://yummly2.p.rapidapi.com/feeds/search", options)
      .then((res: any) => {
        console.log(res.data.feed);
        res.data.feed.length < 1
          ? setNoResults(true)
          : setResults(res.data.feed);
        setLoad(false);
      });
  };
  const searchWithId = async (e: any, id: string) => {
    e.preventDefault();
    setLoad(true);
    setResults([]);
    const options = {
      params: { tag: id, maxResult: "20", start: "0" },
      headers: {
        "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
    };
    await axios
      .get("https://yummly2.p.rapidapi.com/feeds/list", options)
      .then((res: any) => {
        console.log(res.data.feed);
        setResults(res.data.feed);
        setLoad(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <BrandHeader />
        <IonRow className="search-container">
          <IonCol size="12" color="primary" style={{ padding: "0" }}>
            <form
              onSubmit={(e) => searchRecipes(e)}
              style={{ display: "flex" }}
              action=""
            >
              <IonToolbar className={styles.toolbar}>
                {results.length > 0 ? (
                  <IonButtons slot="start">
                    <IonButton color="primary" onClick={() => setResults([])}>
                      <IonIcon icon={caretBack} />
                    </IonButton>
                  </IonButtons>
                ) : null}
                <IonSearchbar
                  id="searchbar"
                  onIonChange={(e: any) => setQuery(e.detail.value)}
                  placeholder="Search by food name or ingredient"
                  color="light"
                  onIonClear={() => {
                    setResults([]);
                    setNoResults(false);
                  }}
                  inputMode="search"
                />
              </IonToolbar>
            </form>
          </IonCol>
        </IonRow>
      </IonHeader>

      <IonContent scrollY={false} fullscreen>
        {Object.keys(categories).length > 2 &&
        Object.keys(tags).length > 3 &&
        !load &&
        results.length > 1 ? (
          <Virtuoso
            className={styles.feedContent}
            style={{ height: "100%" }}
            totalCount={results.length}
            itemContent={(index: number) => {
              return (
                <RecipeCard
                  index={index}
                  recipe={convertRecipe(results[index])}
                />
              );
            }}
          />
        ) : load ? (
          <IonRow class={styles.spinner}>
            <IonSpinner name="lines" />
          </IonRow>
        ) : noResults ? (
          <EmptyContainer searchTerm={query} />
        ) : (
          <>
            <IonRow className="ion-text-center">
              <IonCol size="12" className={styles.segment}>
                <IonSegment
                  scrollable
                  onIonChange={(e) => toggleSegment(e.detail.value)}
                >
                  <IonSegmentButton value="cuisines">
                    <IonLabel>Cuisines</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="courses">
                    <IonLabel>Courses</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="diets">
                    <IonLabel>Special Diets</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonRow>
            <Virtuoso
              style={{ height: "100%", paddingBottom: "3rem" }}
              className={styles.feedContent}
              totalCount={categories[`${segment}`].length}
              itemContent={(index: number) => {
                return (
                  <div
                    className={styles.categoryContainer}
                    onClick={(e) =>
                      searchWithId(e, categories[`${segment}`][index].id)
                    }
                  >
                    <img
                      src={categories[`${segment}`][index].image}
                      alt="cover"
                    />
                    <h3>{categories[`${segment}`][index].name}</h3>
                  </div>
                );
              }}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
