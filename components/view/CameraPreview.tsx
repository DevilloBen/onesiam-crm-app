import { CameraCapturedPicture } from 'expo-camera';
import { Button, ImageBackground, View } from 'react-native';
import { Image } from 'expo-image';
import { COLOR_THEME } from '../../theme/color';
import { BASE64_TEST } from '../../constant/mock/base-img';

type CameraPreviewProps = {
  photo?: CameraCapturedPicture;
  __retakePicture: () => void;
  sendPhoto: () => Promise<void>;
};

const CameraPreview = ({ photo, __retakePicture, sendPhoto }: CameraPreviewProps) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 5.5,
        }}
      />
      <View
        style={{
          padding: 10,
          backgroundColor: 'transparent',
          flex: 0.5,
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button title="Re Take" color={COLOR_THEME.PRIMARY} onPress={__retakePicture} />
        <Button title="Send Photo >>" color={COLOR_THEME.PRIMARY} onPress={sendPhoto} />
      </View>
    </View>
  );
};

export default CameraPreview;
