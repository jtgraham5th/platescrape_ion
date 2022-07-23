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
  IonFooter,
} from "@ionic/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addToFavorites } from "../store/RecipeStore";
import styles from "./CreateModal.module.scss";

const CreateRecipeModal: React.FC<{
  dismiss: any;
}> = ({ dismiss }) => {
  const [ingAmount, setIngAmount] = useState(5);
  const [presentToast] = useIonToast();
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (recipe: any) => {
    console.log(recipe);
    let newRecipe: {
      name: string;
      servings: number;
      time: string;
      image: string;
      ingredients: Array<any>;
      directions: Array<any>;
      user: boolean;
      rating: number;
    } = {
      name: recipe.name,
      servings: recipe.servingSize,
      time: "",
      image: "/assets/ingredients.jpeg",
      ingredients: [],
      directions: [],
      user: true,
      rating: 5,
    };
    for (let i = 0; i <= ingAmount - 1; i++) {
      if (recipe[`ingName${i}`].length > 0) {
        let amount = recipe[`ingAmount${i}`].match(/(\d+|[^\d]+)/g);

        let newIngredient = {
          name: recipe[`ingName${i}`],
          quantity: parseInt(amount[0]) ? amount[0] : null,
          unit:
            amount.length > 1 && parseInt(amount[0])
              ? amount[1]
              : parseInt(amount[0])
              ? null
              : amount[0],
          category: "Miscellaneous",
        };
        newRecipe.ingredients.push(newIngredient);
      }
    }
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
        <IonRow className="search-container animate__animated animate__fadeIn">
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Recipe Title</IonLabel>
              <IonInput
                {...register("name", { required: "This is a required field" })}
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
                  <IonCol size="9" className={styles.ingName}>
                    <IonInput
                      color="primary"
                      {...register(`ingName${i}`)}
                      // value={name}
                      // onInput={(e: any) => setName(e.target.value)}
                    />
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
      </IonContent>
      <IonFooter>
          <IonButton
          className="create-recipe"
            expand="full"
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
