import { SwappableTable } from '../components/swappable-table';
import { Body } from './body';
import { Conjugations } from './conjugations';
import { InformalVerbs } from './informal-verbs';
import { KanjiAnki } from './kanji-anki';
import { PoliteVerbs } from './polite-verbs';
import { Toc } from './toc';

// Views
// Not used. customElements.define('site-legend', Legend);
customElements.define('site-body', Body);
customElements.define('site-conjugations', Conjugations);
customElements.define('site-informal-verbs', InformalVerbs);
customElements.define('site-kanji-anki', KanjiAnki);
customElements.define('site-polite-verbs', PoliteVerbs);
customElements.define('site-toc', Toc);

// Components
customElements.define("swappable-table", SwappableTable);