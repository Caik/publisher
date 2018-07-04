import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Highlight } from '../graphql/highlight';
import { HighlightsService } from '../highlights.service';
import { PagesService } from '../pages.service';
import { Page } from '../graphql/page';

@Component({
	selector: 'app-highlights-edit',
	templateUrl: './highlights-edit.component.html',
	styleUrls: ['./highlights-edit.component.css']
})
export class HighlightsEditComponent implements OnInit, OnDestroy {

	edit = false;
	highlight: Highlight;
	pageTitle = 'Novo Destaque';
	form: FormGroup;
	subscription: Subscription;
	showAlert = false;
	pages: Observable<Page[]>;

	breadcrumb = [
		['Home', '/home'],
		['Destaques', '/highlights'],
		['Novo Destaque', '/highlights/edit']
	];

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private hlService: HighlightsService,
		private pagesService: PagesService,
		private router: Router
	) { }

	ngOnInit() {
		this.pages = this.pagesService.getPagesList();

		if (this.route.snapshot.paramMap.get('id')) {
			this.edit = true;
			this.pageTitle = 'Editar Destaque';
			this.breadcrumb[this.breadcrumb.length - 1][0] = 'Editar Destaque';
			this.hlService.getHighlight(this.route.snapshot.paramMap.get('id')).subscribe(result => this.initializeForm(result));
		}

		this.initializeForm({
			id: '',
			title: '',
			subtitle: '',
			uri: '',
			text: '',
			page: null
		});
	}

	initializeForm(result: Highlight) {
		this.highlight = result;

		this.form = this.fb.group({
			title: [this.highlight.title, Validators.required],
			subtitle: [this.highlight.subtitle, Validators.required],
			uri: [this.highlight.uri, Validators.required],
			text: [this.highlight.text, Validators.required],
			page: [this.highlight.page, Validators.required]
		});
	}

	ngOnDestroy() {
		// tslint:disable-next-line:no-unused-expression
		this.subscription && this.subscription.unsubscribe();
	}

	onFormSubmit() {
		if (this.form.valid) {
			this.highlight = this.form.value;

			let obs;

			if (this.edit) {
				this.highlight.id = this.route.snapshot.paramMap.get('id');
				obs = this.hlService.updateHighlight(this.highlight);
			} else {
				obs = this.hlService.insertHighligth(this.highlight);
			}

			this.subscription = obs.subscribe(() => {
				this.showAlert = true;
				setTimeout(() => {
					this.showAlert = false;
					this.redirectToList();
				}, 2000);
			});
		}
	}

	compare(p1: Page, p2: Page): Boolean {
		return p1 && p2 && (p1.id === p2.id);
	}

	redirectToList(): void {
		this.router.navigate(['/highlights']);
	}

	getRequiredField(field: String): String {
		return `O campo '${field}' é obrigatório`;
	}

	get title(): AbstractControl {
		return this.form.get('title');
	}

	get subtitle(): AbstractControl {
		return this.form.get('subtitle');
	}

	get text(): AbstractControl {
		return this.form.get('text');
	}

	get page(): AbstractControl {
		return this.form.get('page');
	}

	get uri(): AbstractControl {
		return this.form.get('uri');
	}

	get sucessMessage(): String {
		return `Destaque ${this.edit ? 'editado' : 'criado'} com sucesso!`;
	}
}
