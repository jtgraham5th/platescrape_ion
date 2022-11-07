import { IonContent, IonIcon } from "@ionic/react";
import { useState } from "react";
import { cameraReverse, ellipse, } from "ionicons/icons";
import { useCamera } from "../data/MediaAccess";

const OpenCameraModal: React.FC<{
  dismiss: any;
  setImage: any;
}> = ({ dismiss, setImage }) => {
  const { captureImage, switchCameraFacingMode, stopCamera } =
    useCamera();
  
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { width: innerWidth, height: innerHeight };
  };
  const takePhoto = () => {
    captureImage().then((response) => setImage(response));
    stopCamera();
    dismiss();
  };
  const [windowSize] = useState(getWindowSize());
  return (
    <IonContent>
      <IonIcon
        id="SwitchCameraButton"
        icon={cameraReverse}
        style={{
          fontSize: "40px",
          position: "absolute",
          top: "40px",
          left: "40px",
          transform: "translate(-50%, -50%)",
        }}
        onClick={switchCameraFacingMode}
      />
      <IonIcon
        id="CaptureImageButton"
        icon={ellipse}
        style={{
          width: "75px",
          height: "75px",
          position: "absolute",
          top: windowSize.height * 0.9,
          left: windowSize.width * 0.5,
          zIndex: 99,
          transform: "translate(-50%, -50%)",
        }}
        onClick={takePhoto}
      />
      <div className="VideoAndCanvas" style={{ height: "100%" }}>
        <video
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
        <canvas style={{ opacity: 0 }} />
      </div>
    </IonContent>
  );
};
export default OpenCameraModal;
