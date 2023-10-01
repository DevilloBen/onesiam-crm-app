import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';
import { COLOR_THEME } from '../../theme/color';

type ButtonAppProps = {
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    title?: string;
}

const ButtonApp = ({ onPress, title }: ButtonAppProps) => {
    return <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
}
export default ButtonApp

const styles = StyleSheet.create({
    button: {
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: COLOR_THEME.PRIMARY,
    },
    text: {
        fontSize: 90,
        // lineHeight: 21,
        // fontWeight: 'bold',
        // letterSpacing: 0.25,
        color: 'white',
    },
});