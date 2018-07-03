import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-highlights-edit',
	templateUrl: './highlights-edit.component.html',
	styleUrls: ['./highlights-edit.component.css']
})
export class HighlightsEditComponent implements OnInit {

	title = 'Novo Destaque';

	breadcrumb = [
		['Home', '/home'],
		['Destaques', '/highlights'],
		['Novo destaque', '/highlights/edit']
	];

	constructor() { }

	ngOnInit() {
	}

}
