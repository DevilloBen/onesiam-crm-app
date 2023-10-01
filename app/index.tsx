import { Link, router } from 'expo-router';
import { StyleSheet, View, Image, Text } from 'react-native';
import ButtonQrApp from '../components/atom/ButtonQrApp';
import { AppPermissionQrcode } from '../components/hoc/AppPermissionQrcode';
import Layout from '../components/view/Layout';

export default function Page() {
  const handleRoute = () => {
    router.replace('/camera-pages/ScanQrcode');
  };

  return (
    <AppPermissionQrcode
      render={() => (
        <Layout>
          <View style={styles.container}>
            <Text style={styles.text}>Scan QrCode</Text>
            <ButtonQrApp title="ScanQrCode" onPress={handleRoute} />
          </View>
        </Layout>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 50,
    padding: 20,
  },
});
