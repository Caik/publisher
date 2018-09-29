import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PagesService } from '../pages.service';
import { Page } from '../graphql/page';

@Component({
	selector: 'app-pages-view',
	templateUrl: './pages-view.component.html',
	styleUrls: ['./pages-view.component.css']
})
export class PagesViewComponent implements OnInit {

	title = 'Visualizar Página';
	page: Page;

	breadcrumb = [
		['Home', '/home'],
		['Páginas', '/pages'],
		['Visualizar Página', '/pages/view']
	];

	constructor(
		private route: ActivatedRoute, private pagesService: PagesService) { }

	ngOnInit() {
		this.pagesService.getPage(this.route.snapshot.paramMap.get('id')).subscribe(result => this.page = result);
	}

}
