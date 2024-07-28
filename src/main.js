import globalCss from './global.css';
import { Theme } from './theme.js';

// Import components to be included in the bundle
import './views/index.js';

const globalStylesheet = new CSSStyleSheet();
globalStylesheet.replaceSync(globalCss);
document.adoptedStyleSheets.push(globalStylesheet);

document.getElementById('body-anchor').innerHTML = `
    <site-body></site-body>
`;

document.documentElement.style.setProperty(
    "--theme-color-1",
    Theme.current[0]
);

document.documentElement.style.setProperty(
    "--theme-color-2",
    Theme.current[1]
);

document.documentElement.style.setProperty(
    "--theme-color-3",
    Theme.current[2]
);

document.documentElement.style.setProperty(
    "--theme-color-4",
    Theme.current[3]
);

document.documentElement.style.setProperty(
    "--font-color",
    Theme.current[4]
);

document.documentElement.style.setProperty(
    "--contrast-font-color",
    Theme.current[5]
);

document.documentElement.style.setProperty(
    "--small-font-color",
    Theme.current[6]
);