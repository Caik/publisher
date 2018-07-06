package publicador.service;

import java.util.List;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.mongodb.DBRef;

import publicador.graphql.input.CreateHighlightInput;
import publicador.graphql.input.UpdateHighlightInput;
import publicador.model.Highlight;
import publicador.model.Page;
import publicador.repository.HighlightRepository;

@RemoteProxy
public class HighlightService {

	@Autowired
	private MongoOperations mongoTemplate;

	@Autowired
	private HighlightRepository highlightRepository;

	@Autowired
	private PageService pageService;

	@RemoteMethod
	public List<Highlight> getHighlights() {
		return this.highlightRepository.findAll();
	}

	@RemoteMethod
	public Highlight getHighlight(String id) {
		return this.highlightRepository.findById(id).orElse(null);
	}

	@RemoteMethod
	public Highlight create(CreateHighlightInput highlightInput) {
		Highlight highlight = new Highlight();
		Page page = this.pageService.getPage(highlightInput.getIdPage());

		highlight.setUri(highlightInput.getUri());
		highlight.setTitle(highlightInput.getTitle());
		highlight.setSubtitle(highlightInput.getSubtitle());
		highlight.setText(highlightInput.getText());
		highlight.setPage(page);

		highlight = this.highlightRepository.insert(highlight);

		this.pageService.addPageHighlight(page, highlight);

		return highlight;
	}

	@RemoteMethod
	public Highlight update(UpdateHighlightInput highlightInput) {
		Highlight highlight = this.getHighlight(highlightInput.getId());

		Page pageFrom = null;

		try {
			pageFrom = this.pageService.getPage(highlight.getPage().getId());
		} catch (Exception e) {
		}

		Page pageTo = this.pageService.getPage(highlightInput.getIdPage());

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

		return this.getHighlight(highlightInput.getId());
	}

	@RemoteMethod
	public boolean deletePage(String id) {
		Update update = new Update();
		update.pull("highlights", new DBRef("highlight", id));

		this.mongoTemplate.upsert(new Query(), update, Page.class);

		try {
			this.highlightRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

}
