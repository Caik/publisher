import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Page } from '../graphql/page';
import { PagesService } from '../pages.service';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

	title = 'Páginas';

	pages: Observable<Page[]>;

	breadcrumb = [
		['Home', '/home'],
		['Páginas', '/pages']
	];

	constructor(private pagesService: PagesService, private modalService: NgbModal) {
	}

	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
		}, (reason) => {
		});
	}

	ngOnInit() {
		this.pages = this.pagesService.getPagesList();
	}

}
