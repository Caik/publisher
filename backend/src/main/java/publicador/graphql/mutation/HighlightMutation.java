package publicador.graphql.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;

import publicador.graphql.input.CreateHighlightInput;
import publicador.graphql.input.UpdateHighlightInput;
import publicador.model.Highlight;
import publicador.service.HighlightService;

@Component
public class HighlightMutation implements GraphQLMutationResolver {

	@Autowired
	private HighlightService highlightService;

	public Highlight createHighlight(CreateHighlightInput highlightInput) {
		return this.highlightService.create(highlightInput);
	}

	public Highlight updateHighlight(UpdateHighlightInput highlightInput) {
		return this.highlightService.update(highlightInput);
	}

	public boolean deleteHighlight(String id) {
		return this.highlightService.deleteHighlight(id);
	}

}
