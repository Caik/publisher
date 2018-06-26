export class Highlight {
	private _title: string;

	private _subtitle: string;

	private _text: string;

	private _uri: string;

	private _idPage: string;

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get subtitle(): string {
		return this._subtitle;
	}

	public set subtitle(value: string) {
		this._subtitle = value;
	}

	public get text(): string {
		return this._text;
	}

	public set text(value: string) {
		this._text = value;
	}

	public get uri(): string {
		return this._uri;
	}

	public set uri(value: string) {
		this._uri = value;
	}

	public get idPage(): string {
		return this._idPage;
	}

	public set idPage(value: string) {
		this._idPage = value;
	}
}
