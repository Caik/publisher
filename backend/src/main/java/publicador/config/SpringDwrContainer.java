package publicador.config;

import java.util.Map;

import org.directwebremoting.extend.ContainerConfigurationException;
import org.directwebremoting.spring.SpringContainer;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

public class SpringDwrContainer extends SpringContainer {

	@Override
	public void addParameter(String askFor, Object valueParam) throws ContainerConfigurationException {
		try {
			Class<?> clz = ClassUtils.forName(askFor, ClassUtils.getDefaultClassLoader());

			@SuppressWarnings("unchecked")
			Map<String, Object> beansOfType = (Map<String, Object>) ((ListableBeanFactory) beanFactory)
					.getBeansOfType(clz);

			if (beansOfType.isEmpty()) {
				super.addParameter(askFor, valueParam);
			} else if (beansOfType.size() > 1) {
				String key = StringUtils.uncapitalize(SpringDwrServlet.class.getSimpleName());
				if (beansOfType.containsKey(key)) {
					beans.put(askFor, beansOfType.get(key));
				} else {
					throw new ContainerConfigurationException("springservlet:" + key);
				}
			} else {
				beans.put(askFor, beansOfType.values().iterator().next());
			}
		} catch (ClassNotFoundException ex) {
			super.addParameter(askFor, valueParam);
		}

	}

}
