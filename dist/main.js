(() => {
  // ../src/global.css
  var global_default = ":root{--spacing-small:8px;--spacing-medium:16px;--spacing-large:24px;--spacing-extra-large:32px;--spacing-2-extra-large:48px;--icon-size:32px;--border-radius:4px;--toc-link-color:#4183c4;--theme-color-1:#874356;--theme-color-2:#F68989;--theme-color-3:#C65D7B;--theme-color-4:#F6E7D8;--font-color:#000;--contrast-font-color:#FFF}body{text-rendering:optimizeLegibility;font-family:Open Sans,sans-serif;line-height:1.5;color:var(--font-color);background:var(--theme-color-4)}body,html{height:100%;margin:0}.hidden{display:none}";

  // ../src/utils/style-sheet.js
  var StyleSheetUtils = class {
    static themes = [
      ["#874356", "#F68989", "#C65D7B", "#F6E7D8", "#000", "#FFF"],
      // DarkRed (HTML default)
      ["#7469B6", "#AD88C6", "#E8C2DC", "#FFE6E6", "#000", "#FFF"],
      // Fucsia
      ["#55AD9B", "#95D2B3", "#D8EFD3", "#F1F8E8", "#000", "#000"],
      // SuaveGreen
      ["#99BC85", "#BFD8AF", "#D4E7C5", "#E1F0DA", "#000", "#000"],
      // Matcha
      ["#FF7D29", "#FFBF78", "#FFEEA9", "#FEFFD2", "#000", "#FFF"],
      // 100%OrangeJuice
      ["#FF9494", "#FFD1D1", "#FFE3E1", "#FFF5E4", "#000", "#000"]
      // いちご🍓
    ];
    static themeIndex = Math.floor(Math.random() * this.themes.length);
    static theme = this.themes[this.themeIndex];
    static adopt(htmlElement, cssStringifiedRules) {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(cssStringifiedRules);
      htmlElement.adoptedStyleSheets.push(stylesheet);
    }
  };

  // ../src/components/body/index.html
  var body_default = `<div class=page__content><h1 class="page__title centered__text">Japanese Cheat Sheet</h1><blockquote class=legend id=legend><a class="icon__button toggle" id=toggle-legend title="Toggle legend" tabindex=-1><img src=plus.svg id=plus alt="Plus icon">
<img src=minus.svg id=minus alt="Minus icon" class=hidden>
</a><strong>Symbols</strong><div class=columns__container><ul><div class=legend__symbol>\u2747\uFE0F</div><span>"Noun-able" form (a form that can be nominalized with \u3053\u3068 or \u306E)</span><br><div class=legend__symbol>\u2B07\uFE0F</div><span>Considered inappropriate when addressing superiors.</span><br><div class=legend__symbol>1\uFE0F\u20E3</div><span>\u306A\u3044\u3067\u3059 is interchangable with \u3042\u308A\u307E\u305B\u3093 (the later is slightly more formal)</span><br></ul></div></blockquote><h2 id=table-of-contents>Table of contents</h2><div class=columns__container><section><strong>Verbs</strong><ul class=table__of__contents><li><a href=#conjugations>Conjugations</a><li><a href=#polite-verbs>Polite Verbs</a><li><a href=#informal-verbs>Informal Verbs</a><li><a href=#verb-usages class=disabled tabindex=-1>Verb usages</a></ul><strong>Syllabary</strong><ul class=table__of__contents><li><a href=#hiragana class=disabled tabindex=-1>Hiragana \u3042</a><li><a href=#verb-usages class=disabled tabindex=-1>Katakana \u30A2</a></ul><strong>Kanji</strong><ul class=table__of__contents><li><a href=#kanji-anki-deck>Kanji Anki deck</a><li><a href=#jlpt-n5 class=disabled tabindex=-1>List of JLPT N5</a></ul></section><section><strong>Conjugations</strong><ul class=table__of__contents><li><a href=#conjugating-verbs class=disabled tabindex=-1>Conjugating Verbs</a><li><a href=#forms-of-to-be class=disabled tabindex=-1>Forms of \u3067\u3042\u308B</a><li><a href=#adjective-conjugation class=disabled tabindex=-1>Adjective Conjugation</a></ul><strong>Particles</strong><ul class=table__of__contents><li><a href=#particle-ha class=disabled tabindex=-1>Topic marker \u306F (HA)</a><li><a href=#particle-ga class=disabled tabindex=-1>Subject marker \u304C (GA)</a><li><a href=#particle-wo class=disabled tabindex=-1>Object marker \u3092 (WO)</a><li><a href=#particle-ni class=disabled tabindex=-1>The "Aiming" particle \u306B (NI)</a><li><a href=#particle-to class=disabled tabindex=-1>The "Glue" particle \u3068 (TO)</a><li><a href=#particle-de class=disabled tabindex=-1>The "Enabling" particle \u3067 (DE)</a><li><a href=#particle-mo class=disabled tabindex=-1>Even/Also marker \u3082 (MO)</a><li><a href=#particle-ka class=disabled tabindex=-1>Question Marker \u304B (KA)</a><li><a href=#particle-he class=disabled tabindex=-1>Destination Marker \u3078 (HE)</a><li><a href=#particle-no class=disabled tabindex=-1>Possession Marker \u306E (NO)</a><li><a href=#particle-ya class=disabled tabindex=-1>Incomplete "and" group \u3084 (YA)</a></ul></section><section><strong>Comparison Particles</strong><ul class=table__of__contents><li><a href=#particle-yori class=disabled tabindex=-1>\u3088\u308A (YORI)</a><li><a href=#particle-hodo class=disabled tabindex=-1>\u307B\u3069 (HODO)</a><li><a href=#particle-dake class=disabled tabindex=-1>\u3060\u3051 (DAKE)</a><li><a href=#particle-kurai class=disabled tabindex=-1>\u304F\u3089\u3044 (KURAI)</a><li><a href=#particle-bakari class=disabled tabindex=-1>\u3070\u304B\u308A (BAKARI)</a><li><a href=#particle-demo class=disabled tabindex=-1>\u3067\u3082 (DEMO)</a><li><a href=#particle-shika class=disabled tabindex=-1>\u3057\u304B (SHIKA)</a></ul><strong>Other Particles</strong><ul class=table__of__contents><li><a href=#particle-kara class=disabled tabindex=-1>From/Because \u304B\u3089 (KARA)</a><li><a href=#particle-made class=disabled tabindex=-1>Until/To \u307E\u3067 (MADE)</a></ul></section></div><h2 id=conjugations>Conjugations</h2><div class=columns__container><section><h3>Godan & Ichidan</h3><table class=centered__text><thead><tr><th>Ending<th>U-verb<th>Ru-verb<tbody><tr><td><code>\uFF5E\u3042</code><td>\u306F\u306A<strong>\u3055</strong><td>\u305F\u3079<strong>\u2715</strong><tr><td><code>\uFF5E\u3044</code><td>\u306F\u306A<strong>\u3057</strong><td>\u305F\u3079<strong>\u2715</strong><tr><td><code>\uFF5E\u3046</code><td>\u306F\u306A<strong>\u3059</strong><td>\u305F\u3079<strong>\u308B</strong><tr><td><code>\uFF5E\u3048</code><td>\u306F\u306A<strong>\u305B</strong><td>\u305F\u3079<strong>\u308C</strong><tr><td><code>\uFF5E\u304A\u3046</code><td>\u306F\u306A<strong>\u305D\u3046</strong><td>\u305F\u3079<strong>\u3088\u3046</strong><tr><td><code>\uFF5E\u3066</code><td><td>\u305F\u3079<strong>\u3066</strong><tr><td><code>\uFF5E\u305F</code><td><td>\u305F\u3079<strong>\u305F</strong></table></section><section><h3>\u3059\u308B & \u304F\u308B</h3><table class=centered__text><thead><tr><th>Ending<th>\u3059\u308B<th>\u304F\u308B<tbody><tr><td><code>\uFF5E\u3042</code><td>\u3057<td>\u3053<tr><td><code>\uFF5E\u3044</code><td>\u3057<td>\u304D<tr><td><code>\uFF5E\u3046</code><td>\u3059<strong>\u308B</strong><td>\u304F<strong>\u308B</strong><tr><td><code>\uFF5E\u3048</code><td>\u3059<strong>\u308C</strong><td>\u304F<strong>\u308C</strong><tr><td><code>\uFF5E\u304A\u3046</code><td>\u3057<strong>\u3088\u3046</strong><td>\u3053<strong>\u3088\u3046</strong><tr><td><code>\uFF5E\u3066</code><td>\u3057<strong>\u3066</strong><td>\u304D<strong>\u3066</strong><tr><td><code>\uFF5E\u305F</code><td>\u3057<strong>\u305F</strong><td>\u304D<strong>\u305F</strong></table></section><section><h3>\u3066 & \u305F endings</h3><table class=centered__text><thead><tr><th>Dictionary<th>\u3066<th>\u305F<tbody><tr><td>\u3046\u3001\u3064\u3001\u308B<td>\u3063\u3066<td>\u3063\u305F<tr><td>\u3080\u3001\u3076\u3001\u306C<td>\u3093\u3067<td>\u3093\u3060<tr><td>\u304F<td>\u3044\u3066<td>\u3044\u305F<tr><td>\u3050<td>\u3044\u3067<td>\u3044\u3060<tr><td>\u3059<td>\u3057\u3066<td>\u3057\u305F</table></section></div><small>Exceptions:<br><ul><li>\u3044\u304F (to go) in \u3066/\u305F form becomes \u3044\u3063\u3066/\u3044\u3063\u305F<li>The <code>\uFF5E\u3042</code> ending for verbs in \u3046 is \u308F</ul></small><h2 id=polite-verbs>Polite Verbs</h2><table><thead><tr><th>Tense name<th>Form<tbody><tr><td>Present/Future<td><code>\uFF5E\u3044</code>\uFF0B\u307E\u3059<tr><td>Past<td><code>\uFF5E\u3044</code>\uFF0B\u307E\u3057\u305F<tr><td><span>Progressive
</span><a href=https://guidetojapanese.org/learn/complete/progressive_tense target=_blank rel="noopener noreferrer"><small>Tae Kim \u{1F517}</small></a><td><code>~\u3066</code>\uFF0B\u3044\u307E\u3059<tr><td><span>Negative present/future
</span><a href=https://guidetojapanese.org/learn/complete/polite_negative target=_blank rel="noopener noreferrer"><small>Tae Kim \u{1F517}</small></a><td><code>\uFF5E\u3044</code>\uFF0B\u307E\u305B\u3093<tr><td>Negative past<td><code>\uFF5E\u3044</code>\uFF0B\u307E\u305B\u3093\u3067\u3057\u305F<tr><td><span>Command
</span><a href=https://guidetojapanese.org/learn/complete/command target=_blank rel="noopener noreferrer"><small>Tae Kim \u{1F517}</small></a><td><code>\uFF5E\u3066</code>\uFF0B\u304F\u3060\u3055\u3044<br><code>\uFF5E\u3044</code>\uFF0B\u306A\u3055\u3044 \u2B07\uFE0F<tr><td>Negative command<td><code>\uFF5E\u3042</code>\uFF0B\u306A\u3044\u3067\u304F\u3060\u3055\u3044<tr><td>Potential <small>can/able to</small><td>Godan <code>~\u3046</code>\uFF0B\u307E\u3059<br>Ichidan <code>~\u308B</code>\uFF0B\u3089\u308C\u307E\u3059<br>\u3059\u308B \u2192 \u3067\u304D\u307E\u3059\u3001
\u304F\u308B \u2192 \u3053\u3089\u308C\u307E\u3059<tr><td>Want to<td><code>\uFF5E\u3044</code>\uFF0B\u305F\u3044\u3067\u3059<tr><td>Don't want to 1\uFE0F\u20E3<td><code>\uFF5E\u3044</code>\uFF0B\u305F\u304F\u306A\u3044\u3067\u3059<tr><td>Let's do<br>Shall we...<td><code>\uFF5E\u3044</code>\uFF0B\u307E\u3057\u3087\u3046<br><code>\uFF5E\u3044</code>\uFF0B\u307E\u3057\u3087\u3046<tr><td>Passive <small>to be ~ed</small><td>Godan <code>~\u3042</code>\uFF0B\u308C\u307E\u3059<br>Ichidan <code>~\u3042</code>\uFF0B\u3089\u308C\u307E\u3059<br>\u3059\u308B \u2192 \u3055\u308C\u307E\u3059\u3001
\u304F\u308B \u2192 \u3053\u3089\u308C\u307E\u3059<tr><td>Causative <small>to allow, force someone to ~</small><td>Godan <code>~\u3042</code>\uFF0B\u305B\u307E\u3059<br>Ichidan <code>~\u3042</code>\uFF0B\u3055\u305B\u307E\u3059<br>\u3059\u308B \u2192 \u3055\u305B\u307E\u3059\u3001
\u304F\u308B \u2192 \u3053\u3055\u305B\u307E\u3059</table><div class=checkbox__wrapper><input type=checkbox name=polite-examples checked disabled>
<label for=polite-examples>Show examples</label></div><h2 id=informal-verbs>Informal Verbs</h2><table><thead><tr><th>Tense name<th>Form<tbody><tr><td>Present/Future \u2747\uFE0F<td><code>\uFF5E\u3046</code><tr><td><span>Past
</span><a href=https://guidetojapanese.org/learn/complete/verb_past target=_blank rel="noopener noreferrer"><small>Tae Kim \u{1F517}</small></a> \u2747\uFE0F<td><code>\uFF5E\u305F</code><tr><td>Progressive \u2747\uFE0F<td><code>~\u3066</code>\uFF0B\u3044\u308B<tr><td>Negative present/future \u2747\uFE0F<td><code>\uFF5E\u3042</code>\uFF0B\u306A\u3044<tr><td>Negative past \u2747\uFE0F<td><code>\uFF5E\u3042</code>\uFF0B\u306A\u304B\u3063\u305F<tr><td>Command<td><code>\uFF5E\u3066</code><br><hr>Godan <code>\uFF5E\u3048</code><br>Ichidan <code>\uFF5E\u3044</code>\uFF0B\u308D<br>\u3059\u308B \u2192 \u3057\u308D\u3001
\u304F\u308B \u2192 \u3053\u3044 <small>Considered rude</small><tr><td>Negative command<td><code>\uFF5E\u3042</code>\uFF0B\u306A\u3044\u3067<br><code>\uFF5E\u3046</code>\uFF0B\u306A <small>Considered rude</small><tr><td>Potential <small>can/able to</small> \u2747\uFE0F<td>Godan <code>~\u3048</code>\uFF0B\u308B<br>Ichidan <code>~\u3042</code>\uFF0B\u3089\u308C\u308B<br>\u3059\u308B \u2192 \u3067\u304D\u308B\u3001
\u304F\u308B \u2192 \u3053\u308C\u308B<tr><td>Want to<td><code>\uFF5E\u3044</code>\uFF0B\u305F\u3044<tr><td>Don't want to<td><code>\uFF5E\u3044</code>\uFF0B\u305F\u304F\u306A\u3044<tr><td>Let's do<br>Shall we...<td><code>~\u304A\u3046</code><br><code>~\u304A\u3046</code>\uFF0B\u304B<br><tr><td>Passive <small>to be ~ed</small> \u2747\uFE0F<td>Godan <code>~\u3042</code>\uFF0B\u308C\u308B<br>Ichidan <code>~\u3042</code>\uFF0B\u3089\u308C\u308B<br>\u3059\u308B \u2192 \u3055\u308C\u308B\u3001
\u304F\u308B \u2192 \u3053\u3089\u308C\u308B<tr><td>Causative <small>to allow, force someone to ~</small> \u2747\uFE0F<td>Godan <code>~\u3042</code>\uFF0B\u305B\u308B<br>Ichidan <code>~\u3042</code>\uFF0B\u3055\u305B\u308B<br>\u3059\u308B \u2192 \u3055\u305B\u308B\u3001
\u304F\u308B \u2192 \u3053\u3055\u305B\u308B</table><div class=checkbox__wrapper><input type=checkbox name=polite-examples checked disabled>
<label for=polite-examples>Show examples</label></div><h2>Kanji \u6F22\u5B57</h2><h3 id=kanji-anki-deck>My Anki deck \u{1F4BE}</h3><p>At the moment, I am utilizing the Basic Kanji Book (Vol. 1) to initiate with the most basic ones. After
finishing a lesson, I will add all the vocabulary found there. From time to time, this page will receive a
new updated version.</p>The .apkg file is hosted in the same repository as this site, you can <a href=./assets/basic-kanji-book-vol1.apkg download>download it from here</a>.<p class="footer centered__text"><small>The process of creating this site involved listening to a lot of silly playlists and Persona
soundtracks.
<a href=https://x.com/hamboorglar target=_blank rel="noopener noreferrer">Jordi</a></small></div><a href=https://github.com/izquiratops/japanese-cheat-sheet target=_blank rel="noopener noreferrer" title="Fork me on Github!" tabindex=-1><img src=github-mark.svg class=github__logo alt="Github logo">
</a><a class="icon__button jump" id=scroll-to-top title="Scroll to the top \u{1F998}" tabindex=-1><img src=scroll-to-top.svg alt="Scroll to top icon"></a>`;

  // ../src/components/body/style.css
  var style_default = 'h3{margin:0 0 12px}a{color:var(--toc-link-color);text-decoration:none;&.disabled { opacity: 0.3; pointer-events: none; }}code{font-family:Open Sans,sans-serif;text-wrap:nowrap;color:var(--contrast-font-color);background:var(--theme-color-1);border-radius:4px;padding:4px}table{position:relative;width:100%;margin-inline:auto;margin-block-end:var(--spacing-large);line-height:1.8;border-collapse:collapse;border-radius:var(--border-radius);outline:1px solid var(--theme-color-1);thead { color: var(--contrast-font-color); background-color: var(--theme-color-1); } tbody { tr:nth-child(odd) { background: var(--theme-color-3); } tr:nth-child(even) { background: var(--theme-color-2); } td { padding-inline: var(--spacing-small); padding-block: 4px; } } ::after { content: ""; position: absolute; left: var(--spacing-small); top: var(--spacing-small); z-index: -1; width: 100%; height: 100%; background: var(--theme-color-2); border-radius: var(--border-radius); }}small{color:#444;font-style:italic}hr{color:var(--theme-color-2);border-color:var(--theme-color-2);background-color:var(--theme-color-2)}.page__content{word-wrap:break-word;max-width:800px;margin:0 auto;padding:0 var(--spacing-medium)}.page__title{padding-block:var(--spacing-extra-large);line-height:1.2}.centered__text{text-align:center}.legend{position:relative;background-position:0 0;background-color:var(--theme-color-3);border:1px solid var(--theme-color-1);border-radius:var(--border-radius);margin:0;padding:var(--spacing-medium);overflow:hidden;max-height:80px;transition:max-height .25s ease-out;&.expanded { max-height: 900px; transition: max-height 0.25s ease-in; } .legend__symbol { display: inline-block; width: 2rem; }}.checkbox__wrapper{margin:var(--spacing-medium)}.icon__button{right:var(--spacing-small);width:var(--icon-size);height:var(--icon-size);&.jump { position: fixed; bottom: var(--spacing-small); } &.toggle { position: absolute; top: var(--spacing-small); } cursor: pointer;svg { padding: 6px; }}.columns__container{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));column-gap:var(--spacing-medium)}.footer{padding-block-end:70px}.github__logo{position:absolute;top:var(--spacing-medium);left:var(--spacing-medium);height:36px;width:36px;transform:rotate(-12deg);opacity:.7;transition:opacity .25s ease-out;&:hover { opacity:1.0; transition:opacity 0.25s ease-out; }}.jump{background-image:radial-gradient(50% 50% at 50% 50%,var(--theme-color-4) 0%,#FFFFFF00 100%)}@media screen and (max-width:600px){.github__logo{display:none}.page__title{padding:0}}';

  // ../src/components/body/index.js
  var Body = class extends HTMLElement {
    legendContainerElement = void 0;
    legendIconElements = void 0;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = body_default;
      StyleSheetUtils.adopt(this.shadowRoot, style_default);
      addEventListener("load", () => {
        this.legendContainerElement = this.shadowRoot.getElementById("legend");
        this.legendIconElements = this.legendContainerElement.getElementsByTagName("img");
        this.shadowRoot.getElementById("scroll-to-top").addEventListener("click", this.scrollToTop);
        this.shadowRoot.getElementById("toggle-legend").addEventListener("click", this.toggleLegend);
      });
    }
    scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    toggleLegend = () => {
      if (this.legendContainerElement.classList.contains("expanded")) {
        this.legendContainerElement.classList.remove("expanded");
        this.legendIconElements[0].classList.add("hidden");
        this.legendIconElements[1].classList.remove("hidden");
      } else {
        this.legendContainerElement.classList.add("expanded");
        this.legendIconElements[0].classList.remove("hidden");
        this.legendIconElements[1].classList.add("hidden");
      }
    };
  };

  // ../src/components/index.js
  customElements.define("site-body", Body);

  // ../src/main.js
  StyleSheetUtils.adopt(document, global_default);
  document.getElementById("bundle-anchor").innerHTML = `
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
})();
