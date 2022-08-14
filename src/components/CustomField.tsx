import { IonInput, IonLabel } from "@ionic/react";
import styles from "./CustomField.module.scss";

interface ContainerProps {
  field: any;
  errors: any;
}

const CustomField: React.FC<ContainerProps> = ({ field, errors }) => {
  const error = errors && errors.filter((e: any) => e.id === field.id)[0];
  const errorMessage =
    error && errors.filter((e: any) => e.id === field.id)[0].message;

  return (
    <div className={styles.field}>
      <IonLabel className={styles.fieldLabel}>
        {field.label}
        {error && (
          <p className="animate__animated animate__bounceIn">{errorMessage}</p>
        )}
      </IonLabel>
      <IonInput
        className={styles.customInput}
        {...field.input.props}
        {...field.input.state}
      />
    </div>
  );
};

export default CustomField;
