import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import styles from "./Signup.module.scss";

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from "../components/CustomField";
import { useSignupFields } from "../data/fields";
import { Action } from "../components/Action";
import { useEffect, useState } from "react";
import { validateForm } from "../data/utils";
import { useHistory, useParams } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../data/AuthContext";

const Signup: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();
  const { auth, signUp } = useAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user?.uid) history.push("/feed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const params = useParams();
  const fields = useSignupFields();

  const [errors, setErrors] = useState<any>(false);

  const createAccount = () => {
    const errors = validateForm(fields);
    setErrors(errors);

    if (!errors.length) {
      signUp(
        fields[0].input.state.value,
        fields[1].input.state.value,
        fields[2].input.state.value
      )
        .then(() => {
          // Signed in
          history.replace("/feed");
          return true;
        })
        .catch(async (error: any) => {
          // const errorCode = error.code;
          const errorMessage = error.message;

          await alert({
            header: "Error Creating Account",
            message: errorMessage,
            buttons: ["OK"],
          });
        });
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <IonPage className={styles.signupPage}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className="custom-back" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton className="custom-button">
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Sign up</IonCardTitle>
              <h5>Lets get to know each other</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map((field) => {
                return <CustomField field={field} errors={errors} />;
              })}

              <IonButton
                className="custom-button"
                expand="block"
                onClick={createAccount}
              >
                Create account
              </IonButton>
            </IonCol>
          </IonRow>
          <Action
            message="Already got an account?"
            text="Login"
            link="/login"
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
