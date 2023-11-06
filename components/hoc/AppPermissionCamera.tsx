import { Camera, CameraCapturedPicture, PermissionResponse } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import socketIOClient from 'socket.io-client';

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
    status: string;
  }) => React.ReactNode;
};
//https://dev-api-internal.onesiam.com/socket-service/event-jobs dev
const socket = socketIOClient('https://spw-api-internal.onesiam.com/socket-service/event-jobs', {
  path: '/socket-service/event-jobs',
  transports: ['websocket', 'polling'],
});

export function AppPermissionCamera({ jobId, render }: AppCorePermissionProps) {
  const [permissionCamera, setPermissionCamera] = useState<PermissionResponse | null>(null);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [captured, setCaptured] = useState<CameraCapturedPicture>();
  const [cameraRef, setCamera] = useState<Camera | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    __startCamera();

    return () => {
      setCamera(null);
      setCaptured(undefined);
      setIsPreview(false);
      setIsShowCamera(false);
      setPermissionCamera(null);
      setIsLoading(true);
      setStatus('Connecting...');
    };
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', { channelId: jobId });
    socket.emit('message', { channelId: jobId, message: 'Hello, From App' });

    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      setStatus('Connected');
    });

    socket.on('webResponse', (response) => {
      if (response.status === 'OK') {
        __retakePicture();
      } else {
        console.log('Not ok');
        Alert.alert(`อัพโหลดรูปไม่สำเร็จ`, `อัพโหลดได้ไม่เกิน 5 รูป`, [{ text: 'OK', onPress: __retakePicture }]);
      }
    });

    socket.on('connect', () => {
      socket.emit('joinRoom', { channelId: jobId });
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const closeCamera = () => {
    setIsShowCamera(false);
    setIsPreview(false);
    setCaptured(undefined);
  };

  const takePicture = async () => {
    if (!cameraRef) return;
    setIsLoading(true);

    const options = { quality: 0.5, base64: true };

    const photo = await cameraRef.takePictureAsync(options);

    const response = await fetch(photo.uri);

    const blob = await response.blob();
    if (blob.size > 10 * 1024 * 1024) {
      await FileSystem.deleteAsync(photo.uri, { idempotent: true });
      Alert.alert(`รูปภาพมีปัญหา`, `มีขนาดเกิน 10 MB`, [{ text: 'OK', onPress: __retakePicture }]);
    } else {
      setIsPreview(true);
      setCaptured(photo);
      setIsLoading(false);
    }
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
      socket.emit('appSendMessage', { channelId: jobId, message: dataURL }); //App send to W
    } else {
      if (captured) {
        await FileSystem.deleteAsync(captured.uri, { idempotent: true });
      }
      Alert.alert(`รูปภาพมีปัญหา`, `ลองถ่ายใหม่อีกครั้งค่ะ`, [{ text: 'OK', onPress: __retakePicture }]);
    }
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
    status,
  });
}
