import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Header({ Section }) {
    return (
        <View style={styles.header_container}>
            <Text style={styles.header_text}>
                {Section}
            </Text>
            <View style={styles.header_divider}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header_container: {
        width: "100%",
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#000000', */
    },
    header_text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header_divider: {
        width: 100,
        height: 2,
        marginTop: 3,
        backgroundColor: '#000000',
    }
});
