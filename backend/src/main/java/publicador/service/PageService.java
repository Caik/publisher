package publicador.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import publicador.graphql.input.CreatePageInput;
import publicador.graphql.input.UpdatePageInput;
import publicador.model.Page;
import publicador.repository.PageRepository;

@Service
public class PageService {

	@Autowired
	private PageRepository pageRepository;

	public Page create(CreatePageInput pageInput) {
		Page page = new Page();

		page.setUrl(pageInput.getUrl());
		page.setTitle(pageInput.getTitle());

		return this.pageRepository.insert(page);
	}

	public Page update(UpdatePageInput pageInput) {
		Page page = new Page();

		page.setId(pageInput.getId());
		page.setUrl(pageInput.getUrl());
		page.setTitle(pageInput.getTitle());

		return this.pageRepository.save(page);
	}

	public boolean delete(String id) {
		try {
			this.pageRepository.deleteById(id);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public Page findById(String idPage) {
		return this.pageRepository.findById(idPage).orElse(null);
	}

}
