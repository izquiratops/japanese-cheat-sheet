import globalCss from './global.css';
import './components';

document.getElementById('bundle-anchor').innerHTML = `
    <site-body></site-body>
`;

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(globalCss);
document.adoptedStyleSheets.push(stylesheet);