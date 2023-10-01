import { useLocalSearchParams } from 'expo-router';

import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { AppPermissionCamera } from '../../components/hoc/AppPermissionCamera';
import CameraNormalApp from '../../components/view/CameraNormalApp';
import CameraPreview from '../../components/view/CameraPreview';
import Layout from '../../components/view/Layout';
import { COLOR_THEME } from '../../theme/color';
import { Fragment } from 'react';

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
      }) => (
        <Layout title={`Jobs Code: ${id}`} isLoading={false}>
          {/* {isLoading && (
            <View style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <ActivityIndicator size="large" color={COLOR_THEME.PRIMARY} />
              <Text style={styles.textLoading}>{'Connecting Job Massage ...'}</Text>
            </View>
          )} */}
          {captured && isPreview ? (
            <CameraPreview photo={captured} __retakePicture={__retakePicture} sendPhoto={sendPhoto} />
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

const styles = StyleSheet.create({
  textLoading: {
    paddingTop: 20,
    fontSize: 20,
    color: COLOR_THEME.PRIMARY,
  },
});
