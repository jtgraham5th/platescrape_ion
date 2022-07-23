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
  useIonPicker,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";

const CreateItemModal: React.FC<{
  dismiss: any;
  listName: string;
  addToList: any;
  addCategory: any;
}> = ({ dismiss, listName, addToList, addCategory }) => {
  const [present] = useIonPicker();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [presentToast] = useIonToast();

  const openPicker = async () => {
    present({
      columns: [
        {
          name: "units",
          options: [
            { text: "oz", value: "oz" },
            { text: "fl oz", value: "fl oz" },
            { text: "g", value: "g" },
            { text: "lbs", value: "lbs" },
            { text: "kg", value: "kg" },
            { text: "cup", value: "cup" },
            { text: "liter", value: "liter" },
            { text: "gallon", value: "gallon" },
          ],
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: (value) => {
            setUnit(value.units.value);
            console.log(name, quantity);
          },
        },
      ],
    });
  };
  const handleSubmit = () => {
    const newItem = {
      name: name,
      quantity: quantity,
      unit: unit,
      category: "Miscellaneous"
    };
    console.log(newItem);
    addToList(newItem);
    addCategory("Miscellaneous")
    dismiss();
    presentToast(
      `${
        name
      } has been added to your ${listName}`,
      3000
    );

  };
  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Create Item</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRow className="search-container animate__animated animate__fadeIn">
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Item Name</IonLabel>
              <IonInput
                value={name}
                onInput={(e: any) => setName(e.target.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow className="search-container animate__animated animate__fadeIn">
          <IonCol size="6">
            <IonItem>
              <IonLabel position="stacked">Quantity</IonLabel>
              <IonInput
                value={quantity}
                inputMode="numeric"
                onInput={(e: any) => setQuantity(e.target.value)}
              />
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel position="stacked">Unit</IonLabel>
              <IonInput value={unit} onClick={openPicker} />
            </IonItem>
          </IonCol>
        </IonRow>
        </IonContent>

        <IonButton
          expand="full"
          disabled={name ? false : true}
          onClick={handleSubmit}
        >
          Add to {listName}
        </IonButton>
    </>
  );
};
export default CreateItemModal;
