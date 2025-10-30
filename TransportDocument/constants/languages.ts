import {ImageSourcePropType} from "react-native";
import {Lang} from "@/context/LanguageContext";

export interface ILanguage {
    shortName: string;
    name: string;
    flag: ImageSourcePropType,
    lang: Lang;
}

export const languages: ILanguage[] = [
    {
        "shortName": "EN",
        "name": "English",
        "flag": require("@/assets/images/flags/united_kingdom.webp"),
        "lang": "en"
    },
    {
        "shortName": "PL",
        "name": "Polski",
        "flag": require("@/assets/images/flags/poland.webp"),
        "lang": "pl"
    }
]