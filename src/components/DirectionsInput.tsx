import { IonRow, IonCol, IonTextarea } from "@ionic/react";
import { Controller } from "react-hook-form";

import styles from "./CreateModal.module.scss";

const DirectionsInput: React.FC<{
  index: any;
  control: any;
}> = ({ control, index }) => {
  return (
    <IonRow style={{ width: "100%" }}>
      <IonCol size="1">
        <h4>{index + 1}. </h4>
      </IonCol>
      <IonCol size="11">
        <Controller
          control={control}
          name={`directions[${index}.step]`}
          render={({ field }) => (
            <IonTextarea
              className={styles.recipeDirections}
              color="primary"
              placeholder={field.value}
              onIonChange={(e) => field.onChange(e.target.value)}
              onIonBlur={() => field.onBlur()}
              {...field}
            />
          )}
        />
      </IonCol>
    </IonRow>
  );
};
export default DirectionsInput;
