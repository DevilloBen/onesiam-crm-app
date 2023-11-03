import React from 'react';
import { GestureResponderEvent, Image, Pressable, StyleSheet } from 'react-native';

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
    opacity: 0.85,
  },
  logo: {
    width: '90%',
    height: '90%',
  },
});
