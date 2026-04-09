import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Guide() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="語音導覽"/>
                <View style={styles.guide_container}>

                </View>
            <Footer Section="Guide"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    guide_container: {
        flex: 1,
    },
});