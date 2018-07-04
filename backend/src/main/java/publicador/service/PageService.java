package publicador.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mongodb.DBRef;

import publicador.graphql.input.CreatePageInput;
import publicador.graphql.input.UpdatePageInput;
import publicador.model.Highlight;
import publicador.model.Page;
import publicador.repository.HighlightRepository;
import publicador.repository.PageRepository;

@Service
public class PageService {

	@Autowired
	private MongoOperations mongoTemplate;

	@Autowired
	private PageRepository pageRepository;

	@Autowired
	private HighlightRepository highlightRepository;

	public Page create(CreatePageInput pageInput) {
		Page page = new Page();

		page.setUrl(pageInput.getUrl());
		page.setTitle(pageInput.getTitle());

		return this.pageRepository.insert(page);
	}

	public Page update(UpdatePageInput pageInput) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(pageInput.getId()));

		Update update = new Update();
		update.set("url", pageInput.getUrl());
		update.set("title", pageInput.getTitle());

		this.mongoTemplate.upsert(query, update, Page.class);

		return this.findById(pageInput.getId());
	}

	public Page addPageHighlight(Page page, Highlight highlight) {
		page = this.findById(page.getId());
		page.getHighlights().add(highlight);

		return this.pageRepository.save(page);
	}

	public Page removePageHighlight(Page page, Highlight highlight) {
		page.getHighlights().remove(highlight);

		return this.pageRepository.save(page);
	}

	public boolean delete(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("page").is(new DBRef("page", id)));

		Update update = new Update();
		update.set("page", null);

		this.mongoTemplate.upsert(query, update, Highlight.class);

		try {
			this.pageRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public Page findById(String id) {
		return this.pageRepository.findById(id).orElse(null);
	}

}
