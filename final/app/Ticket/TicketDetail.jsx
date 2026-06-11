import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Animated, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { useLDM } from '../../components/LDM';
import { UserData } from '../../components/UserData';
import { ExhibitData } from '../../components/ExhibitData';
import QRCode from 'react-native-qrcode-svg';

export default function TicketDetail() {
    const { colors } = useLDM();
    
    return(
        <SafeAreaView style={[styles.detail_container, { backgroundColor: colors.bgc }]}>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detail_container: {
        flex: 1,
        alignItems: 'center',
    },
})