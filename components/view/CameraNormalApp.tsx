import { Camera, PermissionResponse } from 'expo-camera';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type CameraNormalAppProps = {
  permission: PermissionResponse | null;
  cameraRef: Camera | null;
  __takePicture: () => Promise<void>;
};

const CameraNormalApp = ({ permission, cameraRef, __takePicture }: CameraNormalAppProps) => {
  if (permission?.status === 'granted') {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          ref={(r) => {
            cameraRef = r;
          }}
        ></Camera>
        <View
          style={{
            paddingTop: 20,
            alignSelf: 'center',
            flex: 0.5,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={__takePicture}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: '#000',
            }}
          />
        </View>
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
    flex: 5.5,
    width: '100%',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
  },
});
