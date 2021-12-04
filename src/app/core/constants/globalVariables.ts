// supported language
let supportedLanguages: [
    'en-US',
    'fr-FR'
];

let userInfo = {}

let bsDatecolorTheme = 'theme-blue'

let bsDatePickerOp = {
    showWeekNumbers: false,
    dateInputFormat: "DD/MM/YYYY",
    containerClass: 'theme-blue'
}


// version
let currentModule = ''; //l
let currentModuleURL = '';
let currentRouter = '';
let currentLanguage = 'en'; //l
let currentLanguageData = {};//l
export const globalVariables: any = {
    currentModule: currentModule,
    currentModuleURL: currentModuleURL,
    currentRouter: currentRouter,
    currentLanguage: currentLanguage,
    currentLanguageData: currentLanguageData, 
    
    bsDatePickerOp: bsDatePickerOp,
   
}