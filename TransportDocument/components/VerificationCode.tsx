import {Keyboard, Platform, StyleSheet, TextInput, View} from "react-native";
import {colors} from "@/constants/colors";
import {useRef, useState} from "react";

interface VerificationCodeProps {
    onChange: (code: string) => void;
    error: boolean;
}

const VerificationCode = (props: VerificationCodeProps) => {
    const [code, setCode] = useState<string[]>(new Array<string>(6).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));

    const handleOnChange = (text: string, index : number) => {
        const newCode = [...code];

        if(text.length === 1 && /^\d+$/.test(text)) {
            newCode[index] = text;
            setCode(newCode);
            props.onChange(newCode.join(''))

            if(index < 5) inputRefs.current[index + 1]?.focus();
            else Keyboard.dismiss();
        }
        else if(text.length === 0){
            newCode[index] = '';
            setCode(newCode);
            props.onChange(newCode.join(''))

            if(index > 0 && code[index - 1] !== ''){
                inputRefs.current[index - 1]?.focus();
            }
        }
    }

    const handleOnKeyPress = (event: any, index : number) => {
        if(event.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    }

    return (

        <View style={styles.container}>
            {
                code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style = {[styles.input, props.error && styles.errorBorder]}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        ref={(ref: TextInput | null) => {inputRefs.current[index] = ref}}
                        onChangeText={(text) => handleOnChange(text, index)}
                        onKeyPress={(e) => handleOnKeyPress(e, index)}
                    />
                ))
            }
        </View>
    )

};
export default VerificationCode;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        width: "80%",
        alignSelf: "center",
        marginBottom: 20,
    },
    input: {
        height: 60,
        width: "13.3%",
        marginHorizontal: "1.66%",
        borderWidth: 1,
        borderColor: colors.lightBorder,
        backgroundColor: colors.lightBackground,
        fontSize: 30,
        color: colors.lightText,
        borderRadius: 10,
        textAlign: "center",
        ...Platform.select({
            android:{
                elevation: 5,
            }
        })
    },
    errorBorder: {
        borderColor: colors.error
    }
})