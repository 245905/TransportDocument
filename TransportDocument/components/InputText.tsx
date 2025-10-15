import {View, TextInput, Text, StyleSheet} from "react-native";

import { colors } from "@/constants/colors";

interface inputTextProps {
    placeHolder: string,
    type: string,
    onChangeText: (text: string) => void,
    value: string,
    label: string,
}

const InputText = (props : inputTextProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeHolder}
                secureTextEntry={props.type === "password"}
                placeholderTextColor={colors.lightHint}
            />
        </View>
    );
}; export default InputText;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf: "center",
        position: "relative",
        marginBottom: 40
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.lightBackground,
        borderRadius: 25,
        borderColor: colors.lightBorder,
        borderWidth: 1,
        paddingHorizontal: 20,
        fontSize: 17,
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
})