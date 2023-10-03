import { useLocalSearchParams } from 'expo-router';

import { Button } from 'react-native';
import { AppPermissionCamera } from '../../components/hoc/AppPermissionCamera';
import CameraNormalApp from '../../components/view/CameraNormalApp';
import CameraPreview from '../../components/view/CameraPreview';
import Layout from '../../components/view/Layout';
import { COLOR_THEME } from '../../theme/color';

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <AppPermissionCamera
      jobId={id}
      render={({
        isShowCamera,
        isPreview,
        captured,
        permissionCamera,
        isLoading,
        __startCamera,
        __retakePicture,
        takePicture,
        sendPhoto,
        setCamera,
        status,
      }) => (
        <Layout title={status} isLoading={false}>
          {captured && isPreview ? (
            <CameraPreview
              isLoading={isLoading}
              photo={captured}
              __retakePicture={__retakePicture}
              sendPhoto={sendPhoto}
            />
          ) : isShowCamera ? (
            <CameraNormalApp
              isLoading={isLoading}
              permission={permissionCamera}
              __takePicture={takePicture}
              setCamera={setCamera}
            />
          ) : (
            <Button title="Take Photo" color={COLOR_THEME.PRIMARY} onPress={__startCamera} />
          )}
        </Layout>
      )}
    />
  );
}
