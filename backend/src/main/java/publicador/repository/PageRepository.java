package publicador.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import publicador.model.Page;

public interface PageRepository extends MongoRepository<Page, String> {

}
