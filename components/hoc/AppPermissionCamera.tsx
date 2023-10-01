import { Camera, CameraCapturedPicture, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import SocketIOClient from 'socket.io-client';
import { BASE64_TEST } from '../../constant/mock/base-img';

type AppCorePermissionProps = {
  jobId: string | string[] | undefined;
  render: (props: {
    isShowCamera: boolean;
    isPreview: boolean;
    captured?: CameraCapturedPicture;
    permissionCamera: PermissionResponse | null;
    cameraRef: Camera | null;
    __startCamera: () => Promise<void>;
    __retakePicture: () => void;
    validatePhoto: () => void;
    closeCamera: () => void;
    takePicture: () => Promise<void>;
    sendPhoto: () => Promise<void>;
  }) => React.ReactNode;
};

export function AppPermissionCamera({ jobId, render }: AppCorePermissionProps) {
  const [permissionCamera, setPermissionCamera] = useState<PermissionResponse | null>(null);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [captured, setCaptured] = useState<CameraCapturedPicture>();
  let cameraRef: Camera | null = null;
  //health-check
  const socket = SocketIOClient('https://dev-api-internal.onesiam.com', {
    path: '/socket-service/event-jobs/socket.io/',
  });

  socket.emit('joinRoom', { channelId: jobId });

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
  console.log('jobId --> ', jobId);
  socket.on('messageHistory', (history) => {
    console.log('Received message history:', history);
  });
  const closeCamera = () => {
    setIsShowCamera(false);
    setIsPreview(false);
    setCaptured(undefined);
  };

  const takePicture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.takePictureAsync();
    console.log(photo);
    setIsPreview(true);
    setCaptured(photo);
  };

  const __startCamera = async () => {
    const info = await Camera.requestCameraPermissionsAsync();
    setPermissionCamera(info);
    setIsShowCamera(true);
  };

  const __retakePicture = () => {
    setIsPreview(false);
    setCaptured(undefined);
    __startCamera();
  };

  //   socket.on('response', (message) => {
  //     console.log(`Received message: ${message}`);
  // if(message === 'OK'){
  // sendPhoto();
  // }else{
  // alert('อัพรูปภาพได้ไม่เกิน 5 รูป')
  // }
  // });

  const sendPhoto = async () => {
    // const str = captured?.uri || '';
    // let base64 = await FileSystem.readAsStringAsync(str, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    console.log('Hello SendPhoto');
    socket.emit('message', { channelId: jobId, message: BASE64_TEST });
  };

  const validatePhoto = () => {
    //socket.emit('validate', { channelId: jobId, message: 'Hello Web!!' });
  };

  return render({
    isShowCamera,
    isPreview,
    captured,
    permissionCamera,
    __startCamera,
    __retakePicture,
    closeCamera,
    takePicture,
    validatePhoto,
    sendPhoto,
    cameraRef,
  });
}
