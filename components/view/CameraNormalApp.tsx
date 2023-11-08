import { Camera, PermissionResponse } from 'expo-camera';
import { deviceType } from 'expo-device';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_THEME } from '../../theme/color';

type CameraNormalAppProps = {
  isLoading: boolean;
  permission: PermissionResponse | null;
  __takePicture: () => Promise<void>;
  setCamera: React.Dispatch<React.SetStateAction<Camera | null>>;
};

const CameraNormalApp = ({ isLoading, permission, __takePicture, setCamera }: CameraNormalAppProps) => {
  if (permission?.status === 'granted') {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={setCamera} />

        {isLoading ? (
          <View style={styles.loading_focus}>
            <ActivityIndicator size="large" color={COLOR_THEME.PRIMARY} />
          </View>
        ) : (
          <View style={styles.btn_focus}>
            <TouchableOpacity onPress={__takePicture} style={styles.btn_title} />
          </View>
        )}
      </View>
    );
  }

  if (permission?.status === 'denied') {
    return (
      <View style={styles.camera}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.camera}>
      <Text>Camera Loading...</Text>
    </View>
  );
};

export default CameraNormalApp;

const styles = StyleSheet.create({
  camera: {
    flex: 6,
    width: '100%',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    flex: 1,
    position: 'relative',
  },
  btn_focus: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: deviceType === 2 ? '60%' : '50%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_title: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'lightblue',
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
  textLoading: {
    paddingTop: 20,
    fontSize: 20,
    color: COLOR_THEME.SECENDARY,
  },
});
