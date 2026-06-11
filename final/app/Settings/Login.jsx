import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../components/FirebaseConfig';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { useLDM } from '../../components/LDM';

const {width, height} = Dimensions.get('window');

export default function Login() {
    const { colors } = useLDM();
    const {next, back} = useLocalSearchParams();

    return (
        <SafeAreaView style={[styles.login_page, {backgroundColor: colors.bgc}]}>
            <Header GoTo={ back }/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView 
                        contentContainerStyle={styles.login_container}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                    >
                        <Shadow distance={20} startColor={'#ffffff55'} offset={[0, 0]} style={{ borderRadius: width * 0.1 }}>
                            <View style={[styles.login_card, {borderColor: colors.outline, backgroundColor: colors.bgc}]}>
                                
                            </View>
                        </Shadow>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    login_page: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
/*         borderWidth: 1,
        borderColor: '#ff0000', */
    },
    login_container: {
        width: width,
        height: height * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ff0000',
    },
    login_card: {
        display: 'flex',
        width: width * 0.8,
        height: height * 0.5,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 30,
        backfaceVisibility: 'hidden',
    },
});