import { IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonMenuButton } from "@ionic/react";
import { personCircle} from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../data/AuthContext";

import "./BrandHeader.css";

const BrandHeader: React.FC = () => {
  const { auth } = useAuth();
  const [user] = useAuthState(auth);

  return (
    <IonToolbar>
      <IonButtons slot="secondary">
        <IonMenuButton />
    </IonButtons>
    <IonButtons slot="primary">
    <IonButton >
        <IonIcon slot="icon-only" icon={personCircle} />
        <small>{user?.displayName || null}</small>
      </IonButton>
    </IonButtons>
      <IonTitle>
        Platescrape
      </IonTitle>
    </IonToolbar>
  );
};

export default BrandHeader;
