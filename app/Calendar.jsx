import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Calendar() {
    return (
        <SafeAreaView style={styles.container}>
            <Header Section="展覽資訊"/>
                <View style={styles.calendar_container}>
                    <View style={styles.upcomming_container}>
                        <Text style={{ fontSize: 15, fontWeight: 'semibold' }}>預告展覽</Text>
                        
                    </View>
                </View>
            <Footer Section="Calendar"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    calendar_container: {
        flex: 1,
    },
});