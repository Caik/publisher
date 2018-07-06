package publicador.graphql.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import publicador.model.Highlight;
import publicador.service.HighlightService;

@Component
public class HighlightQuery implements GraphQLQueryResolver {

	@Autowired
	private HighlightService highlightService;

	public Highlight getHighlight(String id) {
		return this.highlightService.getHighlight(id);
	}

	public List<Highlight> getHighlights() {
		return this.highlightService.getHighlights();
	}

}
