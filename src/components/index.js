import { Body } from './body';
import { Conjugations } from './conjugations';
import { InformalVerbs } from './informal-verbs';
import { KanjiAnki } from './kanji-anki';
import { Legend } from './legend';
import { PoliteVerbs } from './polite-verbs';
import { Toc } from './toc';

customElements.define('site-body', Body);
customElements.define('site-legend', Legend);
customElements.define('site-toc', Toc);
customElements.define('site-conjugations', Conjugations);
customElements.define('site-informal-verbs', InformalVerbs);
customElements.define('site-polite-verbs', PoliteVerbs);
customElements.define('site-kanji-anki', KanjiAnki);