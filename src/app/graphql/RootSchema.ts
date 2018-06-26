import { Query, Schema } from "typegql";

@Schema()
export class RootSchema {
	@Query()
	public findProductById(id: number): string {
		return `olar`;
	}
}
