import {View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Platform} from "react-native";

import {colors} from "@/constants/colors";
import {useState} from "react";

interface InputTextProps {
    placeHolder: string,
    type: string,
    onChangeText: (text: string) => void,
    value: string,
    label: string,
    error: boolean,
}

const InputText = (props: InputTextProps) => {
    const [isShown, setIsShown] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, props.error && styles.errorLabel]}>
                {props.label}
            </Text>
            <TextInput
                style={[styles.input, props.type === "password" && styles.passwordInput, props.error && styles.errorBorderInput]}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeHolder}
                secureTextEntry={(isShown && props.type === "password") || props.type === "confirmPassword"}
                placeholderTextColor={colors.lightHint}
            />
            {
                props.type === "password" &&
                <TouchableOpacity onPress={() => setIsShown(!isShown)} style={styles.toggleIconContainer}>
                    <Image source={isShown ? require('@/assets/images/icons/show_password.png')
                        : require('@/assets/images/icons/hide_password.png')}
                           style={styles.toggleShowPasswordIcon}/>
                </TouchableOpacity>
            }
        </View>
    );
};
export default InputText;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf:
            "center",
        position:
            "relative",
        marginBottom:
            40
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.lightBackground,
        borderRadius: 25,
        borderColor: colors.lightBorder,
        borderWidth: 1,
        zIndex: 1,
        paddingHorizontal: 20,
        fontSize: 17,
        ...Platform.select({
            android:{
                elevation: 5,
            }
        })
    },
    label: {
        fontSize: 14,
        color: colors.lightText,
        backgroundColor: colors.lightBackground,
        top: -12,
        left: '8%',
        zIndex: 2,
        paddingHorizontal: "2%",
        position: "absolute",
    },
    toggleShowPasswordIcon: {
        width: 25,
        height: 25,
        zIndex: 10,
        alignSelf: "center",
        top: 12.5
    },
    passwordInput: {
        paddingRight: 50,
    },
    toggleIconContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignSelf: "flex-end",
        right: 5,
    },
    errorLabel: {
        color: colors.error,
    },
    errorBorderInput: {
        borderColor: colors.error,
    }
});