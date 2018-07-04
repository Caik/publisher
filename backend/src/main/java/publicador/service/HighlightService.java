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
import publicador.model.Page;
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
		Page page = this.pageService.findById(highlightInput.getIdPage());

		highlight.setUri(highlightInput.getUri());
		highlight.setTitle(highlightInput.getTitle());
		highlight.setSubtitle(highlightInput.getSubtitle());
		highlight.setText(highlightInput.getText());
		highlight.setPage(page);

		highlight = this.highlightRepository.insert(highlight);

		this.pageService.addPageHighlight(page, highlight);

		return highlight;
	}

	public Highlight update(UpdateHighlightInput highlightInput) {
		Highlight highlight = this.findById(highlightInput.getId());

		Page pageTo = this.pageService.findById(highlightInput.getIdPage());
		Page pageFrom = this.pageService.findById(highlight.getPage().getId());

		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(highlightInput.getId()));

		Update update = new Update();
		update.set("uri", highlightInput.getUri());
		update.set("title", highlightInput.getTitle());
		update.set("subtitle", highlightInput.getSubtitle());
		update.set("text", highlightInput.getText());
		update.set("page", pageTo);

		this.mongoTemplate.upsert(query, update, Highlight.class);

		if (pageFrom != null) {
			this.pageService.removePageHighlight(pageFrom, highlight);
		}

		if (pageTo != null) {
			this.pageService.addPageHighlight(pageTo, highlight);
		}

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
