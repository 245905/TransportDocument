import {Stack} from 'expo-router';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}/>
            <Toast/>
        </>
    );
}
