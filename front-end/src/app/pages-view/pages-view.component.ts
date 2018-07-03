import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pages-view',
	templateUrl: './pages-view.component.html',
	styleUrls: ['./pages-view.component.css']
})
export class PagesViewComponent implements OnInit {

	title = 'Visualizar Página';

	breadcrumb = [
		['Home', '/home'],
		['Páginas', '/pages'],
		['Visualizar Página', '/pages/view']
	];

	constructor() { }

	ngOnInit() {
	}

}
