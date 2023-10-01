import { Link, router } from 'expo-router';
import { StyleSheet } from 'react-native';
import ButtonApp from '../components/atom/ButtonApp';
import { AppPermissionQrcode } from '../components/hoc/AppPermissionQrcode';
import Layout from '../components/view/Layout';

export default function Page() {
  const handleRoute = () => {
    router.replace('/camera-pages/ScanQrcode');
  };

  return (
    <AppPermissionQrcode
      render={() => (
        <Layout title="Home">
          <Link href="/pages/SocketTest">Socket</Link>
          <ButtonApp title="ScanQrCode" onPress={handleRoute} />
        </Layout>
      )}
    />
  );
}

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
