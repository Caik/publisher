package publicador.graphql.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import publicador.model.Page;
import publicador.repository.PageRepository;

@Component
public class PageQuery implements GraphQLQueryResolver {

	@Autowired
	private PageRepository pageRepository;

	public Page getPage(String id) {
		return this.pageRepository.findById(id).orElse(null);
	}

	public List<Page> getPages() {
		return this.pageRepository.findAll();
	}
}
