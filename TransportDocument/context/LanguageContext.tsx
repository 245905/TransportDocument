import en from "../locales/en.json"
import pl from "../locales/pl.json"
import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Translations = typeof en;
type Lang = keyof typeof AVAILABLE_LANGUAGES;

const AVAILABLE_LANGUAGES = {
    en,
    pl
} as const;

type LanguageContextType = {
    lang: Lang;
    translations: Translations;
    setLanguage: (lang: Lang) => Promise<void>;
    t: (key : keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [lang, setLang] = useState<Lang>("en")
    const [translations, setTranslations] = useState<Translations>(en);

    const setLanguage = async (lang: Lang) => {
        await AsyncStorage.setItem("lang", lang);
        setLanguage(lang);
        setTranslations(AVAILABLE_LANGUAGES[lang]);
    };

    useEffect(() => {
        const loadLanguage = async () => {
            const storedLang = await AsyncStorage.getItem("lang") as Lang | null;
            const lang = storedLang && AVAILABLE_LANGUAGES[storedLang] ? storedLang : "en";
            setLang(lang);
            setTranslations(AVAILABLE_LANGUAGES[lang]);
        }

        loadLanguage();
    }, []);

    const t = (key: keyof Translations) => translations[key] || key;

    return (
        <LanguageContext.Provider value={{ lang, translations, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if(!context) throw new Error("useLanguage must be within a LanguageProvider");
    return context;
}