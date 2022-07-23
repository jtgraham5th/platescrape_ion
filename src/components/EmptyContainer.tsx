import { IonCol, IonRow } from "@ionic/react";
import "./EmptyContainer.css";

interface ContainerProps {
  name: string;
}

const EmptyContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonRow className="empty-container">
      <IonCol size="8">
        <div>
          <strong>You currently don't have any items in your {name}</strong>
        </div>
        <br />
        <div>Browse through the recipes and add ingredients to get started</div>
        <br />
        <div>
          <strong>- or -</strong>
        </div>
        <br />
        <div>Click the '+' button below to add your own.</div>
      </IonCol>
    </IonRow>
  );
};

export default EmptyContainer;
