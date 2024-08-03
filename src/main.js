import globalCss from './global.css';
import Themes from './theme.json';

// Bundle every custom Element from this project
import './components/index.js';
import './views/index.js';

const globalStylesheet = new CSSStyleSheet();
globalStylesheet.replaceSync(globalCss);
document.adoptedStyleSheets.push(globalStylesheet);

document.getElementById('body-anchor').innerHTML = `
    <site-body></site-body>
`;

const currentTheme = Themes['Matcha'];

const themeProperties = [
    "--theme-color-1",
    "--theme-color-2",
    "--theme-color-3",
    "--theme-color-4",
    "--font-color",
    "--contrast-font-color",
    "--small-font-color"
];

themeProperties.forEach((property) => {
    document.documentElement.style.setProperty(property, currentTheme[property]);
});