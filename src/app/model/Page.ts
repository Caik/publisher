export class Page {
	private _url: string;

	private _title: string;

	public get url(): string {
		return this._url;
	}

	public set url(value: string) {
		this._url = value;
	}

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

}
