import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { COLOR_THEME } from '../../theme/color';

export default function FocusBar() {
  return (
    <View style={styles.focusFrame}>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topLeftTwo]} />

      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.topRightTwo]} />

      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomLeftTwo]} />

      <View style={[styles.corner, styles.bottomRight]} />
      <View style={[styles.corner, styles.bottomRightTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusFrame: {
    width: 200,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  corner: {
    width: 30,
    height: 3,
    backgroundColor: COLOR_THEME.SECENDARY,
    position: 'absolute',
  },
  topLeft: {
    top: 20,
    left: -20,
    transform: [{ rotate: '90deg' }],
  },
  topLeftTwo: {
    top: 0,
    left: 0,
    transform: [{ rotate: '180deg' }],
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{ rotate: '180deg' }],
  },
  topRightTwo: {
    top: 20,
    right: -20,
    transform: [{ rotate: '90deg' }],
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomLeftTwo: {
    bottom: 20,
    left: -20,
    transform: [{ rotate: '90deg' }],
  },
  bottomRight: {
    bottom: 20,
    right: -20,
    transform: [{ rotate: '-90deg' }],
  },
  bottomRightTwo: {
    bottom: 0,
    right: 0,
    transform: [{ rotate: '-180deg' }],
  },
});
