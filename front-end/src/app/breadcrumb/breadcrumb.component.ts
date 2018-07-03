import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

	@Input() title: String;

	@Input() breadcrumb: [String, String][];

	constructor() {
	}

	ngOnInit() {
	}

}
