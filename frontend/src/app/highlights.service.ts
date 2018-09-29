import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Query } from './graphql/query';
import { Highlight } from './graphql/highlight';
import { environment } from '../environments/environment';
import { Page } from './graphql/page';

@Injectable({
	providedIn: 'root'
})
export class HighlightsService {

	private dwrHSURL: String = `${environment.backendUrl}/dwr/jsonp/HighlightService/`;

	private dwrPSURL: String = `${environment.backendUrl}/dwr/jsonp/PageService/`;

	constructor(private apollo: Apollo, private http: HttpClient) { }

	public getHighlights(): Observable<Highlight[]> {
		if (environment.dwr) {
			return this.getHighlightsDWR();
		}

		return this.getHighlightsGraphQL();
	}

	public getHighlight(id: String): Observable<Highlight> {
		if (environment.dwr) {
			return this.getHighlightDWR(id);
		}

		return this.getHighlightGraphQL(id);
	}

	public deleteHighlight(highlight: Highlight): Observable<Boolean> {
		if (environment.dwr) {
			return this.deleteHighlightDWR(highlight);
		}

		return this.deleteHighlightGraphQL(highlight);
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

	private getHighlightsGraphQL(): Observable<Highlight[]> {
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

	private getHighlightsDWR(): Observable<Highlight[]> {
		return this.http.get<Highlight[]>(`${this.dwrHSURL}getHighlights`)
			.pipe(map(hls => hls.map(hl => {
				this.http.get<Page>(`${this.dwrPSURL}getPageFromHighlightId/${hl.id}`)
					.subscribe(page => hl.page = page);
				return hl;
			})));
	}

	private getHighlightGraphQL(id: String): Observable<Highlight> {
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

	private getHighlightDWR(id: String): Observable<Highlight> {
		return this.http.get<Highlight>(`${this.dwrHSURL}getHighlight/${id}`).pipe(flatMap(hl => {
			return this.http.get<Page>(`${this.dwrPSURL}getPageFromHighlightId/${hl.id}`).pipe(map(page => {
				hl.page = page;
				return hl;
			}));
		}));
	}

	private deleteHighlightGraphQL(highlight: Highlight): Observable<Boolean> {
		return this.http.get<Boolean>(`${this.dwrHSURL}deleteHighlight/${highlight.id}`);
	}

	private deleteHighlightDWR(highlight: Highlight): Observable<Boolean> {
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
