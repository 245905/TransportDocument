import {Pressable, Image, Text, StyleSheet, ImageSourcePropType, useColorScheme} from "react-native";
import {colors} from "@/constants/colors";

interface LanguageItemProps {
    name: string;
    flag: ImageSourcePropType;
    onSelect: () => void;
}

const LanguageItem = (props: LanguageItemProps) => {
    //kontrast telefonu
    const contrastMode = useColorScheme();

    //czy dark mode
    const isDarkMode = contrastMode === "dark";

    return (
        <Pressable style={[isDarkMode ? styles.darkBackground : styles.lightBackground, styles.container]} onPress={props.onSelect}>
            <Image source={props.flag} style={styles.flag}/>
            <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.languageText]}>
                {props.name}
            </Text>
        </Pressable>
    )
};
export default LanguageItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "90%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: "10%",
        zIndex: 99999,
    },
    flag:{
        width: 40,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
    },
    languageText: {
        fontSize: 20,
        fontWeight: "semibold",
        justifyContent: "center",
        marginLeft: 20
    },
    darkBackground: {
        backgroundColor: colors.darkBackground
    },
    lightBackground: {
        backgroundColor: colors.lightBackground
    },
    lightText: {
        color: colors.lightText
    },
    darkText: {
        color: colors.darkText
    }
})