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
		return "teste";
	}

	@Override
	public MongoClient mongoClient() {
		return new MongoClient();
	}

}
