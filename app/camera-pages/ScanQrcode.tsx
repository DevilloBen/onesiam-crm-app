import { router } from 'expo-router';
import { AppPermissionQrcode } from '../../components/hoc/AppPermissionQrcode';
import CameraQrCodeApp from '../../components/view/CameraQrCodeApp';
import Layout from '../../components/view/Layout';
import { BarCodeScannedType } from '../../constant/type/event-utils';
import { useState } from 'react';
import { Alert, Button } from 'react-native';

const ScanQrCode = () => {
  const [isFocus, setIsFocus] = useState<boolean>(true);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedType) => {
    setIsFocus(false);
    if (data.indexOf('crm-portal-job') > -1) {
      const startIndex = data.indexOf('code=') + 5;
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
        <Layout title="Scanning ...">
          {/* <Button color={'black'} title="Test Jobs" onPress={() => router.replace(`/jobs/313123`)} /> */}
          <CameraQrCodeApp permission={permission} handleBarCodeScanned={handleBarCodeScanned} isFocus={isFocus} />
        </Layout>
      )}
    />
  );
};

export default ScanQrCode;
