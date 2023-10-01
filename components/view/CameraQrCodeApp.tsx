import { BarCodeScanner } from 'expo-barcode-scanner';
import { PermissionResponse } from 'expo-camera';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScannedType } from '../../constant/type/event-utils';
import FocusBar from '../atom/FocusBar';

type CameraAppProps = {
  isFocus: boolean;
  permission: PermissionResponse | null;
  handleBarCodeScanned: ({ type, data }: BarCodeScannedType) => void;
};
const CameraQrCodeApp = ({ isFocus, permission, handleBarCodeScanned }: CameraAppProps) => {
  if (permission?.status === 'granted') {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner onBarCodeScanned={isFocus ? handleBarCodeScanned : undefined} style={styles.camera}>
          <FocusBar />
        </BarCodeScanner>
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

export default CameraQrCodeApp;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    flex: 5,
    aspectRatio: 1,
  },
});
