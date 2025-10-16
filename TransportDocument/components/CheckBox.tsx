import {TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import { colors} from "@/constants/colors";

interface CheckBoxProps {
    label: string,
    value: boolean,
    onToggle: () => void,
}

const CheckBox = (props : CheckBoxProps) => {
    return (
      <View style={styles.container}>
            <TouchableOpacity onPress={props.onToggle}>
                <View style={[styles.checkbox, props.value && styles.isChecked]}>
                    {props.value && <Image source={require("@/assets/images/icons/check.png")} style={styles.isCheckedIcon}/>}
                </View>
            </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
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
        top: 25,
    },
    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 7,
        borderColor: colors.lightBorder,
        borderWidth: 1,
        alignItems: 'flex-start',
    },
    checkboxLabel: {
        fontSize: 15,
        position: "absolute",
        top: 2,
        left: 50,
        color: colors.lightText,
    },
    isChecked: {
        backgroundColor: colors.lightBorder,
    },
    isCheckedIcon: {
        width: 20,
        height: 20,
        left: 1.5,
        top: 1.5,
    }
})