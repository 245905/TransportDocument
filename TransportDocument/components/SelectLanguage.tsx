import {Image, Pressable, StyleSheet, View, Text, FlatList, Animated, Easing, useColorScheme} from "react-native";
import {colors} from "@/constants/colors"
import LanguageItem from "@/components/LanguageItem";
import {languages} from "@/constants/languages";
import {useRef, useState} from "react";
import {useLanguage} from "@/context/LanguageContext";

interface SelectLanguageProps {
    onClick: (v: boolean) => void
}

const SelectLanguage = (props: SelectLanguageProps) => {
    //język
    const {setLanguage, lang} = useLanguage();

    //obecny język
    const currentLanguage = languages.find(l => l.lang === lang);

    //czy jest otwarte menu
    const [isDroppedDown, setIsDroppedDown] = useState(false);

    //animacja obrotu strzałki
    const rotateZ = useRef(new Animated.Value(0)).current;

    const toggleDropdown = () => {
        setIsDroppedDown(prevState => {
            const newState = !prevState

            if (newState) {
                Animated.timing(rotateZ, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }
                ).start();
                props.onClick(true)
            } else {
                Animated.timing(rotateZ, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }
                ).start();
                props.onClick(false)
            }

            return newState;
        });
    };

    const arrowRotation = rotateZ.interpolate({
        inputRange: [0, 1],
        outputRange: ['90deg', '-90deg'],
    });

    //kontrast telefonu
    const contrastMode = useColorScheme();

    //czy ciemny modtyw
    const isDarkMode = contrastMode === "dark";

    //style guzika wyboru
    const selectLanguageButtonStyle = [
        isDarkMode ? styles.darkBackground : styles.lightBackground,
        isDarkMode ? styles.darkBorder : styles.lightBorder,
        styles.container,
        isDroppedDown && styles.clickedDropdown
    ];

    //strzałka
    const arrowContent =
        isDroppedDown ? require('../assets/images/icons/more_info_focused.png') :
            (isDarkMode ? require('../assets/images/icons/more_info_dark.png') :
                require('../assets/images/icons/more_info.png'));

    //style menu
    const dropDownMenuStyles = [
        isDarkMode ? styles.darkBackground : styles.lightBackground,
        isDarkMode ? styles.darkBorder : styles.lightBorder,
        styles.dropDownMenu
    ];


    return (
        <>
            <Pressable
                style={selectLanguageButtonStyle}
                onPress={toggleDropdown}
                pointerEvents="auto">
                <View style={styles.changeLanguageButton}>
                    <Image source={currentLanguage?.flag} style={styles.flag}/>
                    <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.languageText]}>
                        {currentLanguage?.shortName}
                    </Text>
                    <Animated.Image
                        source={arrowContent}
                        style={[styles.dropDownArrow, {transform: [{rotateZ: arrowRotation}]}]}/>
                </View>
            </Pressable>
            {
                isDroppedDown && <View style={dropDownMenuStyles}>
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
        borderRadius: 30,
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
        fontFamily: "InterSemiBold",
        marginTop: 5,
        marginLeft: 12,
        width: 40,
    },
    dropDownArrow: {
        width: 12,
        height: 12,
        marginLeft: 25,
        marginTop: 14,
    },
    dropDownMenu: {
        flex: 1,
        width: "40%",
        maxHeight: 200,
        borderRadius: 10,
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
    },
    darkBackground: {
        backgroundColor: colors.darkBackground
    },
    lightBackground: {
        backgroundColor: colors.lightBackground
    },
    darkBorder: {
        borderColor: colors.darkBorder
    },
    lightBorder: {
        borderColor: colors.lightBorder
    },
    lightText: {
        color: colors.lightText
    },
    darkText: {
        color: colors.darkText
    }
})