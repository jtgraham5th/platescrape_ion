import {
  IonRow,
  IonCol,
  IonInput,
  IonItem,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useData } from "../data/DataContext";
import { Controller } from "react-hook-form";

import styles from "./CreateModal.module.scss";

const IngredientsInput: React.FC<{
  index: any;
  control: any;
}> = ({ control, index }) => {
  const ingredientCategories = useData().shopping.getAllIngredientCategories();

  return (
    <IonRow>
      <IonCol size="3" className={styles.ingAmt}>
        <Controller
          control={control}
          name={`ingredients[${index}].amount`}
          render={({ field }) => (
            <IonInput
              color="primary"
              onIonChange={(e) => field.onChange(e.target.value)}
              onIonBlur={() => field.onBlur()}
              {...field}
            />
          )}
        />
      </IonCol>
      <IonCol size="6" className={styles.ingName}>
        <Controller
          control={control}
          name={`ingredients[${index}].name`}
          render={({ field }) => (
            <IonInput
              color="primary"
              onIonChange={(e) => field.onChange(e.target.value)}
              onIonBlur={() => field.onBlur()}
              {...field}
            />
          )}
        />
      </IonCol>
      <IonCol size="3" className={styles.ingCategory}>
        <IonItem>
          <Controller
            control={control}
            name={`ingredients[${index}].category`}
            render={({ field }) => (
              <IonSelect
                interface="popover"
                placeholder="category"
                onIonChange={(e) => field.onChange(e.target.value)}
                onIonBlur={() => field.onBlur()}
                {...field}
              >
                {Object.keys(ingredientCategories)
                  .sort()
                  .map((category: string, i: number) => (
                    <IonSelectOption key={i} value={category}>
                      {category}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            )}
          />
        </IonItem>
      </IonCol>
    </IonRow>
  );
};
export default IngredientsInput;
