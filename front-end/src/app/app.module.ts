import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HighligthsComponent } from './highligths/highligths.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HighlightsEditComponent } from './highlights-edit/highlights-edit.component';
import { PagesComponent } from './pages/pages.component';
import { PagesEditComponent } from './pages-edit/pages-edit.component';
import { PagesViewComponent } from './pages-view/pages-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesService } from './pages.service';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },

	{ path: 'pages', component: PagesComponent },
	{ path: 'pages/edit', component: PagesEditComponent },
	{ path: 'pages/edit/:id', component: PagesEditComponent },
	{ path: 'pages/view/:id', component: PagesViewComponent },

	{ path: 'highlights', component: HighligthsComponent },
	{ path: 'highlights/edit', component: HighlightsEditComponent },
	{ path: 'highlights/edit/:id', component: HighlightsEditComponent },

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SidebarComponent,
		BreadcrumbComponent,
		HomeComponent,

		PagesComponent,
		PagesEditComponent,
		PagesViewComponent,

		HighligthsComponent,
		HighlightsEditComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		RouterModule.forRoot(
			appRoutes
		),
		HttpClientModule,
		ApolloModule,
		HttpLinkModule,
		ReactiveFormsModule
	],
	providers: [
		PagesService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(apollo: Apollo, httpLink: HttpLink) {
		apollo.create({
			link: httpLink.create({ uri: `${this.getURL()}` }),
			cache: new InMemoryCache()
		});
	}

	getURL(): String {
		return `${environment.backendUrl}/graphql`;
	}
}
