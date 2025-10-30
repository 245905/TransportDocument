import {Platform, Pressable, Text, View, StyleSheet, Animated, Easing, Keyboard} from 'react-native';
import {Image} from "expo-image";
import {colors} from "@/constants/colors";
import InputText from "@/components/InputText"
import {useEffect, useRef, useState} from "react";
import {validatePhoneNumber, validateVerificationCode} from "@/scripts/validateAuthorization";
import VerificationCode from "@/components/VerificationCode";
import {useLanguage} from "@/context/LanguageContext";
import CheckBox from "@/components/CheckBox";
import SelectLanguage from "@/components/SelectLanguage";

export default function SignIn() {
    const {t} = useLanguage();

    const [isSelectLanguageActive, setIsSelectLanguageActive] = useState(false);

    const handleOnChangeLanguage = (v: boolean) => {
        setIsSelectLanguageActive(v);
    }

    const [credentials, setCredentials] = useState({
        phoneNumber: "",
        rememberMe: false,
        code: "",
    });

    const [error, setError] = useState("");

    const [step, setStep] = useState(0);

    const handleOnChangeInput = (field: string, value: string) => {
        setCredentials(prevData => ({
            ...prevData,
            [field]: value,
        }));

        setError("")
    };

    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            Animated.timing(translateY, {
                toValue: -e.endCoordinates.height / 2.5 ,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        });

        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, [translateY]);

    const handleOnToggle = () => {
        setCredentials({
            ...credentials,
            rememberMe: !credentials["rememberMe"],
        })
    }

    const handleOnChangeInputCode = (value: string) => {
        setCredentials(prevData => ({
            ...prevData,
            ["code"]: value,
        }));
    };

    const handleOnClick = () => {
        let result = false;

        switch (step) {
            case 0:
                result = validatePhoneNumber(credentials.phoneNumber);

                if (result) {
                    setStep(step + 1)
                    setError("")
                }
                else {
                    setError("Invalid phone number!")
                }
                Keyboard.dismiss();
                break;
            case 1:
                //TODO correct code do zmiany
                result = validateVerificationCode(credentials.code, "123456");
                if (result) {
                    setError("")
                }
                else setError("Invalid verification code!")
                break;
        }
    }

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/auth_background.webp')}
                   style={styles.backgroundImage}/>
            <Animated.View style={[styles.loginContainer, {transform: [{translateY}]}]}>
                <View style={styles.topBar}>
                    <Text style={styles.header}>
                        {t("signInLabel")}
                    </Text>
                    <SelectLanguage onClick={handleOnChangeLanguage}/>
                </View>
                <Text style={styles.errorMessage}>
                    {error}
                </Text>
                <InputText
                    placeHolder={t("phoneNumberPlaceholder")}
                    label={t("phoneNumberLabel")}
                    value={credentials.phoneNumber}
                    onChangeText={(v) => handleOnChangeInput('phoneNumber', v)}
                    type={'numeric'}
                    error={error !== "" && step === 0}
                    editable={isSelectLanguageActive}
                />
                {
                    step === 1 &&
                    <>
                        <View style={styles.verificationCodeBar}>
                            <Text style={styles.verificationCodeLabel}>
                                {t("verificationCodeLabel")}
                            </Text>
                            <Text style={styles.resetCode}>
                                {t("resendCode")}
                            </Text>
                        </View>
                        <VerificationCode onChange={handleOnChangeInputCode} error={error !== ""}/>
                        <CheckBox label={t("rememberMe")} value={credentials.rememberMe} onToggle={handleOnToggle}/>
                    </>
                }
                <Pressable onPress={handleOnClick}
                           style={({pressed}) => [styles.confirmButton, step !== 0 && styles.centerConfirmButton,
                               step === 0 ? credentials.phoneNumber !== "" && styles.activeButton : credentials.code.length === 6 && styles.activeButton, pressed && styles.pressedButton]}>
                    <Text
                        style={[styles.signInButtonText, step === 0 ?
                            (credentials.phoneNumber !== "" && styles.activeButtonText) : (credentials.code.length === 6 && styles.activeButtonText)]}>
                        {step === 0 ? t("buttonConfirm") : t("buttonSignIn")}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
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
        color: colors.focusedColor,
        fontSize: 35,
        fontWeight: 'semibold',
        textAlign: 'left',
        width: "50%"
    },
    confirmButton: {
        width: 150,
        height: 50,
        alignSelf: 'flex-end',
        right: '10%',
        borderRadius: 50,
        backgroundColor: colors.lightBackground,
        borderWidth: 1,
        borderColor: colors.lightBorder,
        ...Platform.select({
            android: {
                elevation: 5,
            }
        })
    },
    signInButtonText: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 50,
        color: colors.lightText,
        fontWeight: 'semibold',
    },
    activeButton: {
        backgroundColor: colors.focusedColor,
        borderColor: colors.focusedColor,
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
    verificationCodeLabel: {
        color: colors.lightText,
        fontSize: 25,
        left: 0,
        width: "70%"
    },
    resetCode: {
        color: colors.lightLink,
        fontSize: 15,
        textDecorationLine: 'underline',
        right: 0,
        width: "30%",
        marginTop: 8
    },
    verificationCodeBar:{
        width: '80%',
        marginLeft: "10%",
        flexDirection: 'row',
        marginBottom: 20
    },
    centerConfirmButton: {
        alignSelf: 'center',
        right: 0,
        top: 20,
    },
    pressedButton: {
        transform: [{scale: 0.97}],
        opacity: 0.8,
    },
    topBar: {
        flexDirection: "row",
        height: 50,
        marginTop: 30,
        marginLeft: "5%",
        marginBottom: 30,
        width: "90%"
    }
});