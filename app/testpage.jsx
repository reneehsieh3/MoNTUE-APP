import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function test() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

  // Wait for permissions to load
    if (!permission) {
        return <View />;
    }

  // Prompt the user for permission if not granted
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
}

  // Handle the scanned data
    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Scanned QR Code with data: ${data}`);
    };

    return (
        <View style={styles.container}>
        <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ['qr'],
            }}
        />
    
    {/* Show a button to scan again after a successful scan */}
        {scanned && (
            <View style={styles.scanAgainContainer}>
                <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    message: {
    textAlign: 'center',
    paddingBottom: 10,
    },
    scanAgainContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    },
});