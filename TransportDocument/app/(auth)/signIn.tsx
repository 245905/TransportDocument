
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from "expo-image";
import { colors } from "@/constants/colors";
import InputText from "@/components/InputText"
import {useState} from "react";
import {Link} from "expo-router";
import CheckBox from "@/components/CheckBox";
import {ValidationResult, validateSignIn} from "@/scripts/validateSignIn";

export default function SignIn() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errorData, setErrorData] = useState<ValidationResult>({
        errorCode: 0,
        errorMessage: "",
    })

    const handleOnChangeInput = (field : string, value : string) => {
        setLoginData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleOnToggle = () => {
        setLoginData({
            ...loginData,
            rememberMe: !loginData["rememberMe"],
        })
    }

    const handleOnSubmit = () => {
        const result = validateSignIn({
            email: loginData.email,
            password: loginData.password,
        })

        setErrorData(result)

        //error 0 - correct data
        //error 1 - incorrect password
        //error 2 - incorrect e-mail
        //error 3 - both incorrect

        //Send to server
    }

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/auth_background.webp')}
                   style={styles.backgroundImage}/>
            <View style={styles.loginContainer}>
                <Text style={styles.header}>
                    Sign In
                </Text>
                <Text style={styles.errorMessage}>
                    {errorData.errorMessage}
                </Text>
                <InputText
                    placeHolder={'Enter e-mail...'}
                    label={'E-mail'}
                    value={loginData.email}
                    onChangeText={(v) => handleOnChangeInput('email', v)}
                    type={'text'}
                    error={errorData.errorCode === 2 || errorData.errorCode === 3}
                />
                <InputText
                    placeHolder={'Enter password...'}
                    label={'Password'}
                    value={loginData.password}
                    onChangeText={(v) => handleOnChangeInput('password', v)}
                    type={'password'}
                    error={errorData.errorCode === 1 || errorData.errorCode === 3}
                />
                <Link href={"/(auth)/forgotPassword"} style={styles.forgotPassword}>
                    Forgot your password?
                </Link>
                <CheckBox label={"Remember me"} value={loginData.rememberMe} onToggle={handleOnToggle} />
                <TouchableOpacity onPress={handleOnSubmit} style={[styles.signInButton, loginData.email !== "" && loginData.password !== "" && styles.activeButton]}>
                    <Text style={[styles.signInButtonText, loginData.email !== "" && loginData.password !== "" && styles.activeButtonText]}>
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
        marginTop: 30,
        marginBottom: 50,
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
        top: 70,
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
    },
    activeButton: {
        backgroundColor: colors.lightBorder,
    },
    activeButtonText: {
        color: colors.lightBackground,
    },
    errorMessage: {
        color: colors.error,
        fontSize: 16,
        textAlign: 'center',
        top: -25
    },
});