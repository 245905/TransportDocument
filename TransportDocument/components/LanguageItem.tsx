import {Pressable, Image, Text, StyleSheet, ImageSourcePropType} from "react-native";
import {colors} from "@/constants/colors";

interface LanguageItemProps {
    name: string;
    flag: ImageSourcePropType;
    onSelect: () => void;
}

const LanguageItem = (props: LanguageItemProps) => {
    return (
        <Pressable style={styles.container} onPress={props.onSelect}>
            <Image source={props.flag} style={styles.flag}/>
            <Text style={styles.languageText}>
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
        color: colors.lightText,
        marginLeft: 20
    }
})