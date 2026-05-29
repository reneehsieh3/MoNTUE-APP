import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch } from 'react-native';
import React, { useState, useEffect} from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { LanguageData } from '../../components/LanguageData';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Userinfo() {
    const { colors } = useLDM();
    return (
        <SafeAreaView style={[styles.info_container, {backgroundColor: colors.bgc}]}>
            <Header GoTo="/Settings"/>
            <View style={[styles.info_card, {borderColor: colors.outline}]}>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    info_container: {
        flex: 1,
    },
    info_card: {
        width: width * 0.8,
        height: height * 0.6,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.05 + 10,
        borderWidth: 1,
        borderRadius: 30,
    },
});