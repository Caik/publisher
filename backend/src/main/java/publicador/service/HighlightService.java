package publicador.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import publicador.graphql.input.CreateHighlightInput;
import publicador.graphql.input.UpdateHighlightInput;
import publicador.model.Highlight;
import publicador.repository.HighlightRepository;

@Service
public class HighlightService {

	@Autowired
	private HighlightRepository highlightRepository;

	@Autowired
	private PageService pageService;

	public Highlight create(CreateHighlightInput highlightInput) {
		Highlight highlight = new Highlight();

		highlight.setUri(highlightInput.getUri());
		highlight.setTitle(highlightInput.getTitle());
		highlight.setSubtitle(highlightInput.getSubtitle());
		highlight.setText(highlightInput.getText());
		highlight.setPage(this.pageService.findById(highlightInput.getIdPage()));

		return this.highlightRepository.insert(highlight);
	}

	public Highlight update(UpdateHighlightInput highlightInput) {
		Highlight highlight = new Highlight();

		highlight.setId(highlightInput.getId());
		highlight.setUri(highlightInput.getUri());
		highlight.setTitle(highlightInput.getTitle());
		highlight.setSubtitle(highlightInput.getSubtitle());
		highlight.setText(highlightInput.getText());
		highlight.setPage(this.pageService.findById(highlightInput.getIdPage()));

		return this.highlightRepository.save(highlight);
	}

	public boolean delete(String id) {
		try {
			this.highlightRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

}
