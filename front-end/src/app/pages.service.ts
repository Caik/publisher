import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Page } from './graphql/page';
import { Query } from './graphql/query';

@Injectable({
	providedIn: 'root'
})
export class PagesService {

	constructor(private apollo: Apollo) { }

	getPages(): Observable<Page[]> {
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

	getPage(id: String): Observable<Page> {
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

	insertPage(page: Page): Observable<Page> {
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

	deletePage(page: Page): Observable<Boolean> {
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

}
