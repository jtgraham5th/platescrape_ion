import { useEffect, useRef, useState } from "react";

type CameraFacingMode = "environment" | "user";

export const useCamera = () => {
  const [videoDem, handleVideoDem] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const [cameraFacingMode, handleCameraFacingMode] =
    useState<CameraFacingMode>("environment");
  const [imageData, handleImageData] = useState("");
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const streamRef = useRef<MediaStream>();

  useEffect(() => {
    try {
      //find video and canvas elements by tagNames
      videoRef.current = document.getElementsByTagName("video")[0];
      canvasRef.current = document.getElementsByTagName("canvas")[0];
      let constraint = {
        video: {
          width: { ideal: 4096 },
          height: { ideal: 2160 },
          facingMode: cameraFacingMode,
        },
        audio: false,
      };
      navigator.mediaDevices
        .getUserMedia(constraint)
        .then((stream) => {
          if (videoRef.current !== undefined && canvasRef.current !== undefined) {
            videoRef.current?.setAttribute("playsinline", "true");
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              //get position of video tag;
              if (
                videoRef.current !== undefined &&
                canvasRef.current !== undefined
              ) {
                let { clientLeft, clientTop, videoWidth, videoHeight } =
                  videoRef.current;
                handleVideoDem({ w: videoWidth, h: videoHeight });
                //align canvas position with video position
                canvasRef.current.style.position = "absolute";
                canvasRef.current.style.left = clientLeft.toString();
                canvasRef.current.style.top = clientTop.toString();
                canvasRef.current.setAttribute("width", videoWidth.toString());
                canvasRef.current.setAttribute(
                  "height",
                  videoHeight.toString()
                );
                videoRef.current.play();
              }
            };
          }
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
    } catch (e) {
      alert("error1: " + e);
      console.log(e);
    }
    // eslint-disable-next-line
  }, [cameraFacingMode]);

  const switchCameraFacingMode = () => {
    handleCameraFacingMode((old) =>
      old === "environment" ? "user" : "environment"
    );
  };
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    console.log(streamRef.current);
  };

  const captureImage = async (): Promise<string> => {
    //take photo
    try {
      let video: HTMLVideoElement = document.getElementsByTagName("video")[0];
      let canvas: HTMLCanvasElement =
        document.getElementsByTagName("canvas")[0];
      let context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, videoDem.w, videoDem.h);
      let imageData1 = canvas.toDataURL("image/png", 1.0);
      //console.log('imageData', imageData);
      handleImageData(imageData1);
      return imageData1;
    } catch (e) {
      console.log(e);
      alert("Error in Capturing Image: " + e);
      return "";
    }
  };

  return {
    cameraFacingMode,
    switchCameraFacingMode,
    imageData,
    captureImage,
    stopCamera,
  };
};
