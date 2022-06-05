export default function changeLanguage(LanguagePack, setLanguage) {
    let language = {};
    switch (sessionStorage.getItem('language')) {
        case "en":
            language = LanguagePack.enUS;
            break;
        case "en-US":
            language = LanguagePack.enUS;
            break;
        case "es":
            language = LanguagePack.esES;
            break;
        case "es-ES":
            language = LanguagePack.esES;
            break;
        default:
            language = LanguagePack.enUS;

    }
    document.getElementById("languageSel").value = language.abrev
    setLanguage(language);
}