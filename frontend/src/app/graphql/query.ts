import { Page } from './page';
import { Highlight } from './highlight';

export interface Query {
	getPages: Page[];
	getHighlights: Highlight[];

	getPage: Page;
	getHighlight: Highlight;
	getHighlightsByPage: Highlight[];
}
