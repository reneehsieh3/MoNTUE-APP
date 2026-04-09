import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function News() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="最新消息"/>
                <ScrollView style={styles.news_container}>
                </ScrollView>            
            <Footer Section="Home"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    news_container: {
        flex: 1,
    },
});