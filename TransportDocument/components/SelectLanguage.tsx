import {Image, Pressable, StyleSheet, View, Text, FlatList, Animated, Easing} from "react-native";
import {colors} from "@/constants/colors"
import LanguageItem from "@/components/LanguageItem";
import {languages} from "@/constants/languages";
import {useRef, useState} from "react";
import {useLanguage} from "@/context/LanguageContext";

interface SelectLanguageProps {
    onClick : (v: boolean) => void
}

const SelectLanguage = (props: SelectLanguageProps) => {
    const {setLanguage, lang} = useLanguage();
    const currentLanguage = languages.find(l => l.lang === lang);

    const [isDroppedDown, setIsDroppedDown] = useState(false);

    const rotateZ = useRef(new Animated.Value(0)).current;

    const toggleDropdown = () => {
        setIsDroppedDown(prevState => {
            const newState = !prevState

            if (newState) {
                Animated.timing(rotateZ, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }
                ).start();
                props.onClick(true)
            } else {
                Animated.timing(rotateZ, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }
                ).start();
                props.onClick(false)
            }

            return newState;
        });
    }

    const arrowRotation = rotateZ.interpolate({
        inputRange: [0, 1],
        outputRange: ['90deg', '-90deg'],
    })

    return (
        <>
            <Pressable style={[styles.container, isDroppedDown && styles.clickedDropdown]} onPress={toggleDropdown}
                       pointerEvents="auto">
                <View style={styles.changeLanguageButton}>
                    <Image source={currentLanguage?.flag} style={styles.flag}/>
                    <Text style={styles.languageText}>
                        {currentLanguage?.shortName}
                    </Text>
                    <Animated.Image
                        source={isDroppedDown ? require('../assets/images/icons/more_info_focused.png') : require('../assets/images/icons/more_info.png')}
                        style={[styles.dropDownArrow, {transform: [{rotateZ: arrowRotation}]}]}/>
                </View>
            </Pressable>
            {
                isDroppedDown && <View style={styles.dropDownMenu}>
                    <FlatList
                        data={languages}
                        keyExtractor={(item) => item.shortName}
                        renderItem={({item}) => (
                            <LanguageItem name={item.shortName} flag={item.flag} onSelect={() => {
                                props.onClick(false)
                                setLanguage(item.lang);
                                setIsDroppedDown(false);
                                Animated.timing(rotateZ, {
                                    toValue: 0,
                                    duration: 100,
                                    useNativeDriver: true,
                                    easing: Easing.out(Easing.ease),
                                }).start();
                            }
                            }/>
                        )}
                        keyboardShouldPersistTaps="handled"/>
                </View>
            }
        </>
    )
};
export default SelectLanguage;

const styles = StyleSheet.create({
    container: {
        width: "40%",
        height: "80%",
        marginTop: 5,
        marginLeft: "10%",
        backgroundColor: colors.lightBackground,
        borderRadius: 30,
        borderColor: colors.lightBorder,
        borderWidth: 1,
    },
    changeLanguageButton: {
        width: "100%",
        height: 40,
        borderRadius: 30,
        flexDirection: "row",
    },
    flag: {
        width: 30,
        height: 20,
        marginTop: 9,
        marginLeft: 10,
        borderRadius: 5,
    },
    languageText: {
        fontSize: 20,
        fontWeight: "semibold",
        marginTop: 5,
        marginLeft: 12,
        width: 40,
        color: colors.lightText,
    },
    dropDownArrow: {
        width: 12,
        height: 12,
        marginLeft: 10,
        marginTop: 14,
    },
    dropDownMenu: {
        flex: 1,
        width: "40%",
        maxHeight: 200,
        borderRadius: 10,
        backgroundColor: colors.lightBackground,
        borderWidth: 1,
        borderColor: colors.focusedColor,
        position: "absolute",
        right: 0,
        top: 50,
        zIndex: 20,
        flexDirection: "column",
        paddingTop: 10
    },
    clickedDropdown: {
        borderColor: colors.focusedColor,
    }
})