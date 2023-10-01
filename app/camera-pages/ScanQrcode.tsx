import { Link, router } from 'expo-router';
import { AppPermissionQrcode } from '../../components/hoc/AppPermissionQrcode';
import CameraQrCodeApp from '../../components/view/CameraQrCodeApp';
import Layout from '../../components/view/Layout';
import { BarCodeScannedType } from '../../constant/type/event-utils';

import { Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
const ScanQrCode = () => {
  const [isFocus, setIsFocus] = useState<boolean>(true);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedType) => {
    setIsFocus(false);
    if (data.indexOf('crm-portal-job') > -1) {
      const startIndex = data.indexOf('code=') + 5; // 5 is length of 'code='
      const jobCode = data.substring(startIndex);
      router.replace(`/jobs/${jobCode}`);
    } else {
      Alert.alert(`Qr Code ไม่ถูกต้อง`, `${data.substring(0, 10).padEnd(13, '.')} ลองสแกนอีกครั้งค่ะ`, [
        { text: 'OK', onPress: () => setIsFocus(true) },
      ]);
    }
  };

  return (
    <AppPermissionQrcode
      render={({ permission }) => (
        <Layout title="ScanQrCode">
          <CameraQrCodeApp permission={permission} handleBarCodeScanned={handleBarCodeScanned} isFocus={isFocus} />
        </Layout>
      )}
    />
  );
};

export default ScanQrCode;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    //overflow: 'hidden',
    // borderRadius: 10,
    // marginBottom: 40,
  },
});
