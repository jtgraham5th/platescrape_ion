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
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import {
  arrowForwardOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useData } from "../data/DataContext";

import styles from "./CreateModal.module.scss";

const CreateRecipeModal: React.FC<{
  dismiss: any;
}> = ({ dismiss }) => {
  const { addToFavorites } = useData().recipes;
  const [ingAmount, setIngAmount] = useState(5);
  const [dirAmount, setDirAmount] = useState(5);
  const [toggleDirections, setToggleDirections] = useState(false);
  const [presentToast] = useIonToast();
  const { control, register, handleSubmit } = useForm();
  const ingredientCategories =
    useData().shopping.getAllShoppingListCategories();

  const onSubmit = (recipe: any) => {
    console.log(recipe);
    let newRecipe: {
      name: string;
      servings: number;
      time: string;
      image: string;
      category: Object;
      ingredients: Array<any>;
      directions: Array<any>;
      user: boolean;
      rating: number;
    } = {
      name: recipe.name,
      servings: parseInt(recipe.servingSize),
      time: "",
      image: "/assets/ingredients.jpeg",
      ingredients: [],
      directions: [],
      category: {
        course: [],
        cuisine: [],
        dish: [],
        technique: [],
        nutrition: [],
      },
      user: true,
      rating: 5,
    };
    for (let i = 0; i <= ingAmount - 1; i++) {
      if (recipe[`ingName${i}`].length > 0) {
        let amount = recipe[`ingAmount${i}`]
          ? recipe[`ingAmount${i}`].match(/(\d+|[^\d]+)/g)
          : "";
        console.log(amount);
        let newIngredient = {
          name: recipe[`ingName${i}`],
          quantity: parseInt(amount[0]) ? amount[0] : "",
          unit:
            amount.length > 1 && parseInt(amount[0])
              ? amount[1]
              : parseInt(amount[0])
              ? amount[0]
              : "",
          category:
            typeof recipe[`ingCategory${i}`] === "string"
              ? recipe[`ingCategory${i}`]
              : "Miscellaneous",
        };
        newRecipe.ingredients.push(newIngredient);
      }
    }
    for (let i = 0; i <= dirAmount - 1; i++) {
      if (recipe[`directions${i}`]) {
        newRecipe.directions.push(recipe[`directions${i}`]);
      }
    }
    console.log(newRecipe);
    addToFavorites(newRecipe);
    presentToast(`${newRecipe.name} has been added to your Recipes`, 3000);
    dismiss();
  };

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
                    // value={name}
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
                    <Controller
                      control={control}
                      render={({ field }) => (
                        <IonSelect
                          interface="popover"
                          value={field.value}
                          placeholder="Select Serving Size"
                        >
                          {Array.apply(null, Array(20)).map((e, i) => (
                            <IonSelectOption key={i} value={i + 1}>
                              {i + 1}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      )}
                      name="servingSize"
                    />
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Ingredient</IonLabel>
                  {Array.apply(null, Array(ingAmount)).map((e, i) => (
                    <IonRow key={i}>
                      <IonCol size="3" className={styles.ingAmt}>
                        <IonInput
                          color="primary"
                          {...register(`ingAmount${i}`)}
                          // value={name}
                          // onInput={(e: any) => setName(e.target.value)}
                        />
                      </IonCol>
                      <IonCol size="6" className={styles.ingName}>
                        <IonInput
                          color="primary"
                          {...register(`ingName${i}`)}
                          // value={name}
                          // onInput={(e: any) => setName(e.target.value)}
                        />
                      </IonCol>
                      <IonCol size="3" className={styles.ingCategory}>
                        <IonItem>
                          <Controller
                            control={control}
                            render={({ field }) => (
                              <IonSelect
                                interface="popover"
                                value={field.value}
                                placeholder="category"
                              >
                                {ingredientCategories.map(
                                  (category: string, i: number) => (
                                    <IonSelectOption key={i} value={category}>
                                      {category}
                                    </IonSelectOption>
                                  )
                                )}
                              </IonSelect>
                            )}
                            name={`ingCategory${i}`}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  ))}
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="12">
                      <IonInput
                        placeholder=" + Add Ingredient"
                        onClick={() => setIngAmount(ingAmount + 1)}
                      ></IonInput>
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
                {Array.apply(null, Array(dirAmount)).map((e, i) => (
                  <IonRow style={{ width: "100%" }} key={i}>
                    <IonCol size="1">
                      <h3>{i + 1}. </h3>
                    </IonCol>
                    <IonCol size="11">
                      <IonTextarea
                        className={styles.recipeDirections}
                        color="primary"
                        {...register(`directions${i}`)}
                        // value={name}
                        // onInput={(e: any) => setName(e.target.value)}
                      />
                    </IonCol>
                  </IonRow>
                ))}
                <IonRow style={{ width: "100%" }}>
                  <IonCol size="12">
                    <IonInput
                      placeholder=" + Add Additional Step"
                      onClick={() => setDirAmount(dirAmount + 1)}
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
      </IonContent>
    </form>
  );
};
export default CreateRecipeModal;
