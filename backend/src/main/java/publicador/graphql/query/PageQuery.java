package publicador.graphql.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import publicador.model.Page;
import publicador.service.PageService;

@Component
public class PageQuery implements GraphQLQueryResolver {

	@Autowired
	private PageService pageService;

	public Page getPage(String id) {
		return this.pageService.getPage(id);
	}

	public List<Page> getPages() {
		return this.pageService.getPages();
	}
}
