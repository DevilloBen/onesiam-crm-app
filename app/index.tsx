import { Link, router } from 'expo-router';
import { StyleSheet, View, Image, Text } from 'react-native';
import ButtonQrApp from '../components/atom/ButtonQrApp';
import { AppPermissionQrcode } from '../components/hoc/AppPermissionQrcode';
import Layout from '../components/view/Layout';
import { COLOR_THEME } from '../theme/color';
import { deviceType } from 'expo-device';

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
  text:
    deviceType === 2
      ? {
          fontSize: 50,
          fontWeight: '500',
        }
      : {
          fontSize: 30,
          fontWeight: '500',
        },
  logo_position:
    deviceType === 2
      ? {
          position: 'absolute',
          top: -76,
          left: 220,
          backgroundColor: COLOR_THEME.PRIMARY,
          borderRadius: 100,
          padding: 10,
        }
      : {
          position: 'absolute',
          top: -46,
          left: 125,
          backgroundColor: COLOR_THEME.PRIMARY,
          borderRadius: 100,
          padding: 10,
        },
  logo:
    deviceType === 2
      ? {
          width: 140,
          height: 140,
          borderRadius: 100,
        }
      : {
          width: 80,
          height: 80,
          borderRadius: 100,
        },
  core:
    deviceType === 2
      ? {
          backgroundColor: 'white',
          padding: 140,
          alignItems: 'center',
          borderRadius: 30,
          position: 'relative',
        }
      : {
          backgroundColor: 'white',
          padding: 14,
          paddingTop: 70,
          alignItems: 'center',
          borderRadius: 30,
          position: 'relative',
        },
});
