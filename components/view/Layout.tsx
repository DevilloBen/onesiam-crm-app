import { router } from 'expo-router';
import { Fragment, PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { COLOR_THEME, TEXT_THEME } from '../../theme/color';

type LayoutTypeProps = PropsWithChildren<{
  title?: string;
  isLoading?: boolean;
}>;

const Layout = ({ children, title, isLoading = false }: LayoutTypeProps) => {
  const handleRouteBack = () => {
    router.replace('/');
  };

  if (isLoading)
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={COLOR_THEME.PRIMARY} />
        <Text style={styles.textLoading}>{'Connecting Job Massage ...'}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {title ? (
        <View style={styles.topbar}>
          {title ? (
            <View style={styles.panelR}>
              <Pressable style={styles.button} onPress={handleRouteBack}>
                <Text style={styles.text}>{'<'}</Text>
              </Pressable>
            </View>
          ) : null}
          <Image source={require('../../assets/onesiam.png')} style={styles.logo} />
          {title ? (
            <View style={styles.panelL}>
              <Text style={styles.title}>{title}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topbar: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR_THEME.PRIMARY,
    position: 'relative',
  },
  content: {
    flex: 5.5,
    alignItems: 'center',
    backgroundColor: '#bbe0fc',
    //backgroundColor: COLOR_THEME.SECENDARY,
  },
  title: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: TEXT_THEME.WHITE,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR_THEME.PRIMARY,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR_THEME.SECENDARY,
  },
  textLoading: {
    paddingTop: 20,
    fontSize: 20,
    color: COLOR_THEME.PRIMARY,
  },
  logo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    transform: [
      { translateX: -30 }, // Adjust according to the logo width (width/2)
      { translateY: -30 }, // Adjust according to the logo height (height/2)
    ],
  },
  panelL: {
    display: 'flex',
    justifyContent: 'center',
  },
  panelR: {
    display: 'flex',
    justifyContent: 'center',
    maxHeight: 200,
    backgroundColor: COLOR_THEME.PRIMARY,
  },
});
