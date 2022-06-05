import changeLanguage from "./changeLanguage";
const selectLanguage = (languagePack, setLanguage) => (event) => {
    sessionStorage.removeItem('language')
    sessionStorage.setItem('language', event.target.value)
    changeLanguage(languagePack, setLanguage);
}
    export default selectLanguage;