package publicador.graphql.input;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

@DataTransferObject
public class UpdateHighlightInput {

	@RemoteProperty
	private String id;

	@RemoteProperty
	private String uri;

	@RemoteProperty
	private String title;

	@RemoteProperty
	private String subtitle;

	@RemoteProperty
	private String text;

	@RemoteProperty
	private String idPage;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIdPage() {
		return idPage;
	}

	public void setIdPage(String idPage) {
		this.idPage = idPage;
	}

}
