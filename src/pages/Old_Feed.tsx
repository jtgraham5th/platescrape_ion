import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonSearchbar,
  IonCol,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import axios from "axios";
import { caretBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { Virtuoso } from "react-virtuoso";
import "swiper/css";
import "swiper/css/free-mode";
import { FeedStore } from "../store";
import { getTags, getCategories } from "../store/Selectors";
import RecipeCard from "../components/RecipeCard";
import styles from "./Feed.module.scss";

const Feed: React.FC = () => {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  // const [tags, setTags] = useState<any>({});
  // const [categories, setCategories] = useState<any>({});
  const categories = FeedStore.useState(getCategories);
  const tags = FeedStore.useState(getTags);
  const [segment, setSegment] = useState("cuisines");

  const toggleSegment = (value: any) => {
    setSegment(value);
  };

  useEffect(() => {
    console.log(categories[`${segment}`].length);

    // getCategoriesList();
    // getTagsList();
  }, []);

  const getCategoriesList = async () => {
    const options = {
      headers: {
        "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
    };
    await axios
      .get("https://yummly2.p.rapidapi.com/categories/list", options)
      .then((res: any) => {
        for (let i = 8; i <= 10; i++) {
          let newCategoryArray: any = [];
          res.data["browse-categories"][i]["display"]["categoryTopics"].forEach(
            (e: any) => {
              let option = { name: "", image: "", id: "" };
              option.name = e.display.displayName;
              option.image = e.display.categoryImage || e.display.iconImage;
              option.id = e.display.tag || "";
              newCategoryArray.push(option);
            }
          );
          // setCategories((prevState: any) => ({
          //   ...prevState,
          //   [res.data["browse-categories"][i]["tracking-id"]]: newCategoryArray,
          // }));
        }
      });
    console.log(categories);
  };

  const getTagsList = async () => {
    const options = {
      headers: {
        "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
    };
    await axios
      .get("https://yummly2.p.rapidapi.com/tags/list", options)
      .then((res: any) => {
        const selectedCategories = ["user-diet", "user-allergy"];

        selectedCategories.forEach((category) => {
          let newCategoryArray: any = [];
          res.data["en-US"][`${category}`].forEach((e: any) => {
            let option = { name: "", image: "", id: "" };
            option.name = e.name;
            option.image = e.imageUrl;
            option.id = e.id;
            newCategoryArray.push(option);
          });
          // setTags((prevState: any) => ({
          //   ...prevState,
          //   [category]: newCategoryArray,
          // }));
        });
        console.log(tags);
      });
  };

  const searchRecipes = async (e: any) => {
    e.preventDefault();
    console.log(categories, tags);
    // const options = {
    //   params: { start: "0", maxResult: "20", q: query },
    //   headers: {
    //     "X-RapidAPI-Key": "8c9d803252msh0838d888ce56253p165855jsna533a76ddc02",
    //     "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
    //   },
    // };
    // await axios
    //   .get("https://yummly2.p.rapidapi.com/feeds/search", options)
    //   .then((res: any) => {
    //     console.log(res.data.feed);
    //     setResults(res.data.feed);
    //   });
  };
  const searchWithId = async (e: any, id: string) => {
    e.preventDefault();
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
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
        <IonRow className="search-container">
          <IonCol size="12" color="primary">
            <form
              onSubmit={(e) => searchRecipes(e)}
              style={{ display: "flex" }}
            >
              {results.length > 0 ? (
                <IonButton
                  color="primary"
                  size="default"
                  onClick={() => setResults([])}
                >
                  <IonIcon icon={caretBack} />
                </IonButton>
              ) : null}
              <IonSearchbar
                id="searchbar"
                onIonChange={(e: any) => setQuery(e.detail.value)}
                placeholder="Search by food name or ingredient"
                color="dark"
              />
            </form>
          </IonCol>
        </IonRow>
      </IonHeader>

      <IonContent scrollY={false} fullscreen>
        {Object.keys(categories).length > 2 &&
        Object.keys(tags).length > 3 &&
        results.length < 1 ? (
          <>
            <IonRow className="ion-text-center">
              <IonCol size="12">
                <IonSegment
                  scrollable
                  onIonChange={(e) => toggleSegment(e.detail.value)}
                >
                  <IonSegmentButton value="cuisines">
                    <IonLabel>International Cuisines</IonLabel>
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
            {/* <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
                <IonItem className={styles.itemHeading}>
                  <IonLabel>International Cuisine</IonLabel>
                </IonItem> */}
            {/* <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  freeMode={true}
                  modules={[FreeMode]}
                  className={styles.swiper}
                > */}

            <Virtuoso
              style={{ height: "95%" }}
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
                    <h1>{categories[`${segment}`][index].name}</h1>
                  </div>
                );
              }}
            />
            {/* {segment === "cuisines" &&
                categories["cuisines"] &&
                categories["cuisines"].map((category: any, i: number) => (
                  // <SwiperSlide key={i} className={styles.swiperSlide}>
                  <div
                    className={styles.categoryContainer}
                    onClick={(e) => searchWithId(e, category.id)}
                  >
                    <img src={category.image} alt="cover" />
                    <h1>{category.name}</h1>
                  </div>
                  // </SwiperSlide>
                ))} */}
            {/* {segment === "courses" &&
                categories["courses"] &&
                categories["courses"].map((category: any, i: number) => (
                  // <SwiperSlide key={i} className={styles.swiperSlide}>
                  <div
                    className={styles.categoryContainer}
                    onClick={(e) => searchWithId(e, category.id)}
                  >
                    <img src={category.image} alt="cover" />
                    <h1>{category.name}</h1>
                  </div>
                  // </SwiperSlide>
                ))} */}
            {/* {segment === "diets" &&
                categories["diets"] &&
                categories["diets"].map((category: any, i: number) => (
                  // <SwiperSlide key={i} className={styles.swiperSlide}>
                  <div
                    className={styles.categoryContainer}
                    onClick={(e) => searchWithId(e, category.id)}
                  >
                    <img src={category.image} alt="cover" />
                    <h1>{category.name}</h1>
                  </div>
                  // </SwiperSlide>
                ))} */}

            {/* </Swiper> */}
            {/* </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
              <IonItem className={styles.itemHeading}>
                  <IonLabel>Courses</IonLabel>
                </IonItem>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  freeMode={true}
                  modules={[FreeMode]}
                  className={styles.swiper}
                >
                  {categories["courses"].map((category: any, i: number) => (
                    <SwiperSlide key={i} className={styles.swiperSlide}>
                      <div
                        className={styles.categoryContainer}
                        onClick={(e) => searchWithId(e, category.id)}
                      >
                        <img src={category.image} alt="cover" />
                        <p>{category.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
              <IonItem className={styles.itemHeading}>
                  <IonLabel>Special Diets</IonLabel>
                </IonItem>

                <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  freeMode={true}
                  modules={[FreeMode]}
                  className={styles.swiper}
                >
                  {categories["Diets"].map((category: any, i: number) => (
                    <SwiperSlide key={i} className={styles.swiperSlide}>
                      <div
                        className={styles.categoryContainer}
                        onClick={(e) => searchWithId(e, category.id)}
                      >
                        <img src={category.image} alt="cover" />
                        <p>{category.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
                <IonCol size="12">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    modules={[FreeMode]}
                  >
                    {tags["diet"].map((category: any, i: number) => (
                      <SwiperSlide key={i}>
                        <div
                          className={styles.categoryContainer}
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          <img src={category.image} alt="cover" />
                          <p>{category.name}</p>
                        </div>
                        {/* <IonButton
                          color="dark"
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          {category.name}
                        </IonButton> 
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </IonCol>
              </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
                <IonCol size="12">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    modules={[FreeMode]}
                  >
                    {tags["cuisine"].map((category: any, i: number) => (
                      <SwiperSlide key={i}>
                        <IonButton
                          color="dark"
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          {category.name}
                        </IonButton>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </IonCol>
              </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
                <IonCol size="12">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    modules={[FreeMode]}
                  >
                    {tags["course"].map((category: any, i: number) => (
                      <SwiperSlide key={i}>
                        <IonButton
                          color="dark"
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          {category.name}
                        </IonButton>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </IonCol>
              </IonRow>
              <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
                <IonCol size="12">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    modules={[FreeMode]}
                  >
                    {tags["allergy"].map((category: any, i: number) => (
                      <SwiperSlide key={i}>
                        <div
                          className={styles.categoryContainer}
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          <img src={category.image} alt="cover" />
                          <p>{category.name}</p>
                        </div>
                        {/* <IonButton
                          color="dark"
                          onClick={(e) => searchWithId(e, category.id)}
                        >
                          {category.name}
                        </IonButton> 
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </IonCol>
              </IonRow> */}
          </>
        ) : null}
        {results.length > 0 ? (
          <Virtuoso
            style={{ height: "95%" }}
            totalCount={results.length}
            itemContent={(index: number) => {
              return <RecipeCard index={index} recipe={results[index]} />;
            }}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
