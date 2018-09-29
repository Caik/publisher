import { Highlight } from './highlight';

export interface Page {
	id: string;
	url: string;
	title: string;
	highlights: Highlight[];
}
