package publicador.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource("classpath:dwr-spring-config.xml")
public class SpringBootDwrServletRegister {

	@Bean
	public ServletRegistrationBean<SpringDwrServlet> registDwrServlet(SpringDwrServlet springDwrServlet) {
		ServletRegistrationBean<SpringDwrServlet> servletRegister = new ServletRegistrationBean<SpringDwrServlet>(
				springDwrServlet, "/dwr/*");

		Map<String, String> initParameters = new HashMap<String, String>();
		initParameters.put("debug", "true");
		initParameters.put("jsonpEnabled", "true");

		servletRegister.setInitParameters(initParameters);

		return servletRegister;
	}

	@Bean
	public FilterRegistrationBean<Filter> someFilterRegistration() {
		FilterRegistrationBean<Filter> registration = new FilterRegistrationBean<Filter>();
		registration.setFilter(new Filter() {

			@Override
			public void init(FilterConfig filterConfig) throws ServletException {

			}

			@Override
			public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
					throws IOException, ServletException {
				HttpServletResponse res = (HttpServletResponse) response;
				HttpServletRequest req = (HttpServletRequest) request;

				res.addHeader("Access-Control-Allow-Origin", "*");

				if (req.getMethod().equals("OPTIONS")) {
					res.setStatus(HttpServletResponse.SC_OK);
					return;
				}

				chain.doFilter(request, response);
			}

			@Override
			public void destroy() {
			}

		});
		registration.addUrlPatterns("/dwr/*");
		registration.setName("corsFilter");
		registration.setOrder(2);

		return registration;
	}
}
