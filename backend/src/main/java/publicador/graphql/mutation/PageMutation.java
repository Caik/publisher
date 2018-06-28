package publicador.graphql.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;

import publicador.graphql.input.CreatePageInput;
import publicador.graphql.input.UpdatePageInput;
import publicador.model.Page;
import publicador.service.PageService;

@Component
public class PageMutation implements GraphQLMutationResolver {

	@Autowired
	private PageService pageService;

	public Page createPage(CreatePageInput pageInput) {
		return this.pageService.create(pageInput);
	}

	public Page updatePage(UpdatePageInput pageInput) {
		return this.pageService.update(pageInput);
	}

	public boolean deletePage(String id) {
		return this.pageService.delete(id);
	}
}
