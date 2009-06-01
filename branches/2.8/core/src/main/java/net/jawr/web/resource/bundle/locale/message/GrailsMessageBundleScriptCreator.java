package net.jawr.web.resource.bundle.locale.message;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;
import java.util.Set;

import net.jawr.web.resource.bundle.generator.GeneratorContext;
import net.jawr.web.resource.bundle.locale.ResourceBundleMessagesGenerator;

import org.apache.log4j.Logger;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.context.support.ServletContextResourceLoader;

/**
 * This is a specialized subclass of MessageBundleScriptCreator that takes in account the 
 * special scheme used by grails to manage message bundles. Said speciality comes from the 
 * fact that the applications get deployed differently in development mode and production 
 * mode (run-app vs run-war), and message properties go to different places each time. 
 * Besides, a regular ResourceBundle cannot be used since the encoding is 'fixed' by grails 
 * to avoid users the pain of encoding special characters in the properties files. Therefore
 * Spring's MessageSource implementations are used to actually access the messages.  
 * 
 * @author Jordi Hern�ndez Sell�s
 */
public class GrailsMessageBundleScriptCreator extends MessageBundleScriptCreator{
	private static final String PROPERTIES_DIR = "/WEB-INF/grails-app/i18n/";
	private static final String PROPERTIES_EXT =".properties";
	
	private static final Logger log = Logger.getLogger(GrailsMessageBundleScriptCreator.class);
	private static final String PROJECT_RESOURCES_DIR = "grails.project.resource.dir"; // Copied from grails, to avoid unneeded dependency
	public GrailsMessageBundleScriptCreator(GeneratorContext context) {
		super(context);
		if(log.isDebugEnabled())
			log.debug("Using Grails i18n messages generator.");
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.locale.message.MessageBundleScriptCreator#createScript(java.nio.charset.Charset)
	 */
	public Reader createScript(Charset charset) {
		
		// Determine wether this is run-app or run-war style of runtime. 
		boolean warDeployed = ((Boolean)this.servletContext.getAttribute(ResourceBundleMessagesGenerator.GRAILS_WAR_DEPLOYED)).booleanValue();
		
		// Spring message bundle object, the same used by grails. 
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setFallbackToSystemLocale(false);
		Set allPropertyNames = null;
		
		// Read the properties files to find out the available message keys. It is done differently 
		// for run-app or run-war style of runtimes. 
		if(warDeployed){
			allPropertyNames = getPropertyNamesFromWar();
			if(log.isDebugEnabled())
				log.debug("found a total of " + allPropertyNames.size() + " distinct message keys.");
			messageSource.setResourceLoader(new ServletContextResourceLoader(this.servletContext));
			messageSource.setBasename(PROPERTIES_DIR + configParam.substring(configParam.lastIndexOf('.')+1));
		}
		else
		{
			ResourceBundle bundle;
			if(null != locale)
				bundle = ResourceBundle.getBundle(configParam,locale);
			else bundle = ResourceBundle.getBundle(configParam);
			allPropertyNames = new HashSet();
			Enumeration keys = bundle.getKeys();
			while(keys.hasMoreElements())
				allPropertyNames.add(keys.nextElement());
			String basename = "file:" + System.getProperty(PROJECT_RESOURCES_DIR) + "/" + configParam.replaceAll("\\.", "/");
			messageSource.setBasename(basename);
		}		
		
		// Pass all messages to a properties file. 
		Properties props = new Properties();
		for(Iterator it = allPropertyNames.iterator();it.hasNext();) {
			String key = (String) it.next();
			if(matchesFilter(key)){
				try {
					String msg = messageSource.getMessage(key, new Object[0], locale);
					props.put(key, msg);
				} catch (NoSuchMessageException e) {
					// This is expected, so it's OK to have an empty catch block. 
					if(log.isDebugEnabled())
						log.debug("Message key [" + key + "] not found.");
				}
			}
		}
		
		return doCreateScript(props);
	}

	/**
	 * Reads the property names of the resourcebundle for the current locale from the war file. 
	 * @return
	 */
	private Set getPropertyNamesFromWar() {
		Set filenames = this.servletContext.getResourcePaths(PROPERTIES_DIR);
		Set allPropertyNames = new HashSet();

		for(Iterator it = filenames.iterator();it.hasNext();){
			String name = (String) it.next();
			if(matchesConfigParam(name)) {
				try {
					Properties props = new Properties(); 
					props.load(servletContext.getResourceAsStream(name));
					if(log.isDebugEnabled())
						log.debug("Found " + props.keySet().size() + " message keys at " + name + ".");
					allPropertyNames.addAll(props.keySet());
				} catch (IOException e) {
					throw new RuntimeException("Unexpected error retrieving i18n grails properties file", e);
				}
			}			
		}
		return allPropertyNames;
	}

	/**
	 * Determines if a file found at the locale directory matches the locale for the bundle. 
	 * 
	 * @param fileName
	 * @return
	 */
	private boolean matchesConfigParam(String fileName){
		String configValue = configParam.substring(configParam.lastIndexOf('.')+1);
		String fileNameWOPath = fileName.substring(fileName.lastIndexOf('/') + 1 );
		
		// List all the names of files which might have values used by the current locale
		List allowedNames = new ArrayList(4);
		allowedNames.add(configValue + PROPERTIES_EXT);
		if(null != locale) {
			allowedNames.add(configValue + "_" + locale.getLanguage() + PROPERTIES_EXT);
			allowedNames.add(configValue + "_" + locale.getLanguage()+ "_" + locale.getCountry() + PROPERTIES_EXT);
			allowedNames.add(configValue + "_" + locale.getLanguage()+ "_" + locale.getCountry()+ "_" + locale.getVariant() + PROPERTIES_EXT);
		}
		return allowedNames.contains(fileNameWOPath);
	}
	
	
}
