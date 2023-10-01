import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Camera, CameraCapturedPicture, PermissionResponse } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Socket, io } from 'socket.io-client';

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
    closeCamera: () => void;
    takePicture: () => Promise<void>;
    sendPhoto: () => Promise<void>;
    setCamera: React.Dispatch<React.SetStateAction<Camera | null>>;
    isLoading: boolean;
  }) => React.ReactNode;
};

export function AppPermissionCamera({ jobId, render }: AppCorePermissionProps) {
  const [permissionCamera, setPermissionCamera] = useState<PermissionResponse | null>(null);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [captured, setCaptured] = useState<CameraCapturedPicture>();
  const [cameraRef, setCamera] = useState<Camera | null>(null);
  // let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    __startCamera();

    socket.current = io('https://dev-api-internal.onesiam.com', {
      path: '/socket-service/event-jobs',
      timeout: 10000,
    });

    socket.current.on('connect_error', (error) => {
      socket.current?.disconnect();
      //Alert.alert(`connect_error`, `${error}`, [{ text: 'OK', onPress: handleRoute }]);
    });

    socket.current.emit('joinRoom', { channelId: jobId }); //W & A

    socket.current.on('message', (message) => {
      console.log(`Received message: ${message}`);
    }); //W & A

    socket.current.on('webResponse', (response) => {
      //W send to App
      console.log('Received web response:', response);
      if (response.status === 'OK') {
        __retakePicture();
      } else {
        Alert.alert(`อัพโหลดรูปไม่สำเร็จ`, `อัพโหลดได้ไม่เกิน 5 รูป`, [{ text: 'OK', onPress: __retakePicture }]);
      }
    });

    return () => {
      setCamera(null);
      setCaptured(undefined);
      setIsPreview(false);
      setIsShowCamera(false);
      setPermissionCamera(null);
      socket.current?.disconnect();
      setIsLoading(true);
    };
  }, []);

  const closeCamera = () => {
    setIsShowCamera(false);
    setIsPreview(false);
    setCaptured(undefined);
  };

  const takePicture = async () => {
    if (!cameraRef) return;
    setIsLoading(true);

    console.log(cameraRef);
    const options = { quality: 0.5, base64: true };

    const photo = await cameraRef.takePictureAsync(options);

    // const response = await fetch(photo.uri);
    // console.log('Hello test');

    // const blob = await response.blob();
    // if (blob.size > 10 * 1024 * 1024) {
    //   await FileSystem.deleteAsync(photo.uri, { idempotent: true });
    //   Alert.alert(`รูปภาพมีปัญหา`, `มีขนาดเกิน 10 MB`, [{ text: 'OK', onPress: __retakePicture }]);
    // } else {
    //   console.log('Hello test else');
    //   setIsPreview(true);
    //   setCaptured(photo);
    //   setIsLoading(false);
    // }

    setIsPreview(true);
    setCaptured(photo);
    setIsLoading(false);
  };

  const __startCamera = async () => {
    const info = await Camera.requestCameraPermissionsAsync();
    setPermissionCamera(info);
    setIsShowCamera(true);
    setIsLoading(false);
  };

  const __retakePicture = () => {
    setIsPreview(false);
    setCaptured(undefined);
    __startCamera();
  };

  const sendPhoto = async () => {
    setIsLoading(true);
    const str = captured?.base64;

    if (str) {
      const dataURL = `data:image/jpeg;base64,${str}`;

      socket.current?.emit('appSendMessage', { channelId: jobId, message: dataURL }); //App send to W
    } else {
      if (captured) {
        await FileSystem.deleteAsync(captured.uri, { idempotent: true });
      }
      Alert.alert(`รูปภาพมีปัญหา`, `ลองถ่ายใหม่อีกครั้งค่ะ`, [{ text: 'OK', onPress: __retakePicture }]);
    }
  };

  const handleRoute = () => {
    router.replace('/');
  };

  return render({
    isShowCamera,
    isPreview,
    captured,
    permissionCamera,
    setCamera,
    __startCamera,
    __retakePicture,
    closeCamera,
    takePicture,
    sendPhoto,
    cameraRef,
    isLoading,
  });
}
