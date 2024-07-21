import globalCss from './global.css';
import { StyleSheetUtils } from './utils/style-sheet.js';

// Import components to be included in the bundle
import './components';

StyleSheetUtils.adopt(document, globalCss);

document.getElementById('bundle-anchor').innerHTML = `
    <site-body></site-body>
`;

addEventListener("load", () => {
    document.documentElement.style.setProperty(
        "--theme-color-1",
        StyleSheetUtils.theme[0]
    );
    document.documentElement.style.setProperty(
        "--theme-color-2",
        StyleSheetUtils.theme[1]
    );
    document.documentElement.style.setProperty(
        "--theme-color-3",
        StyleSheetUtils.theme[2]
    );
    document.documentElement.style.setProperty(
        "--theme-color-4",
        StyleSheetUtils.theme[3]
    );
    document.documentElement.style.setProperty(
        "--font-color",
        StyleSheetUtils.theme[4]
    );
    document.documentElement.style.setProperty(
        "--contrast-font-color",
        StyleSheetUtils.theme[5]
    );
});