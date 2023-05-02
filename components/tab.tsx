import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';



interface TabProps {
    text: string,
    onPress: () => void,
    icon?: any,
}

const Tab = ({ text, onPress, icon }: TabProps) => {

    return (
        <TouchableOpacity style={{ ...styles.button }} onPress={() => onPress()} >
            <Image style={styles.icon} source={icon} />
            <Text style={{ ...styles.text }} >{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    icon: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        tintColor: '#f9f4f5',
    },

    button: {
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        aspectRatio: '1 / 1.5',
        marginLeft: '10%',
        marginVertical: '2%',
        borderRadius: 15,
        backgroundColor: '#5bc3eb',
    },
    text: {
        fontSize: 17,
        letterSpacing: 0.25,
        fontFamily: 'ChivoMono-Regular',
        color: '#f9f4f5',
    },
});

export default Tab