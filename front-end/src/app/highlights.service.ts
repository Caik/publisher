import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Query } from './graphql/query';
import { Highlight } from './graphql/highlight';

@Injectable({
	providedIn: 'root'
})
export class HighlightsService {

	constructor(private apollo: Apollo) { }

	getHighlights(): Observable<Highlight[]> {
		return this.apollo.watchQuery<Query>({
			query: gql`
				query allHighlights {
					getHighlights {
						id
						title
						uri
						subtitle
						page {
							id
							title
						}
					}
				}
			`,
			fetchResults: true,
			fetchPolicy: 'network-only'
		}).valueChanges
			.pipe(map(result => result.data.getHighlights));
	}

	getHighlight(id: String): Observable<Highlight> {
		return this.apollo.query<Query>({
			query: gql`
				query getHighlight($id: String!) {
					getHighlight(id: $id) {
						id
						title
						subtitle
						uri
						text
						page {
							id
							url
							title
						}
					}
				}
			`,
			variables: {
				id
			},
			fetchResults: true,
			fetchPolicy: 'network-only'
		}).pipe(map(result => result.data.getHighlight));
	}

	insertHighligth(highlight: Highlight): Observable<Highlight> {
		return this.apollo.mutate<Highlight>({
			mutation: gql`
				mutation CreateHighlight($input: CreateHighlightInput!) {
					createHighlight(input: $input) {
						id
					}
				}
			`,
			variables: {
				input: {
					uri: highlight.uri,
					title: highlight.title,
					subtitle: highlight.subtitle,
					text: highlight.text,
					idPage: highlight.page.id
				}
			}
		}).pipe(map(result => result.data.createHighlight));
	}

	updateHighlight(highlight: Highlight): Observable<Highlight> {
		return this.apollo.mutate<Highlight>({
			mutation: gql`
				mutation UpdateHighlight($input: UpdateHighlightInput!) {
					updateHighlight(input: $input) {
						id
					}
				}
			`,
			variables: {
				input: {
					id: highlight.id,
					uri: highlight.uri,
					title: highlight.title,
					subtitle: highlight.subtitle,
					text: highlight.text,
					idPage: highlight.page.id
				}
			}
		}).pipe(map(result => result.data.updateHighlight));
	}

	deleteHighlight(highlight: Highlight): Observable<Boolean> {
		return this.apollo.mutate<Boolean>({
			mutation: gql`
				mutation DeleteHighlight($id: String!) {
					deleteHighlight(id: $id)
				}
			`,
			variables: {
				id: highlight.id
			}
		}).pipe(map(result => result.data.deleteHighlight));
	}

}
