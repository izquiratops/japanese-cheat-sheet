import globalCss from './global.css';
import sharedCss from './shared.css';
import { StyleSheetUtils } from './utils/stylesheet.js';

// Import components to be included in the bundle
import './components';

StyleSheetUtils.adopt(document, globalCss);
StyleSheetUtils.adopt(document, sharedCss);

document.getElementById('body-anchor').innerHTML = `
    <site-body></site-body>
`;

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