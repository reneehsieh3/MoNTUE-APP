import { Alert } from 'react-native';
import * as Camera from 'expo-camera';

const pickImage = async () => {
    const { status } = await Camera.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('抱歉', '我們需要相機權限才能進行掃描！');
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });

    if (!result.canceled) {
        const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;

        return base64String;
    }
    return null;
};

export { pickImage };