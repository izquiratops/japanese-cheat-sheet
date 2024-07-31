import globalCss from './global.css';
import { Theme } from './theme.js';
import './views/index.js';
import './components/index.js';

const globalStylesheet = new CSSStyleSheet();
globalStylesheet.replaceSync(globalCss);
document.adoptedStyleSheets.push(globalStylesheet);

document.getElementById('body-anchor').innerHTML = `
    <site-body></site-body>
`;

const themeProperties = [
    "--theme-color-1",
    "--theme-color-2",
    "--theme-color-3",
    "--theme-color-4",
    "--font-color",
    "--contrast-font-color",
    "--small-font-color"
];

themeProperties.forEach((property, index) => {
    document.documentElement.style.setProperty(property, Theme.current[index]);
});