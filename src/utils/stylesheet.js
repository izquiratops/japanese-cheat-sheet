export class StyleSheetUtils {
    static themes = [
        ['#874356', '#F68989', '#C65D7B', '#F6E7D8', '#000', '#FFF'], // DarkRed (HTML default)
        ['#7469B6', '#AD88C6', '#E8C2DC', '#FFE6E6', '#000', '#FFF'], // Fucsia
        ['#55AD9B', '#95D2B3', '#D8EFD3', '#F1F8E8', '#000', '#000'], // SuaveGreen
        ['#99BC85', '#BFD8AF', '#D4E7C5', '#E1F0DA', '#000', '#000'], // Matcha
        ['#FF7D29', '#FFBF78', '#FFEEA9', '#FEFFD2', '#000', '#FFF'], // 100%OrangeJuice
        ['#FF9494', '#FFD1D1', '#FFE3E1', '#FFF5E4', '#000', '#000'], // いちご🍓
    ];

    static themeIndex = Math.floor(Math.random() * this.themes.length)
    static theme = this.themes[this.themeIndex];

    static adopt(htmlElement, cssStringifiedRules) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(cssStringifiedRules);
        htmlElement.adoptedStyleSheets.push(stylesheet);
    }
}