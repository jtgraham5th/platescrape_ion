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
import styles from "./Login.module.scss";

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from "../components/CustomField";
import { useLoginFields } from "../data/fields";
import { Action } from "../components/Action";
import { useEffect, useState } from "react";
import { validateForm } from "../data/utils";
import { useHistory, useParams } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../data/AuthContext";

const Login: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();
  const { auth, login } = useAuth();
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

  const fields = useLoginFields();
  const [errors, setErrors] = useState<any>(false);

  const handleLogin = () => {
    const errors = validateForm(fields);
    setErrors(errors);
    console.log(fields);
    if (!errors.length) {
      login(fields[0].input.state.value, fields[1].input.state.value)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential;
          console.log(user);
          history.push("/feed");
          return true;
        })
        .catch(async (error: any) => {
          // const errorCode = error.code;
          const errorMessage = error.message;

          await alert({
            header: "Error Signing In",
            message: errorMessage,
            buttons: ["OK"],
          });
        });
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field: any) => field.input.state.reset(""));
      setErrors(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <IonPage className={styles.loginPage}>
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
              <IonCardTitle>Log in</IonCardTitle>
              <h5>Welcome back, hope you're doing well</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map((field: any) => {
                return <CustomField field={field} errors={errors} />;
              })}

              <IonButton
                className="custom-button"
                expand="block"
                onClick={handleLogin}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <Action
            message="Don't have an account?"
            text="Sign up"
            link="/signup"
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
