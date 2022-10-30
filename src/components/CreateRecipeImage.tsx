import {
  IonRow,
  IonButton,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import styles from "./CreateModal.module.scss";

import { Camera, CameraResultType } from "@capacitor/camera";

const CreateRecipeImage: React.FC<{
  recipeData?: any;
  image?: any;
  setImage?: any;
}> = ({ recipeData, image, setImage }) => {

  const takePicture = async () => {
    let permissions = await Camera.checkPermissions();
    if (permissions.camera === "granted" && permissions.photos === "granted") {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      setImage(image.webPath);
    } else {
      await Camera.requestPermissions();
      takePicture();
    }
  };

  return (
    <IonRow>
      <IonItem>
        <IonCol size="6">
          <IonLabel>Recipe Image</IonLabel>
          <IonCard className={styles.uploadImgCard}>
            <IonCardContent className={styles.uploadImgContainer}>
              {image ? (
                <img alt="recipe" src={image ? image : ""} />
              ) : (
                <IonIcon icon={imageOutline} className={styles.uploadImgIcon} />
              )}
            </IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol size="6" className={styles.uploadImgDirections}>
          <div>Set a default photo for this recipe</div>
          <IonButton onClick={takePicture}>Select Photo</IonButton>
        </IonCol>
      </IonItem>
    </IonRow>
  );
};
export default CreateRecipeImage;
