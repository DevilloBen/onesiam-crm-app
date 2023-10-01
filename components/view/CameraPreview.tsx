import { CameraCapturedPicture } from 'expo-camera';
import { Button, ImageBackground, View } from 'react-native';
import { Image } from 'expo-image';
import { COLOR_THEME } from '../../theme/color';
import { BASE64_TEST } from '../../constant/mock/base-img';

type CameraPreviewProps = {
  photo?: CameraCapturedPicture;
  __retakePicture: () => void;
  validatePhoto: () => void;
  sendPhoto: () => Promise<void>;
};

const CameraPreview = ({ photo, __retakePicture, validatePhoto, sendPhoto }: CameraPreviewProps) => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {/* <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      /> */}
      <Image
        style={{
          flex: 5.5,
          width: '100%',
          backgroundColor: '#0553',
        }}
        source={BASE64_TEST}
        // placeholder={blurhash}
        contentFit="cover"
        transition={1000}
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
        <Button title="Re Take" color={COLOR_THEME.PRIMARY} onPress={() => {}} />
        <Button title="Save" color={COLOR_THEME.PRIMARY} onPress={sendPhoto} />
      </View>
    </View>
  );
};

export default CameraPreview;
