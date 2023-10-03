import { CameraCapturedPicture } from 'expo-camera';
import { ActivityIndicator, Button, ImageBackground, View, StyleSheet } from 'react-native';
import { COLOR_THEME } from '../../theme/color';
import { Fragment } from 'react';

type CameraPreviewProps = {
  photo?: CameraCapturedPicture;
  __retakePicture: () => void;
  sendPhoto: () => Promise<void>;
  isLoading: boolean;
};

const CameraPreview = ({ photo, __retakePicture, sendPhoto, isLoading }: CameraPreviewProps) => {
  return (
    <View style={styles.previewImg}>
      {isLoading ? (
        <View style={styles.loading_focus}>
          <ActivityIndicator size="large" color={COLOR_THEME.PRIMARY} />
        </View>
      ) : (
        <Fragment>
          <ImageBackground source={{ uri: photo && photo.uri }} style={styles.imgShow} />
          <View style={styles.menuPanel}>
            <Button title="Re Take" color={COLOR_THEME.PRIMARY} onPress={__retakePicture} />
            <Button title="Send Photo >>" color={COLOR_THEME.PRIMARY} onPress={sendPhoto} />
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  previewImg: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imgShow: {
    flex: 5.5,
  },
  loading_focus: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
  },
  menuPanel: {
    padding: 10,
    backgroundColor: 'transparent',
    flex: 0.5,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
