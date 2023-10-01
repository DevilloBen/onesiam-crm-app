import { useLocalSearchParams } from 'expo-router';

import { Button, StyleSheet, Text } from 'react-native';
import { AppPermissionCamera } from '../../components/hoc/AppPermissionCamera';
import CameraNormalApp from '../../components/view/CameraNormalApp';
import Layout from '../../components/view/Layout';
import { COLOR_THEME } from '../../theme/color';
import CameraPreview from '../../components/view/CameraPreview';

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
        __startCamera,
        __retakePicture,
        takePicture,
        validatePhoto,
        sendPhoto,
        cameraRef,
      }) => (
        <Layout title="Jobs">
          <Text style={styles.title}>Jobs Code: {id}</Text>
          {/* {captured && isPreview ? (
            <CameraPreview photo={captured} __retakePicture={__retakePicture} validatePhoto={validatePhoto} />
          ) : isShowCamera ? (
            <CameraNormalApp permission={permissionCamera} __takePicture={takePicture} cameraRef={cameraRef} />
          ) : (
            <Button title="Take Photo" color={COLOR_THEME.PRIMARY} onPress={__startCamera} />
          )} */}
          <CameraPreview
            sendPhoto={sendPhoto}
            photo={captured}
            __retakePicture={__retakePicture}
            validatePhoto={validatePhoto}
          />
        </Layout>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
