import { Camera, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';

type AppCorePermissionProps = {
  render: (props: { permission: PermissionResponse | null }) => React.ReactNode;
};

export function AppPermissionQrcode({ render }: AppCorePermissionProps) {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  return render({ permission });
}
