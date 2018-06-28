package publicador.graphql.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import publicador.model.Highlight;
import publicador.repository.HighlightRepository;

@Component
public class HighlightQuery implements GraphQLQueryResolver {

	@Autowired
	private HighlightRepository highlightRepository;

	public Highlight getHighlight(String id) {
		return this.highlightRepository.findById(id).orElse(null);
	}

	public List<Highlight> getHighlights() {
		return this.highlightRepository.findAll();
	}

	public List<Highlight> getHighlightsByPage(String idPage) {
		return this.highlightRepository.findByPageId(idPage);
	}

}
