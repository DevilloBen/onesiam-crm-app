import { Link, router } from 'expo-router';
import { StyleSheet, View, Image, Text } from 'react-native';
import ButtonQrApp from '../components/atom/ButtonQrApp';
import { AppPermissionQrcode } from '../components/hoc/AppPermissionQrcode';
import Layout from '../components/view/Layout';
import { COLOR_THEME } from '../theme/color';

export default function Page() {
  const handleRoute = () => {
    router.replace('/camera-pages/ScanQrcode');
  };

  return (
    <AppPermissionQrcode
      render={() => (
        <Layout>
          <View style={styles.container}>
            <View style={styles.core}>
              <View style={styles.logo_position}>
                <Image source={require('../assets/onesiam.png')} style={styles.logo} />
              </View>
              <Text style={styles.text}>Scan QrCode</Text>
              <ButtonQrApp title="ScanQrCode" onPress={handleRoute} />
            </View>
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
  },
  text: {
    fontSize: 50,
    fontWeight: '500',
  },
  logo_position: {
    position: 'absolute',
    top: -76,
    left: 220,
    backgroundColor: COLOR_THEME.PRIMARY,
    borderRadius: 100,
    padding: 10,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  core: {
    backgroundColor: 'white',
    padding: 140,
    alignItems: 'center',
    borderRadius: 30,
    position: 'relative',
  },
});
