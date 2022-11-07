import {
  IonRow,
  IonButton,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  useIonModal,
  IonContent,
  IonList,
  useIonPopover,
} from "@ionic/react";
import { cameraOutline, imageOutline, imagesOutline } from "ionicons/icons";
import styles from "./CreateModal.module.scss";

import OpenCameraModal from "./OpenCameraModal";
import { useRef } from "react";

const CreateRecipeImage: React.FC<{
  recipeData?: any;
  image?: any;
  setImage?: any;
}> = ({ recipeData, image, setImage }) => {
  const inputRef = useRef<any>();
  const Popover = () => (
    <IonContent>
      <IonList>
        <IonItem
          button={true}
          detail={false}
          type="button"
          onClick={selectPhoto}
        >
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          <IonIcon icon={imagesOutline} /> Select Photo
        </IonItem>
        <IonItem
          button={true}
          detail={false}
          type="button"
          onClick={takePicture}
        >
          <IonIcon icon={cameraOutline} />
          Take Photo
        </IonItem>
      </IonList>
    </IonContent>
  );

  const [presentPopover, dismissPopover] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismissPopover(data, role),
  });

  const [presentModal, dismissModal] = useIonModal(OpenCameraModal, {
    dismiss: () => dismissModal(),
    setImage,
  });
  const modalOptions = {
    onDidDismiss: () => dismissModal(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  const selectPhoto = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };
  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log("fileObj is", fileObj);
    // 👇️ reset file input
    event.target.value = null;
    // 👇️ is now empty
    console.log(event.target.files);
    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  const takePicture = async () => {
    presentModal(modalOptions);
  };

  return (
    <IonRow>
      <IonItem>
        <IonCol size="6">
          <IonLabel>Recipe Image</IonLabel>
          <IonCard className={styles.uploadImgCard}>
            <IonCardContent className={styles.uploadImgContainer}>
              {image ? (
                <img alt="recipe" id="preview" src={image ? image : ""} />
              ) : (
                <IonIcon icon={imageOutline} className={styles.uploadImgIcon} />
              )}
            </IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol size="6" className={styles.uploadImgDirections}>
          <div>Set a default photo for this recipe</div>
          <IonButton
            onClick={(e: any) =>
              presentPopover({
                event: e,
              })
            }
          >
            Select Photo
          </IonButton>
        </IonCol>
      </IonItem>
    </IonRow>
  );
};
export default CreateRecipeImage;
