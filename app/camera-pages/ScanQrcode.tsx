import { Link, router } from 'expo-router';
import { AppPermissionQrcode } from '../../components/hoc/AppPermissionQrcode';
import CamaraQrCodeApp from '../../components/view/CamaraQrCodeApp';
import Layout from '../../components/view/Layout';
import { BarCodeScannedType } from '../../constant/type/event-utils';

import { StyleSheet } from 'react-native';
const ScanQrCode = () => {
  const handleBarCodeScanned = ({ type, data }: BarCodeScannedType) => {
    if (data.indexOf('crm-portal-job') > -1) {
      const startIndex = data.indexOf('code=') + 5; // 5 is length of 'code='
      const jobCode = data.substring(startIndex);
      router.replace(`/jobs/${jobCode}`);
    } else {
      alert(`Qr Code ไม่ถูกต้องหรือลองแสกนใหม่อีกครั้ง`);
    }
  };

  return (
    <AppPermissionQrcode
      render={({ permission }) => (
        <Layout title="ScanQrCode">
          <Link href="/jobs/313123">Test View Jobs</Link>
          <CamaraQrCodeApp permission={permission} handleBarCodeScanned={handleBarCodeScanned} />
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
