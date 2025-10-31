import {View, Text, StyleSheet, Image, Platform, Pressable, useColorScheme} from "react-native";
import { colors} from "@/constants/colors";

interface CheckBoxProps {
    label: string,
    value: boolean,
    onToggle: () => void,
}

const CheckBox = (props : CheckBoxProps) => {
    //kontrast urządzenia
    const contrastMode = useColorScheme();

    //czy ciemny motyw
    const isDarkMode = contrastMode === "dark";

    //style checkboxa
    const checkBoxStyle = [
        isDarkMode ? styles.darkBackground : styles.lightBackground,
        isDarkMode ? styles.darkBorder : styles.lightBorder,
        styles.checkbox,
        props.value && styles.isChecked
    ];

    return (
      <View style={styles.container}>
            <Pressable onPress={props.onToggle}>
                <View style={checkBoxStyle}>
                    {props.value && <Image source={require("@/assets/images/icons/check.png")} style={styles.isCheckedIcon}/>}
                </View>
            </Pressable>
          <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.checkboxLabel]}>
              {props.label}
          </Text>
      </View>
    );
}; export default CheckBox;

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
        left: "15%",
        top: 5
    },
    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'flex-start',
        ...Platform.select({
            android:{
                elevation: 5,
            }
        }),
    },
    checkboxLabel: {
        fontSize: 15,
        position: "absolute",
        top: 2,
        left: 50,
    },
    isChecked: {
        backgroundColor: colors.checkBox,
        borderColor: colors.checkBox,
    },
    isCheckedIcon: {
        width: 20,
        height: 20,
        left: 1.5,
        top: 1.5,
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
})