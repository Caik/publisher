package publicador.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import publicador.graphql.input.CreateHighlightInput;
import publicador.graphql.input.UpdateHighlightInput;
import publicador.model.Highlight;
import publicador.repository.HighlightRepository;

@Service
public class HighlightService {

	@Autowired
	private MongoOperations mongoTemplate;

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
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(highlightInput.getId()));

		Update update = new Update();
		update.set("uri", highlightInput.getUri());
		update.set("title", highlightInput.getTitle());
		update.set("subtitle", highlightInput.getSubtitle());
		update.set("text", highlightInput.getText());
		update.set("page", this.pageService.findById(highlightInput.getIdPage()));

		this.mongoTemplate.upsert(query, update, Highlight.class);

		return this.findById(highlightInput.getId());
	}

	public boolean delete(String id) {
		try {
			this.highlightRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public Highlight findById(String idHighlight) {
		return this.highlightRepository.findById(idHighlight).orElse(null);
	}

}
