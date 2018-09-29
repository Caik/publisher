import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import gql from 'graphql-tag';

import { Page } from './graphql/page';
import { Query } from './graphql/query';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PagesService {

	private dwrPSURL: String = `${environment.backendUrl}/dwr/jsonp/PageService/`;

	constructor(private apollo: Apollo, private http: HttpClient) { }

	public getPages(): Observable<Page[]> {
		if (environment.dwr) {
			return this.getPagesDWR();
		}

		return this.getPagesGraphQL();
	}

	public getPage(id: String): Observable<Page> {
		if (environment.dwr) {
			return this.getPageDWR(id);
		}

		return this.getPageGraphQL(id);
	}

	public deletePage(page: Page): Observable<Boolean> {
		if (environment.dwr) {
			return this.deletePageDWR(page);
		}

		return this.deletePageGraphQL(page);
	}

	public insertPage(page: Page): Observable<Page> {
		if (environment.dwr) {
			return this.insertPageDWR(page);
		}

		return this.insertPageGraphQL(page);
	}

	private insertPageGraphQL(page: Page): Observable<Page> {
		return this.apollo.mutate<Page>({
			mutation: gql`
				mutation CreatePage($input: CreatePageInput!) {
					createPage(input: $input) {
						id
					}
				}
			`,
			variables: {
				input: {
					...page
				}
			}
		}).pipe(map(result => result.data.createPage));
	}

	private insertPageDWR(page: Page): Observable<Page> {
		console.log(`${this.dwrPSURL}createPage/${this.mountURLParameter(page)}`);
		return this.http.get<Page>(`${this.dwrPSURL}createPage/${this.mountURLParameter(page)}`);
	}

	updatePage(page: Page): Observable<Page> {
		return this.apollo.mutate<Page>({
			mutation: gql`
				mutation UpdatePage($input: UpdatePageInput!) {
					updatePage(input: $input) {
						id
					}
				}
			`,
			variables: {
				input: {
					...page
				}
			}
		}).pipe(map(result => result.data.updatePage));
	}

	private getPagesGraphQL(): Observable<Page[]> {
		return this.apollo.watchQuery<Query>({
			query: gql`
				query allPages {
					getPages {
						id
						url
						title
						highlights {
							id
						}
					}
				}
			`,
			fetchResults: true,
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(map(result => result.data.getPages));
	}

	private getPagesDWR(): Observable<Page[]> {
		return this.http.get<Page[]>(`${this.dwrPSURL}getPages`);
	}

	private getPageGraphQL(id: String): Observable<Page> {
		return this.apollo.query<Query>({
			query: gql`
				query getPage($id: String!) {
					getPage(id: $id) {
						id
						title
						url
						highlights {
							id
							title
							subtitle
							text
							uri
						}
					}
				}
			`,
			variables: {
				id
			},
			fetchResults: true,
			fetchPolicy: 'network-only'
		}).pipe(map(result => result.data.getPage));
	}

	private getPageDWR(id: String): Observable<Page> {
		return this.http.get<Page>(`${this.dwrPSURL}getPage/${id}`);
	}

	private deletePageGraphQL(page: Page): Observable<Boolean> {
		return this.apollo.mutate<Boolean>({
			mutation: gql`
				mutation DeletePage($id: String!) {
					deletePage(id: $id)
				}
			`,
			variables: {
				id: page.id
			}
		}).pipe(map(result => result.data.deletePage));
	}

	private deletePageDWR(page: Page): Observable<Boolean> {
		return this.http.get<Boolean>(`${this.dwrPSURL}deletePage/${page.id}`);
	}


	private mountURLParameter(page: Page): string {
		let uri = '{';

		for (const key in page) {
			if (page.hasOwnProperty(key)) {
				uri += `${key}: ${page[key]}, `;
			}
		}

		uri = uri.replace(/, $/, '').replace(/\//gm, '**__**');
		uri += '}';

		return uri;
	}
}
