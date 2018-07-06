package publicador.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource("classpath:dwr-spring-config.xml")
public class SpringBootDwrServletRegister {

	@Bean
	public ServletRegistrationBean registDwrServlet(SpringDwrServlet springDwrServlet) {
		ServletRegistrationBean servletRegister = new ServletRegistrationBean(springDwrServlet, "/dwr/*");
		Map<String, String> initParameters = new HashMap<String, String>();
		initParameters.put("debug", "true");
		servletRegister.setInitParameters(initParameters);
		return servletRegister;
	}
}
