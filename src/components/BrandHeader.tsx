import { IonToolbar, IonTitle } from "@ionic/react";
import "./BrandHeader.css";

const BrandHeader: React.FC = () => {
  return (
    <IonToolbar>
      <IonTitle>
        Platescrape
      </IonTitle>
    </IonToolbar>
  );
};

export default BrandHeader;
