import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Page } from '../graphql/page';
import { PagesService } from '../pages.service';

@Component({
	selector: 'app-pages-edit',
	templateUrl: './pages-edit.component.html',
	styleUrls: ['./pages-edit.component.css']
})
export class PagesEditComponent implements OnInit, OnDestroy {

	edit = false;
	page: Page;
	pageTitle = 'Nova Página';
	form: FormGroup;
	subscription: Subscription;
	showAlert = false;

	breadcrumb = [
		['Home', '/home'],
		['Páginas', '/pages'],
		['Nova Página', '/pages/edit']
	];

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private pagesService: PagesService,
		private router: Router) { }

	ngOnInit() {
		this.page = {
			id: '',
			title: '',
			url: '',
			highlights: []
		};

		if (this.route.snapshot.paramMap.get('id')) {
			this.edit = true;
			this.pageTitle = 'Editar Página';
			this.breadcrumb[this.breadcrumb.length - 1][0] = 'Editar Página';
			this.pagesService.getpage(this.route.snapshot.paramMap.get('id')).subscribe(result => this.initializeForm(result));
		}

		this.form = this.fb.group({
			title: [this.page.title, Validators.required],
			url: [this.page.url, Validators.required]
		});
	}

	initializeForm(result: Page) {
		this.page = result;

		this.form = this.fb.group({
			title: [this.page.title, Validators.required],
			url: [this.page.url, Validators.required]
		});
	}

	ngOnDestroy() {
		// tslint:disable-next-line:no-unused-expression
		this.subscription && this.subscription.unsubscribe();
	}

	onFormSubmit() {
		if (this.form.valid) {
			this.page = this.form.value;
			let obs;

			if (this.edit) {
				this.page.id = this.route.snapshot.paramMap.get('id');
				obs = this.pagesService.updatePage(this.page);
			} else {
				obs = this.pagesService.insertPage(this.page);
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

	redirectToList(): void {
		this.router.navigate(['/pages']);
	}

	getRequiredField(field: String): String {
		return `O campo '${field}' é obrigatório`;
	}

	get title(): AbstractControl {
		return this.form.get('title');
	}

	get url(): AbstractControl {
		return this.form.get('url');
	}

	get sucessMessage(): String {
		return `Página ${this.edit ? 'editada' : 'criada'} com sucesso!`;
	}

}
