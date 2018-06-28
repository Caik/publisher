package publicador.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import publicador.model.Highlight;

public interface HighlightRepository extends MongoRepository<Highlight, String> {

	public List<Highlight> findByPageId(String idPage);

}
