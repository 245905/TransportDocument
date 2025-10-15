
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from "expo-image";
import { colors } from "@/constants/colors";
import InputText from "@/components/InputText"
import {useState} from "react";
import {Link} from "expo-router";

export default function SignIn() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (field : string, value : string) => {
        setLoginData(prevData => ({
            ...prevData,
            [field]: value,
        }))
    }

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/auth_background.webp')}
                   style={styles.backgroundImage}/>
            <View style={styles.loginContainer}>
                <Text style={styles.header}>
                    Sign In
                </Text>
                <InputText
                    placeHolder={'Enter e-mail...'}
                    label={'E-mail'}
                    value={loginData.email}
                    onChangeText={(v) => handleChange('email', v)}
                    type={'text'}
                />
                <InputText
                    placeHolder={'Enter password...'}
                    label={'Password'}
                    value={loginData.password}
                    onChangeText={(v) => handleChange('password', v)}
                    type={'password'}
                />
                <Link href={"/(auth)/forgotPassword"} style={styles.forgotPassword}>
                    Forgot your password?
                </Link>
                <TouchableOpacity style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.lightBackground,
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '50%',
        opacity: 0.95,
    },
    loginContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: colors.lightBackground,
        marginTop: '-30%',
        borderRadius: 30,
    },
    header: {
        color: colors.lightText,
        fontSize: 50,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 70,
    },
    forgotPassword: {
        marginTop: -35,
        fontSize: 14,
        color: colors.lightLink,
        left: 70,
        textDecorationLine: 'underline',
    },
    signInButton: {
        width: 150,
        height: 50,
        alignSelf: 'center',
        top: 50,
        borderRadius: 50,
        backgroundColor: colors.lightBackground,
        borderWidth: 1,
        borderColor: colors.lightBorder,
    },
    signInButtonText: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 50,
        color: colors.lightText,
        fontWeight: 'semibold',
    }
});