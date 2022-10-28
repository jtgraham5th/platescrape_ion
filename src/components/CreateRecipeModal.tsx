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

import styles from "./CreateModal.module.scss";
import DirectionsInput from "./DirectionsInput";
import IngredientsInput from "./ingredientsInput";

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

  const { register, handleSubmit, unregister, control } = useForm({
    defaultValues: {
      name: "",
      servings: 0,
      time: "",
      image: "",
      category: {
        course: [],
        cuisine: [],
        dish: [],
        technique: [],
        nutrition: [],
      },
      ingredients: [
        { name: "", amount: "", category: "" },
        { name: "", amount: "", category: "" },
        { name: "", amount: "", category: "" },
        { name: "", amount: "", category: "" },
        { name: "", amount: "", category: "" },
      ],
      directions: [
        { step: "" },
        { step: "" },
        { step: "" },
        { step: "" },
        { step: "" },
      ],
      user: false,
      rating: 0,
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
      image: "/assets/ingredients.jpeg",
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
    ingredientAppend({ name: "", amount: "", category: "" });
  };
  const additionalDirection = (e: any) => {
    directionAppend({ step: "" });
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
          console.log(amount);
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
                    // value={recipeData ? recipeData.name : ""}
                    // onInput={(e: any) => setName(e.target.value)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="search-container animate__animated animate__fadeIn">
              <IonCol size="12">
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Serving Size</IonLabel>
                    <IonSelect
                      interface="popover"
                      placeholder="Select Serving Size"
                      {...register("servings")}
                      // value={recipeData ? recipeData.servings : 0}
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
                          // value={
                          //   recipeData?.category.course
                          //     ? [...recipeData.category.course]
                          //     : []
                          // }
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
                          // value={
                          //   recipeData?.category.cuisine
                          //     ? [...recipeData.category.cuisine]
                          //     : []
                          // }
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
                          // value={
                          //   recipeData?.category.dish
                          //     ? [...recipeData.category.dish]
                          //     : []
                          // }
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
                          // value={
                          //   recipeData?.category.nutrition
                          //     ? [...recipeData.category.nutrition]
                          //     : []
                          // }
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
                          // value={
                          //   recipeData?.category.technique
                          //     ? [...recipeData.category.technique]
                          //     : []
                          // }
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
                    <IonInput
                      placeholder=" + Add Additional Step"
                      onClick={additionalDirection}
                    ></IonInput>
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
