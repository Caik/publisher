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
	pageToExclude: Page;
	showAlert: Boolean = false;

	breadcrumb = [
		['Home', '/home'],
		['Páginas', '/pages']
	];

	constructor(private pagesService: PagesService, private modalService: NgbModal) { }

	openDeleteModal(content, page) {
		this.pageToExclude = page;
		this.modalService.open(content, { centered: true }).result
			.then((deleteFlg) => {
				if (deleteFlg) {
					this.deletePage(page);
				}
			}, () => { });
	}

	deletePage(page: Page) {
		// Chamar service
		this.pagesService.deletePage(page).subscribe(() => {
			this.showAlert = true;
			this.pages = this.pagesService.getPagesList();
			this.pageToExclude = null;

			setTimeout(() => {
				this.showAlert = false;
			}, 2000);
		});
	}

	ngOnInit() {
		this.pages = this.pagesService.getPagesList();
	}

	get sucessMessage(): String {
		return `Página excluida com sucesso!`;
	}

}
