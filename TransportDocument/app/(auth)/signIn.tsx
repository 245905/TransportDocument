import {Platform, Pressable, Text, View, StyleSheet, Animated, Easing, Keyboard, useColorScheme} from 'react-native';
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
    //dane logowania
    const [credentials, setCredentials] = useState({
        phoneNumber: "",
        rememberMe: false,
        code: "",
    });

    //język
    const {t} = useLanguage();

    //czy wybierany jest język
    const [isSelectLanguageActive, setIsSelectLanguageActive] = useState(false);

    //blokowanie inputa pod wyborem języka
    const handleOnChangeLanguage = (v: boolean) => { setIsSelectLanguageActive(v); }

    //treść errora
    const [error, setError] = useState("");

    //krok logowania
    const [step, setStep] = useState(0);

    //zmiana danych logowania
    const handleOnChangeInput = (field: string, value: string) => {
        setCredentials(prevData => ({
            ...prevData,
            [field]: value,
        }));

        setError("")
    };

    //animacja po wyświwtleniu klawiatury
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

    //czy zapamietać
    const handleOnToggle = () => {
        setCredentials({
            ...credentials,
            rememberMe: !credentials["rememberMe"],
        })
    }

    //zmiana kodu weryfikacyjnego
    const handleOnChangeInputCode = (value: string) => {
        setCredentials(prevData => ({
            ...prevData,
            ["code"]: value,
        }));
    };

    //logika przechodzenia dalej podczas logowania
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

    //kontrast telefonu
    const contrastMode = useColorScheme();

    //czy dark mode
    const isDarkMode = contrastMode === "dark";

    //style panelu logowania
    const loginPanelStyle = [
        styles.loginContainer,
        {transform: [{translateY}]},
        isDarkMode ? styles.darkBackground : styles.lightBackground
    ];

    //czy pierwszy krok
    const isFirstStep = step === 0;

    //czy wpisano numer telefonu
    const isPhoneEmpty = credentials.phoneNumber !== "";

    //czy wpisano cały kod
    const isCodeEntered = credentials.code.length === 6;

    //style guzika
    const buttonStyle = [
        isDarkMode ? styles.darkBackground : styles.lightBackground,
        isDarkMode ? styles.darkBorder : styles.lightBorder,
        styles.confirmButton,
        !isFirstStep && styles.centerConfirmButton,
        isFirstStep ? isPhoneEmpty && styles.activeButton : isCodeEntered && styles.activeButton
    ];

    //style tekstu guzika
    const buttonTextStyle = [
        isDarkMode ? styles.darkText : styles.lightText,
        styles.signInButtonText,
        isFirstStep ? isPhoneEmpty && styles.activeButtonText : isCodeEntered && styles.activeButtonText
    ];

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/auth_background.webp')}
                   style={styles.backgroundImage}/>
            <Animated.View style={loginPanelStyle}>
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
                    editable={!isSelectLanguageActive}
                />
                {
                    step === 1 &&
                    <>
                        <View style={styles.verificationCodeBar}>
                            <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.verificationCodeLabel]}>
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
                           style={({pressed}) => [...buttonStyle, pressed && styles.pressedButton]}>
                    <Text
                        style={buttonTextStyle}>
                        {step === 0 ? t("buttonConfirm") : t("buttonSignIn")}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
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
        marginTop: '-30%',
        borderRadius: 30,
    },
    header: {
        color: colors.focusedColor,
        fontSize: 33,
        textAlign: 'left',
        width: "50%",
        fontFamily: "InterBold"
    },
    confirmButton: {
        width: 150,
        height: 50,
        alignSelf: 'flex-end',
        right: '10%',
        borderRadius: 50,
        borderWidth: 1,
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
        fontFamily: "InterSemiBold"
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
        fontSize: 25,
        left: 0,
        width: "60%",
        fontFamily: "InterSemiBold"
    },
    resetCode: {
        color: colors.link,
        fontSize: 15,
        textDecorationLine: 'underline',
        right: 0,
        width: "40%",
        marginTop: 8,
        textAlign: "right"
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
    },
    darkBackground:{
        backgroundColor: colors.darkBackground
    },
    lightBackground:{
        backgroundColor: colors.lightBackground
    },
    darkBorder:{
        borderColor: colors.darkBorder
    },
    lightBorder:{
        borderColor: colors.lightBorder
    },
    lightText:{
        color: colors.lightText
    },
    darkText:{
        color: colors.darkText
    }
});