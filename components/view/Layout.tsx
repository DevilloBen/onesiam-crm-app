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
      <View style={styles.topbar}>
        {title ? (
          <Pressable style={styles.button} onPress={handleRouteBack}>
            <Text style={styles.text}>{'<'}</Text>
          </Pressable>
        ) : null}
        <Image source={require('../../assets/onesiam.png')} style={styles.logo} />
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_THEME.PRIMARY,
    position: 'relative',
  },
  content: {
    flex: 5.5,
    alignItems: 'center',
    backgroundColor: COLOR_THEME.SECENDARY,
  },
  title: {
    paddingHorizontal: 10,
    color: TEXT_THEME.WHITE,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    elevation: 3,
    backgroundColor: COLOR_THEME.PRIMARY,
  },
  text: {
    fontSize: 26,
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
});
