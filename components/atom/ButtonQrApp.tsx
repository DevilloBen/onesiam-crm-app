import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent, Image } from 'react-native';
import { COLOR_THEME } from '../../theme/color';

type ButtonAppProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  title?: string;
};

const ButtonQrApp = ({ onPress, title }: ButtonAppProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image source={require('../../assets/qr_code_scan.png')} style={styles.logo} resizeMode="cover" />
    </Pressable>
  );
};
export default ButtonQrApp;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: 320,
    height: 320,
    overflow: 'hidden',
    borderRadius: 16,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 1.16,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
});
