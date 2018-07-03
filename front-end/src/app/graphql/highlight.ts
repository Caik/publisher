import { Page } from './page';

export interface Highlight {
	id: string;
	uri: string;
	title: string;
	subtitle: string;
	text: string;
	page: Page;
}
