import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Highlight } from '../graphql/highlight';
import { HighlightsService } from '../highlights.service';

@Component({
	selector: 'app-highligths',
	templateUrl: './highligths.component.html',
	styleUrls: ['./highligths.component.css']
})
export class HighligthsComponent implements OnInit {

	title = 'Destaques';
	highlights: Observable<Highlight[]>;
	highlightToExclude: Highlight;
	showAlert: Boolean = false;

	breadcrumb = [
		['Home', '/home'],
		['Destaques', '/highlights']
	];

	constructor(private hlService: HighlightsService, private modalService: NgbModal) { }

	ngOnInit() {
		this.highlights = this.hlService.getHighlights();
	}

	openDeleteModal(content, highlight) {
		this.highlightToExclude = highlight;
		this.modalService.open(content, { centered: true }).result
			.then((deleteFlg) => {
				if (deleteFlg) {
					this.deleteHighlight(highlight);
				}
			}, () => { });
	}

	deleteHighlight(highlight: Highlight) {
		this.hlService.deleteHighlight(highlight).subscribe(() => {
			this.showAlert = true;
			this.highlights = this.hlService.getHighlights();
			this.highlightToExclude = null;

			setTimeout(() => {
				this.showAlert = false;
			}, 2000);
		});
	}

	get sucessMessage(): String {
		return `Destaque excluido com sucesso!`;
	}
}
