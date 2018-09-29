package publicador.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.MongoClient;

@Configuration
@EnableMongoRepositories(basePackages = "publicador.repository")
public class MongoDBConfiguration extends AbstractMongoConfiguration {

	@Override
	protected String getDatabaseName() {
		if (System.getenv("DB_DATABASE_NAME") == null) {
			return "publicador";
		}

		return System.getenv("DB_DATABASE_NAME");
	}

	@Override
	public MongoClient mongoClient() {
		if (System.getenv("DB_CONTAINER_HOST") == null) {
			return new MongoClient();
		}

		return new MongoClient(System.getenv("DB_CONTAINER_HOST"));
	}

}
