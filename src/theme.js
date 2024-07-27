export class Theme {
    static themes = [
        // Accent     Color 1    Color 2    Background  Font 1  Font 2  Small Font
        [  '#874356', '#F68989', '#C65D7B', '#F6E7D8',  '#000', '#FFF', '#444'], // DarkRed (HTML default)
        [  '#7469B6', '#AD88C6', '#E8C2DC', '#FFE6E6',  '#000', '#FFF', '#444'], // Fucsia
        [  '#55AD9B', '#95D2B3', '#D8EFD3', '#F1F8E8',  '#000', '#000', '#444'], // SuaveGreen
        [  '#99BC85', '#BFD8AF', '#D4E7C5', '#E1F0DA',  '#000', '#000', '#444'], // Matcha
        [  '#FF7D29', '#FFBF78', '#FFEEA9', '#FEFFD2',  '#000', '#FFF', '#444'], // 100%OrangeJuice
        [  '#FF9494', '#FFD1D1', '#FFE3E1', '#FFF5E4',  '#000', '#000', '#444'], // いちご🍓
        [  '#5F85DB', '#353941', '#353941', '#26282B',  '#FFF', '#FFF', '#BFCEF0'], // Dark
    ];

    static currentIndex = Math.floor(Math.random() * this.themes.length);
    static current = this.themes[this.currentIndex];
}