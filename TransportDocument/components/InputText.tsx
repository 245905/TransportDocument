import {View, TextInput, Text, StyleSheet, Platform} from "react-native";

import {colors} from "@/constants/colors";
import {useState} from "react";

interface InputTextProps {
    placeHolder: string,
    type: string,
    onChangeText: (text: string) => void,
    value: string,
    label: string,
    error: boolean,
    editable?: boolean
}

const InputText = (props: InputTextProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, focused && styles.focusedInputLabel,props.error && styles.errorLabel]}>
                {props.label}
            </Text>
            <TextInput
                style={[styles.input, focused && styles.focusedBorderInput, props.error && styles.errorBorderInput]}
                onChangeText={props.onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={props.value}
                placeholder={props.placeHolder}
                placeholderTextColor={colors.lightHint}
                keyboardType={props.type === "numeric" ? "numeric" : "default"}
                editable={props.editable}
            />
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
        left: 35,
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
    },
    focusedBorderInput: {
        borderColor: colors.focusedColor,
    },
    focusedInputLabel: {
        color: colors.focusedColor,
    }
});