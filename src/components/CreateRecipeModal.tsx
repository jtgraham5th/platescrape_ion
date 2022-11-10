import {
  IonRow,
  IonButtons,
  IonTitle,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  useIonToast,
  IonSelectOption,
  IonList,
  IonSelect,
  IonIcon,
  IonAccordion,
  IonAccordionGroup,
  IonFooter,
} from "@ionic/react";
import { arrowForwardOutline, arrowBackOutline } from "ionicons/icons";
import { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useData } from "../data/DataContext";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { useAuth } from "../data/AuthContext";

import styles from "./CreateModal.module.scss";
import DirectionsInput from "./DirectionsInput";
import IngredientsInput from "./ingredientsInput";

import CreateRecipeImage from "./CreateRecipeImage";

interface newRecipeCategories {
  [key: string]: Array<string>;
  course: Array<string>;
  cuisine: Array<string>;
  dish: Array<string>;
  technique: Array<string>;
  nutrition: Array<string>;
}

interface ingredients {
  [key: string]: string;
  name: string;
  quantity: string;
  unit: string;
  category: string;
}

const CreateRecipeModal: React.FC<{
  dismiss: any;
  recipeData?: any;
}> = ({ dismiss, recipeData }) => {
  const { addToFavorites, updateRecipe } = useData().recipes;
  const [toggleDirections, setToggleDirections] = useState(false);
  const [presentToast] = useIonToast();
  const [recipeImage, setRecipeImage] = useState(
    recipeData ? recipeData.image : ""
  );

  const { storage } = useData();
  const { getUser } = useAuth();
  const userID = getUser().uid;

  const sortIngredients = (ingredients: Array<any>) => {
    let sortedIngredients: {
      name: string;
      amount: string;
      category: string;
    }[] = [];

    ingredients.forEach((ingredient: any) => {
      let ingredientObject = { name: "", amount: "", category: "" };
      ingredientObject.name = ingredient.name;
      ingredientObject.amount =
        ingredient.quantity.toString() + " " + ingredient.unit.toString();
      ingredientObject.category = ingredient.category;
      sortedIngredients.push(ingredientObject);
    });
    return sortedIngredients;
  };
  const sortDirections = (directions: Array<any>) => {
    let sortedDirections: {
      step: string;
    }[] = [];
    directions.forEach((direction: any) => {
      let directionObject = { step: "" };
      directionObject.step = direction;
      sortedDirections.push(directionObject);
    });
    return sortedDirections;
  };

  const uploadPhoto = async (recipeImage: any, recipeName: string) => {
    // let webpath: any | URL = recipeImage;
    if (recipeImage) {
      const storageRef = ref(storage, `${userID}/${recipeName}`);
      // const response: string = await fetch(webpath)
      //   .then((res) => res.blob())
      //   // we create a new request using the Request() constructor, then use it to fetch a JPG.
      //   .then(
      //     async (myBlob: any) =>
      // await uploadBytes(storageRef, myBlob).then( <---- Use with blobs not image strings
      const response = await uploadString(
        storageRef,
        recipeImage,
        "data_url"
      ).then(
        async (snapshot) =>
          await getDownloadURL(ref(storage, `${userID}/${recipeName}`)).then(
            (url) => url as string
          )
      );
      console.log(response);
      const photoUrl: string = response;
      return photoUrl;
    } else {
      return "";
    }
  };

  const { register, handleSubmit, unregister, control } = useForm({
    defaultValues: {
      name: recipeData ? recipeData.name : "",
      servings: recipeData ? recipeData.servings : 0,
      time: "",
      image: recipeImage,
      category: {
        course: recipeData?.category.course
          ? [...recipeData.category.course]
          : [],
        cuisine: recipeData?.category.cuisine
          ? [...recipeData.category.cuisine]
          : [],
        dish: recipeData?.category.dish ? [...recipeData.category.dish] : [],
        technique: recipeData?.category.technique
          ? [...recipeData.category.technique]
          : [],
        nutrition: recipeData?.category.nutrition
          ? [...recipeData.category.nutrition]
          : [],
      },
      ingredients: recipeData
        ? sortIngredients(recipeData.ingredients)
        : [
            { name: "", amount: "", category: "" },
            { name: "", amount: "", category: "" },
            { name: "", amount: "", category: "" },
            { name: "", amount: "", category: "" },
            { name: "", amount: "", category: "" },
          ],
      directions: recipeData
        ? sortDirections(recipeData.directions)
        : [
            { step: "" },
            { step: "" },
            { step: "" },
            { step: "" },
            { step: "" },
          ],
      user: false,
      rating: recipeData ? recipeData.rating : 0,
    },
  });
  const {
    fields: ingredientFields,
    append: ingredientAppend,
    // remove: ingredientRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredients", // unique name for your Field Array
    rules: { minLength: 5 },
  });
  const {
    fields: directionFields,
    append: directionAppend,
    // remove: directionRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "directions", // unique name for your Field Array
    rules: { minLength: 5 },
  });

  useData().shopping.getAllShoppingListCategories();
  const recipeCategories = useData().recipes.getAllRecipesCategories();
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  const onSubmit = async (recipe: any) => {
    console.log(recipe);
    let newRecipe: {
      name: string;
      servings: number;
      time: string;
      image: string;
      category: newRecipeCategories;
      ingredients: Array<ingredients>;
      directions: Array<any>;
      user: boolean;
      rating: number;
    } = {
      name: recipe.name,
      servings: parseInt(recipe.servingSize),
      time: "",
      image: "",
      ingredients: [...recipe.ingredients],
      directions: [...recipe.directions],
      category: {
        course: [...recipe.category.course],
        cuisine: [...recipe.category.cuisine],
        dish: [...recipe.category.dish],
        technique: [...recipe.category.technique],
        nutrition: [...recipe.category.nutrition],
      },
      user: true,
      rating: 5,
    };
    await uploadPhoto(recipeImage, newRecipe.name).then((value) => {
      newRecipe.image = recipeImage ? value : "/assets/ingredients.jpeg";
    });
    newRecipe.ingredients = parseIngredients(recipe);
    newRecipe.directions = parseDirections(recipe);
    console.log(newRecipe);
    recipeData
      ? updateRecipe(newRecipe, recipeData)
      : addToFavorites(newRecipe);
    presentToast(`${newRecipe.name} has been added to your Recipes`, 3000);
    dismiss();
  };
  const additionalIngredient = (e: any) => {
    ingredientAppend({ name: "", amount: "", category: "" },{ shouldFocus: false });
  };
  const additionalDirection = (e: any) => {
    directionAppend({ step: "" }, { shouldFocus: false });
  };
  const parseDirections = (recipe: any) => {
    let parsedDirections: string[] = [];
    recipe.directions.forEach((direction: any) => {
      if (direction.step) {
        parsedDirections.push(direction.step);
      }
    });
    return parsedDirections;
  };
  const parseIngredients = (recipe: any) => {
    let parsedIngredients: ingredients[] = [];
    recipe.ingredients.forEach((ingredient: any, index: number) => {
      if (ingredient.name.length) {
        let amount = ingredient.amount
          ? ingredient.amount.match(/(\d+|[^\d]+)/g)
          : " ";
        let newIngredient = {
          name: ingredient.name,
          quantity: parseInt(amount[0]) ? amount[0] : " ",
          unit:
            amount.length > 1 && parseInt(amount[0])
              ? amount[1]
              : parseInt(amount[0])
              ? " "
              : amount[0],
          category:
            ingredient.category.length > 1
              ? ingredient.category
              : "Miscellaneous",
        };
        parsedIngredients.push(newIngredient);
      }
    });
    return parsedIngredients;
  };

  useEffect(
    () => () => {
      unregister("name", { keepValue: true });
      console.log("unregister");
    },
    [unregister]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Create Recipe</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.createModal}>
        {!toggleDirections ? (
          <>
            <IonRow className="search-container animate__animated animate__fadeIn">
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Recipe Title</IonLabel>
                  <IonInput
                    {...register("name", {
                      required: "This is a required field",
                    })}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <CreateRecipeImage
              recipeData={recipeData}
              image={recipeImage}
              setImage={setRecipeImage}
            />
            <IonRow className="search-container animate__animated animate__fadeIn">
              <IonCol size="12">
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Serving Size</IonLabel>
                    <IonSelect
                      interface="popover"
                      placeholder="Select Serving Size"
                      {...register("servings")}
                    >
                      {Array.apply(null, Array(20)).map((e, i) => (
                        <IonSelectOption key={i} value={i + 1}>
                          {i + 1}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
              <IonAccordionGroup ref={accordionGroup}>
                <IonAccordion value="first">
                  <IonItem slot="header">
                    <IonLabel>Add Categories</IonLabel>
                  </IonItem>
                  <IonRow
                    className="search-container animate__animated animate__fadeIn"
                    slot="content"
                  >
                    <IonCol size="4">
                      <IonItem>
                        <IonLabel position="stacked">Course</IonLabel>
                        <IonSelect
                          interface="popover"
                          placeholder="category"
                          multiple={true}
                          {...register("category.course")}
                        >
                          {recipeCategories.course.map(
                            (category: any, i: number) => (
                              <IonSelectOption key={i} value={category}>
                                {category["display-name"]}
                              </IonSelectOption>
                            )
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonCol size="4">
                      <IonItem>
                        <IonLabel position="stacked">Cuisine</IonLabel>
                        <IonSelect
                          interface="popover"
                          placeholder="category"
                          multiple={true}
                          {...register("category.cuisine")}
                        >
                          {recipeCategories.cuisine.map(
                            (category: any, i: number) => (
                              <IonSelectOption key={i} value={category}>
                                {category["display-name"]}
                              </IonSelectOption>
                            )
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonCol size="4">
                      <IonItem>
                        <IonLabel position="stacked">Dish</IonLabel>
                        <IonSelect
                          interface="popover"
                          placeholder="category"
                          multiple={true}
                          {...register("category.dish")}
                        >
                          {recipeCategories.dish.map(
                            (category: any, i: number) => (
                              <IonSelectOption key={i} value={category}>
                                {category["display-name"]}
                              </IonSelectOption>
                            )
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonCol size="4">
                      <IonItem>
                        <IonLabel position="stacked">Nutrition</IonLabel>
                        <IonSelect
                          interface="popover"
                          placeholder="category"
                          multiple={true}
                          {...register("category.nutrition")}
                        >
                          {recipeCategories.nutrition.map(
                            (category: any, i: number) => (
                              <IonSelectOption key={i} value={category}>
                                {category["display-name"]}
                              </IonSelectOption>
                            )
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonCol size="4">
                      <IonItem>
                        <IonLabel position="stacked">Technique</IonLabel>
                        <IonSelect
                          interface="popover"
                          placeholder="category"
                          multiple={true}
                          {...register("category.technique")}
                        >
                          {recipeCategories.technique.map(
                            (category: any, i: number) => (
                              <IonSelectOption key={i} value={category}>
                                {category["display-name"]}
                              </IonSelectOption>
                            )
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonAccordion>
              </IonAccordionGroup>

              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Ingredient</IonLabel>

                  {ingredientFields.map((field, index) => (
                    <IngredientsInput
                      key={field.id}
                      index={index}
                      control={control}
                    />
                  ))}
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="12">
                      <IonButton
                        expand="full"
                        shape="round"
                        type="button"
                        onClick={additionalIngredient}
                      >
                        + Add Ingredient
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonRow className="search-container animate__animated animate__fadeIn">
            <IonCol size="12">
              <IonItem>
                <IonLabel position="stacked">Directions</IonLabel>
                {directionFields.map((field, index) => (
                  <DirectionsInput
                    key={field.id}
                    index={index}
                    control={control}
                  />
                ))}
                <IonRow style={{ width: "100%" }}>
                  <IonCol size="12">
                  <IonButton
                        expand="full"
                        shape="round"
                        type="button"
                      onClick={additionalDirection}
                    >+ Add Additional Step</IonButton>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
          </IonRow>
        )}
        <IonButton
          expand="full"
          fill="clear"
          onClick={() => setToggleDirections(!toggleDirections)}
        >
          <IonIcon
            icon={!toggleDirections ? arrowForwardOutline : arrowBackOutline}
            slot={!toggleDirections ? "end" : "start"}
          />
          {!toggleDirections ? "Add Directions? (Optional)" : "Go back"}
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonButton
          className="create-recipe"
          expand="full"
          shape="round"
          type="submit"
          // disabled={name ? false : true}
          // onClick={handleSubmit}
        >
          Done
        </IonButton>
      </IonFooter>
    </form>
  );
};
export default CreateRecipeModal;
