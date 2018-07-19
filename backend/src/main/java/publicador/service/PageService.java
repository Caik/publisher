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

import publicador.graphql.input.CreatePageInput;
import publicador.graphql.input.UpdatePageInput;
import publicador.model.Highlight;
import publicador.model.Page;
import publicador.repository.PageRepository;

@RemoteProxy
public class PageService {

	@Autowired
	private MongoOperations mongoTemplate;

	@Autowired
	private PageRepository pageRepository;

	@RemoteMethod
	public List<Page> getPages() {
		return this.pageRepository.findAll();
	}

	@RemoteMethod
	public Page getPage(String id) {
		return this.pageRepository.findById(id).orElse(null);
	}

	@RemoteMethod
	public Page createPage(CreatePageInput pageInput) {
		Page page = new Page();

		page.setUrl(pageInput.getUrl().replace("**__**", "/"));
		page.setTitle(pageInput.getTitle());

		return this.pageRepository.insert(page);
	}

	@RemoteMethod
	public Page updatePage(UpdatePageInput pageInput) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(pageInput.getId()));

		Update update = new Update();
		update.set("url", pageInput.getUrl());
		update.set("title", pageInput.getTitle());

		this.mongoTemplate.upsert(query, update, Page.class);

		return this.getPage(pageInput.getId());
	}

	@RemoteMethod
	public boolean deletePage(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("page").is(new DBRef("page", id)));

		Update update = new Update();
		update.set("page", null);

		// TODO Arrumar isso, ta inserindo sem ter ngm
		this.mongoTemplate.upsert(query, update, Highlight.class);

		try {
			this.pageRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public Page addPageHighlight(Page page, Highlight highlight) {
		page = this.getPage(page.getId());
		page.getHighlights().add(highlight);

		return this.pageRepository.save(page);
	}

	public Page removePageHighlight(Page page, Highlight highlight) {
		page.getHighlights().remove(highlight);

		return this.pageRepository.save(page);
	}

	@RemoteMethod
	public Page getPageFromHighlightId(String idHighlight) {
		Query query = new Query();
		query.addCriteria(Criteria.where("highlights").is(new DBRef("highlight", idHighlight)));

		return this.mongoTemplate.findOne(query, Page.class);
	}

}
