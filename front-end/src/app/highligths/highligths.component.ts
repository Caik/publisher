import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Query } from '../graphql/query';

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

	breadcrumb = [
		['Home', '/home'],
		['Destaques', '/highlights']
	];

	constructor(private apollo: Apollo, private hlService: HighlightsService) { }

	ngOnInit() {
		this.highlights = this.hlService.getHighlights();
	}

}
