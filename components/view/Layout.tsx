import { router } from 'expo-router';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR_THEME, TEXT_THEME } from '../../theme/color';

type LayoutTypeProps = PropsWithChildren<{
  title: string;
}>;

const Layout = ({ children, title }: LayoutTypeProps) => {
  const handleRouteBack = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        {title === 'Home' ? null : (
          <Pressable style={styles.button} onPress={handleRouteBack}>
            <Text style={styles.text}>{'<'}</Text>
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
      {/* <View style={styles.footer}>
            </View> */}
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topbar: {
    flex: 0.5,
    backgroundColor: COLOR_THEME.PRIMARY,
  },
  content: {
    flex: 5.5,
    alignItems: 'center',
    backgroundColor: COLOR_THEME.SECENDARY,
    padding: 20,
  },
  footer: {
    flex: 0.5,
    backgroundColor: 'pink',
  },
  title: {
    color: TEXT_THEME.WHITE,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: COLOR_THEME.PRIMARY,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
