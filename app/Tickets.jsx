import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Tickets() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="我的票匣"/>
                <View style={styles.ticket_section}>

                </View>
            <Footer Section="Tickets"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    ticket_section: {
        flex: 1,
    },
});