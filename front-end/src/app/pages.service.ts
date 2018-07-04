import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Page } from './graphql/page';
import { Query } from './graphql/query';

@Injectable({
	providedIn: 'root'
})
export class PagesService {

	constructor(private apollo: Apollo) { }

	getPagesList(): Observable<Page[]> {
		return this.apollo.watchQuery<Query>({
			query: gql`
				query allPages {
					getPages {
						id
						url
						title
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
		console.log(page);
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

}
