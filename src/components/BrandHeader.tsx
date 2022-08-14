import { IonToolbar, IonTitle, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { personCircle, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { useAuth } from "../data/AuthContext";

import "./BrandHeader.css";

const BrandHeader: React.FC = () => {
  const { auth, logout } = useAuth();
  const [user] = useAuthState(auth);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  }
  return (
    <IonToolbar>
      <IonButtons slot="secondary">
      <IonButton onClick={handleLogout}>
        <IonIcon slot="icon-only" icon={personCircle} />
        <small>{user?.displayName || null}</small>
      </IonButton>
    </IonButtons>
    <IonButtons slot="primary">
      <IonButton color="secondary">
        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
      </IonButton>
    </IonButtons>
      <IonTitle>
        Platescrape
      </IonTitle>
    </IonToolbar>
  );
};

export default BrandHeader;
