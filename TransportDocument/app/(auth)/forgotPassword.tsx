import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from "expo-image";
import {colors} from "@/constants/colors";
import InputText from "@/components/InputText"
import {useState} from "react";
import {
    validateEmail,
    validateNewPassword,
    validateVerificationCode,
    ValidationResult,
} from "@/scripts/validateAuthorization";
import VerificationCode from "@/components/VerificationCode";
import {Link} from "expo-router";

export default function ForgotPassword() {
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [step, setStep] = useState(0);

    const [errorData, setErrorData] = useState<ValidationResult>({
        errorCode: 0,
        errorMessage: "",
    })

    const handleOnChangeInput = (field: string, value: string) => {
        setForgotPasswordData(prevData => ({
            ...prevData,
            [field]: value,
        }));

        setErrorData({
            errorCode: 0,
            errorMessage: "",
        })
    };

    const handleOnChangeInputCode = (value: string) => {
        setForgotPasswordData(prevData => ({
            ...prevData,
            ["code"]: value,
        }));
    };

    const handleOnClick = () => {
        let result = false;

        switch (step) {
            case 0:
                result = validateEmail(forgotPasswordData.email);
                setErrorData({
                    errorCode: result ? 0 : 2,
                    errorMessage: result ? "" : "Invalid e-mail!",
                })
                if (result) {
                    setStep(step + 1)
                    setErrorData({
                        errorCode: 0,
                        errorMessage: "",
                    })
                }
                break;
            case 1:
                result = validateVerificationCode(forgotPasswordData.code, "123456");

                setErrorData({
                    errorCode: result ? 0 : 4,
                    errorMessage: result ? "" : "Invalid code!",
                })
                if (result) {
                    setStep(step + 1)
                    setErrorData({
                        errorCode: 0,
                        errorMessage: "",
                    })
                }
                break;
            case 2:
                const result1 : ValidationResult = validateNewPassword(forgotPasswordData.newPassword, forgotPasswordData.confirmPassword);
                setErrorData(result1);

                if(result1.errorCode === 0) setStep(step + 1)
                else{
                    setForgotPasswordData({
                        ...forgotPasswordData,
                        ["newPassword"]: "",
                        ["confirmPassword"]: "",
                    })
                }
                break;
        }
    }

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/auth_background.webp')}
                   style={styles.backgroundImage}/>
            <View style={styles.loginContainer}>
                <Text style={styles.header}>
                    Forgot password
                </Text>
                <Text style={styles.errorMessage}>
                    {errorData.errorMessage}
                </Text>
                {
                    step !== 2  ?
                        step !== 3 &&
                        <>
                            <InputText
                                placeHolder={'Enter e-mail...'}
                                label={'E-mail'}
                                value={forgotPasswordData.email}
                                onChangeText={(v) => handleOnChangeInput('email', v)}
                                type={'text'}
                                error={errorData.errorCode === 2}
                            />
                            {
                                step === 1 &&
                                <>
                                    <Text style={styles.verificationCodeLabel}>
                                        Enter code:
                                    </Text>
                                    <VerificationCode onChange={handleOnChangeInputCode} error={errorData.errorCode === 4}/>
                                    <Text style={styles.resetCode}>
                                        Reset code
                                    </Text>
                                </>
                            }
                        </>
                        :
                        <>
                            <InputText
                                placeHolder={'Enter new password...'}
                                label={'New password'}
                                value={forgotPasswordData.newPassword}
                                onChangeText={(v) => handleOnChangeInput('newPassword', v)}
                                type={'password'}
                                error={errorData.errorCode !== 0}
                            />
                            <InputText
                                placeHolder={'Confirm new password...'}
                                label={'Confirm password'}
                                value={forgotPasswordData.confirmPassword}
                                onChangeText={(v) => handleOnChangeInput('confirmPassword', v)}
                                type={'confirmPassword'}
                                error={errorData.errorCode !== 0}
                            />
                        </>
                }
                {
                    step === 3 ?
                        <>
                            <Text style={styles.passwordChangedText}>
                                Password changed successfully!
                            </Text>
                            <Link href={"/signIn"} style={styles.backToSignIn}>
                                Back to Sign In
                            </Link>
                        </>:
                        <TouchableOpacity onPress={handleOnClick}
                                          style={[styles.ConfirmButton, step !== 0 && styles.centerConfirmButton, step === 2 ?
                                              forgotPasswordData.newPassword !== "" && forgotPasswordData.confirmPassword !== "" && styles.activeButton :
                                              step === 0 ?
                                                  forgotPasswordData.email !== "" && styles.activeButton :
                                                  forgotPasswordData.code.length === 6 && styles.activeButton]}>
                            <Text
                                style={[styles.signInButtonText, step === 0 ?
                                    (forgotPasswordData.email !== "" && styles.activeButtonText) :
                                    step === 1 ? (forgotPasswordData.code.length === 6 && styles.activeButtonText) :
                                        forgotPasswordData.newPassword !== "" && forgotPasswordData.confirmPassword !== "" && styles.activeButtonText]}>
                                {step === 2 ? "Change" : "Confirm"}
                            </Text>
                        </TouchableOpacity>
                }
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
        fontSize: 40,
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
    ConfirmButton: {
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
    verificationCodeLabel: {
        color: colors.lightText,
        fontSize: 25,
        left: "11%",
        marginBottom: 20
    },
    resetCode: {
        color: colors.lightLink,
        fontSize: 15,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    centerConfirmButton: {
        alignSelf: 'center',
        right: 0,
        top: 20,
    },
    backToSignIn: {
        color: colors.lightLink,
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 15,
        top: 60
    },
    passwordChangedText: {
        color: "#37752a",
        fontSize: 30,
        textAlign: 'center',
        width: "70%",
        alignSelf: "center",
        top: 50
    }
});