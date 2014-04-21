/**
 * Copyright 2007-2009  Jordi Hern�ndez Sell�s, Ibrahim Chaehoi
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 * 
 * 	http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
package net.jawr.web.servlet;

import java.io.IOException;
import java.io.Reader;
import java.io.Serializable;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jawr.web.JawrConstant;
import net.jawr.web.config.JawrConfig;
import net.jawr.web.config.jmx.JmxUtils;
import net.jawr.web.context.ThreadLocalJawrContext;
import net.jawr.web.exception.BundleDependencyException;
import net.jawr.web.exception.DuplicateBundlePathException;
import net.jawr.web.exception.ResourceNotFoundException;
import net.jawr.web.resource.FileNameUtils;
import net.jawr.web.resource.ImageResourcesHandler;
import net.jawr.web.resource.bundle.IOUtils;
import net.jawr.web.resource.bundle.factory.PropertiesBasedBundlesHandlerFactory;
import net.jawr.web.resource.bundle.factory.PropsConfigPropertiesSource;
import net.jawr.web.resource.bundle.factory.util.ClassLoaderResourceUtils;
import net.jawr.web.resource.bundle.factory.util.ConfigChangeListener;
import net.jawr.web.resource.bundle.factory.util.ConfigChangeListenerThread;
import net.jawr.web.resource.bundle.factory.util.ConfigPropertiesSource;
import net.jawr.web.resource.bundle.factory.util.PathNormalizer;
import net.jawr.web.resource.bundle.factory.util.PropsFilePropertiesSource;
import net.jawr.web.resource.bundle.factory.util.ServletContextAware;
import net.jawr.web.resource.bundle.generator.GeneratorRegistry;
import net.jawr.web.resource.bundle.generator.ResourceGenerator;
import net.jawr.web.resource.bundle.handler.ClientSideHandlerScriptRequestHandler;
import net.jawr.web.resource.bundle.handler.ResourceBundlesHandler;
import net.jawr.web.resource.bundle.renderer.BundleRenderer;
import net.jawr.web.resource.handler.bundle.ResourceBundleHandler;
import net.jawr.web.resource.handler.bundle.ServletContextResourceBundleHandler;
import net.jawr.web.resource.handler.reader.ResourceReaderHandler;
import net.jawr.web.resource.handler.reader.ServletContextResourceReaderHandler;
import net.jawr.web.servlet.util.MIMETypesSupport;
import net.jawr.web.util.StringUtils;

import org.apache.log4j.Logger;

/**
 * Request handling class. Any jawr enabled servlet delegates to this class to handle requests.
 * 
 * @author Jordi Hern�ndez Sell�s
 * @author Ibrahim Chaehoi
 */
public class JawrRequestHandler implements ConfigChangeListener, Serializable {

	/** The serial version UID */
	private static final long serialVersionUID = 5762937687546882131L;

	/** The logger */
	private static final Logger log = Logger.getLogger(JawrRequestHandler.class);

	/** The cache control header parameter name */
	protected static final String CACHE_CONTROL_HEADER = "Cache-Control";
	
	/** The cache control parameter value */
	protected static final String CACHE_CONTROL_VALUE = "public, max-age=315360000, post-check=315360000, pre-check=315360000";
	
	/** The last-modified header parameter name */
	protected static final String LAST_MODIFIED_HEADER = "Last-Modified";
	
	/** The If-modified-since header parameter name */
	protected static final String IF_MODIFIED_SINCE_HEADER = "If-Modified-Since";
	
	/** The If-non-match-since header parameter name */
	protected static final String IF_NONE_MATCH_HEADER = "If-None-Match";
	
	/** The last-modified value */
	protected static final String LAST_MODIFIED_VALUE = "Sun, 06 Nov 2005 12:00:00 GMT";
	
	/** The ETag header parameter name */
	protected static final String ETAG_HEADER = "ETag";
	
	/** The ETag parameter value */
	protected static final String ETAG_VALUE = "2740050219";
	
	/** The expires header parameter name */
	protected static final String EXPIRES_HEADER = "Expires";

	/** The configuration property name for the reload interval */
	protected static final String CONFIG_RELOAD_INTERVAL = "jawr.config.reload.interval";
	
	/** The generation parameter */
	public static final String GENERATION_PARAM = "generationConfigParam";
	
	/** The client side request handler */
	public static final String CLIENTSIDE_HANDLER_REQ_PATH = "/jawr_loader.js";

	/** The generated image pattern */
	private static Pattern GENERATED_IMG_PATTERN = Pattern.compile("(url\\(([\"' ]*))(([a-zA-Z]+)(?! (http|data)):(/)?)([^\\)\"']*)([\"']?\\))");

	/** The URL separator pattern */
	private static Pattern URL_SEPARATOR_PATTERN = Pattern.compile("([^/]*)/");

	/** The pattern to go to the root */
	private static String ROOT_REPLACE_PATTERN = "../";

	/** The resource bundles handler */
	protected ResourceBundlesHandler bundlesHandler;
	
	/** The resource reader handler*/
	protected ResourceReaderHandler rsReaderHandler;
	
	/** The content type */
	protected String contentType;
	
	/** The resource type */
	protected String resourceType;
	
	/** The servlet context */
	protected ServletContext servletContext;
	
	/** The maps for the init-parameters */
	protected Map initParameters;
	
	/** The Thread which listen the configuration changes */
	protected ConfigChangeListenerThread configChangeListenerThread;
	
	/** The generator registry */
	protected GeneratorRegistry generatorRegistry;
	
	/** The jawr config */
	protected JawrConfig jawrConfig;
	
	/** The configuration properties source */
	protected ConfigPropertiesSource propertiesSource;
	
	/** The client-side script request handler */
	protected ClientSideHandlerScriptRequestHandler clientSideScriptRequestHandler;

	/** The image MIME map, associating the image extension to their MIME type */
	protected Map imgMimeMap;
	
	/**
	 * Reads the properties file and initializes all configuration using the ServletConfig object. If applicable, a ConfigChangeListenerThread will be
	 * started to listen to changes in the properties configuration.
	 * 
	 * @param servletContext ServletContext
	 * @param servletConfig ServletConfig
	 * @throws ServletException if an exception occurs
	 */
	public JawrRequestHandler(ServletContext context, ServletConfig config) throws ServletException {
		this.initParameters = new HashMap();
		Enumeration params = config.getInitParameterNames();
		while (params.hasMoreElements()) {
			String param = (String) params.nextElement();
			initParameters.put(param, config.getInitParameter(param));
		}
		initParameters.put("handlerName", config.getServletName());

		if (log.isInfoEnabled())
			log.info("Initializing jawr config for servlet named " + config.getServletName());
		
		initRequestHandler(context, null);

	}

	/**
	 * Alternate constructor that does not need a ServletConfig object. Parameters normally read from it are read from the initParams Map, and the
	 * configProps are used instead of reading a .properties file.
	 * 
	 * @param servletContext ServletContext
	 * @param servletConfig ServletConfig
	 * @throws ServletException if an exception occurs
	 */
	public JawrRequestHandler(ServletContext context, Map initParams, Properties configProps) throws ServletException {

		this.imgMimeMap = MIMETypesSupport.getSupportedProperties(this);
		this.initParameters = initParams;
		initRequestHandler(context, configProps);
	}
	
	/**
	 * Initialize the request handler
	 * @param context the servlet context
	 * @param configProps the configuration properties
	 * @throws ServletException if an exception occurs
	 */
	private void initRequestHandler(ServletContext context, Properties configProps) throws ServletException {
		
		long initialTime = System.currentTimeMillis();
		if (log.isInfoEnabled())
			log.info("Initializing jawr config for request handler named " + getInitParameter("handlerName"));

		this.imgMimeMap = MIMETypesSupport.getSupportedProperties(this);
		this.servletContext = context;

		resourceType = getInitParameter("type");
		resourceType = null == resourceType ? "js" : resourceType;

		String configLocation = getInitParameter("configLocation");
		String configPropsSourceClass = getInitParameter("configPropertiesSourceClass");
		if (null == configLocation && null == configPropsSourceClass)
			throw new ServletException("Neither configLocation nor configPropertiesSourceClass init params were set."
					+ " You must set at least the configLocation param. Please check your web.xml file");

		// Initialize the config properties source that will provide with all configuration options.
		ConfigPropertiesSource propsSrc;

		// Load a custom class to set config properties
		if (null != configPropsSourceClass) {
			propsSrc = (ConfigPropertiesSource) ClassLoaderResourceUtils.buildObjectInstance(configPropsSourceClass);
			if (propsSrc instanceof ServletContextAware) {
				((ServletContextAware) propsSrc).setServletContext(context);
			}
		} else if(configProps != null){
			
			// configuration retrieved from the in memory configuration properties
			propsSrc = new PropsConfigPropertiesSource(configProps);
			
		}else{
			// Default config properties source, reads from a .properties file in the classpath.
			propsSrc = new PropsFilePropertiesSource();
		}

		// If a custom properties source is a subclass of PropsFilePropertiesSource, we hand it the configLocation param.
		// This affects the standard one as well.
		if (propsSrc instanceof PropsFilePropertiesSource)
			((PropsFilePropertiesSource) propsSrc).setConfigLocation(configLocation);

		// Read properties from properties source
		Properties props = propsSrc.getConfigProperties();

		// init registry
		generatorRegistry = new GeneratorRegistry(resourceType);

		// hang onto the propertiesSource for manual reloads
		this.propertiesSource = propsSrc;

		// Initialize config
		initializeJawrConfig(props);

		// Initialize the properties reloading checker daemon if specified
		if(!ThreadLocalJawrContext.isBundleProcessingAtBuildTime() && null != props.getProperty(CONFIG_RELOAD_INTERVAL)) {
			int interval = Integer.valueOf(props.getProperty(CONFIG_RELOAD_INTERVAL)).intValue();
			log.warn("Jawr started with configuration auto reloading on. "
					+ "Be aware that a daemon thread will be checking for changes to configuration every " + interval + " seconds.");

			this.configChangeListenerThread = new ConfigChangeListenerThread(propsSrc, this, interval);
			configChangeListenerThread.start();
		}

		// initialize the jmx Bean
		if(isJmxEnabled()){
				JmxUtils.initJMXBean(this, servletContext, resourceType, jawrConfig.getConfigProperties());
		}
		
		if (log.isInfoEnabled()) {
			long totaltime = System.currentTimeMillis() - initialTime;
			log.info("Init method succesful. jawr started in " + (totaltime / 1000) + " seconds....");
		}
	}

	/**
	 * Returns the init parameter value from the parameter name
	 * @param paramName the parameter name
	 * @return the init parameter value
	 */
	private String getInitParameter(String paramName){
		return (String) initParameters.get(paramName);
	}
	
	/**
	 * Returns true if JMX is enabled for the applcation
	 * @return true if JMX is enabled for the applcation
	 */
	private boolean isJmxEnabled() {
		return System.getProperty(JawrConstant.JMX_ENABLE_FLAG_SYSTEL_PROPERTY) != null;
	}

	/**
	 * Initialize the Jawr config
	 * 
	 * @param props the properties
	 * @throws ServletException if an exception occurs
	 */
	protected void initializeJawrConfig(Properties props) throws ServletException {
		// Initialize config
		if (null != jawrConfig)
			jawrConfig.invalidate();

		createJawrConfig(props);
		
		jawrConfig.setContext(servletContext);
		jawrConfig.setGeneratorRegistry(generatorRegistry);

		// Set the content type to be used for every request.
		contentType = "text/";
		contentType += "js".equals(resourceType) ? "javascript" : "css";
		contentType += "; charset=" + jawrConfig.getResourceCharset().name();

		// Set mapping, to be used by the tag lib to define URLs that point to this servlet.
		String mapping = (String) initParameters.get("mapping");
		if (null != mapping)
			jawrConfig.setServletMapping(mapping);

		if (jawrConfig.isCssClasspathImageHandledByClasspathCss() && resourceType.equals("css")) {
			ImageResourcesHandler imgRsHandler = (ImageResourcesHandler) servletContext.getAttribute(JawrConstant.IMG_CONTEXT_ATTRIBUTE);
			if (imgRsHandler == null) {
				log.error("You are using the CSS classpath image feature, but the JAWR Image servlet is yet initialized.\n"
						+ "The JAWR Image servlet must be initialized before the JAWR CSS servlet.\n"
						+ "Please check you web application configuration.");
			}
		}

		if (log.isDebugEnabled()) {
			log.debug("Configuration read. Current config:");
			log.debug(jawrConfig);
		}

		// Create a resource handler to read files from the WAR archive or exploded dir.
		rsReaderHandler = initResourceReaderHandler();
		ResourceBundleHandler rsBundleHandler = initResourceBundleHandler();
		PropertiesBasedBundlesHandlerFactory factory = new PropertiesBasedBundlesHandlerFactory(props, resourceType, rsReaderHandler, rsBundleHandler, jawrConfig
				.getGeneratorRegistry());
		try {
			bundlesHandler = factory.buildResourceBundlesHandler(jawrConfig);
		} catch (DuplicateBundlePathException e) {
			throw new ServletException(e);
		} catch (BundleDependencyException e) {
			throw new ServletException(e);
		}

		if (resourceType.equals(JawrConstant.JS_TYPE))
			servletContext.setAttribute(JawrConstant.JS_CONTEXT_ATTRIBUTE, bundlesHandler);
		else
			servletContext.setAttribute(JawrConstant.CSS_CONTEXT_ATTRIBUTE, bundlesHandler);

		this.clientSideScriptRequestHandler = new ClientSideHandlerScriptRequestHandler(bundlesHandler, jawrConfig);

		if (log.isDebugEnabled()) {
			log.debug("content type set to: " + contentType);
		}

		// Warn when in debug mode
		if (jawrConfig.isDebugModeOn()) {
			log.warn("Jawr initialized in DEVELOPMENT MODE. Do NOT use this mode in production or integration servers. ");
		}
	}

	/**
	 * Initialize the resource reader handler
	 * @return the resource reader handler
	 */
	protected ResourceReaderHandler initResourceReaderHandler() {
		ResourceReaderHandler rsHandler = null;
		if(servletContext != null){
			try {
				rsHandler = new ServletContextResourceReaderHandler(servletContext, jawrConfig, generatorRegistry);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		
		return rsHandler;
	}
	
	/**
	 * Initialize the resource bundle handler
	 * @return the resource bundle handler
	 */
	protected ResourceBundleHandler initResourceBundleHandler() {
		ResourceBundleHandler rsHandler = null;
		if(jawrConfig.getUseBundleMapping() && StringUtils.isNotEmpty(jawrConfig.getJawrWorkingDirectory())){
			rsHandler = new ServletContextResourceBundleHandler(servletContext, jawrConfig.getJawrWorkingDirectory(), jawrConfig.getResourceCharset(), jawrConfig.getGeneratorRegistry(), resourceType);
		}else{
			rsHandler = new ServletContextResourceBundleHandler(servletContext, jawrConfig.getResourceCharset(), jawrConfig.getGeneratorRegistry(), resourceType);
		}
		return rsHandler;
	}

	/**
	 * Create the Jawr config from the properties
	 * @param props the properties
	 */
	protected JawrConfig createJawrConfig(Properties props) {
		jawrConfig = new JawrConfig(props);
		
		// Override properties which are incompatible with the build time bundle processing
		if(ThreadLocalJawrContext.isBundleProcessingAtBuildTime()){
			jawrConfig.setUseBundleMapping(true);
			
			// Use the standard working directory
			jawrConfig.setJawrWorkingDirectory(null);
		}
		
		return jawrConfig;
	}

	/**
	 * Handles a resource request by getting the requested path from the request object and invoking processRequest.
	 * 
	 * @param request the request
	 * @param response the response
	 * @throws ServletException if a servlet exception occurs
	 * @throws IOException if an IO exception occurs.
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try{
			// Initialize the Thread local for the Jawr context
			if(isJmxEnabled()){
				ThreadLocalJawrContext.setJawrConfigMgrObjectName(JmxUtils.getMBeanObjectName(request.getContextPath(), resourceType));
			}
			
			RendererRequestUtils.setRequestDebuggable(request, jawrConfig);
			
			String requestedPath = "".equals(jawrConfig.getServletMapping()) ? request.getServletPath() : request.getPathInfo();
			processRequest(requestedPath, request, response);
			
		} catch (Exception e) {
			
			if (log.isDebugEnabled()){
				log.debug("ServletException : ", e);
			}
			
			throw new ServletException(e);
		}finally{
			
			// Reset the Thread local for the Jawr context
			ThreadLocalJawrContext.reset();
		}
		
	}

	/**
	 * Handles a resource request.
	 * <ul>
	 * <li>If the request contains an If-Modified-Since header, the 304 status is set and no data is written to the response</li>
	 * <li>If the requested path begins with the gzip prefix, a gzipped version of the resource is served, with the corresponding content-encoding
	 * header.</li>
	 * <li>Otherwise, the resource is written as text to the response.</li>
	 * <li>If the resource is not found, the response satus is set to 404 and no response is written.</li>
	 * </ul>
	 * 
	 * @param requestedPath the requested path
	 * @param request the request
	 * @param response the response
	 * @throws ServletException if a servlet exception occurs
	 * @throws IOException if an IO exception occurs
	 */
	public void processRequest(String requestedPath, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// manual reload request
		if (this.jawrConfig.getRefreshKey().length() > 0 && null != request.getParameter("refreshKey")
				&& this.jawrConfig.getRefreshKey().equals(request.getParameter("refreshKey"))) {
			this.configChanged(propertiesSource.getConfigProperties());
		}

		if (log.isDebugEnabled())
			log.debug("Request received for path:" + requestedPath);

		if (CLIENTSIDE_HANDLER_REQ_PATH.equals(requestedPath)) {
			this.clientSideScriptRequestHandler.handleClientSideHandlerRequest(request, response);
			return;
		}

		// CSS images would be requested through this handler in case servletMapping is used
		// if( this.jawrConfig.isDebugModeOn() && !("".equals(this.jawrConfig.getServletMapping())) && null == request.getParameter(GENERATION_PARAM)) {
		if (JawrConstant.CSS_TYPE.equals(resourceType) && 
				!JawrConstant.CSS_TYPE.equals(getExtension(requestedPath)) &&
				this.imgMimeMap.containsKey(getExtension(requestedPath))) {

			if (null == bundlesHandler.resolveBundleForPath(requestedPath)) {
				if (log.isDebugEnabled())
					log.debug("Path '" + requestedPath + "' does not belong to a bundle. Forwarding request to the server. ");
				request.getRequestDispatcher(requestedPath).forward(request, response);
				return;
			}
		}

		// If debug mode is off, check for If-Modified-Since and If-none-match headers and set response caching headers.
		if (!this.jawrConfig.isDebugModeOn()) {
			// If a browser checks for changes, always respond 'no changes'.
			if (null != request.getHeader(IF_MODIFIED_SINCE_HEADER) || null != request.getHeader(IF_NONE_MATCH_HEADER)) {
				response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
				if (log.isDebugEnabled())
					log.debug("Returning 'not modified' header. ");
				return;
			}

			// Add caching headers
			setResponseHeaders(response);
		} else if (null != request.getParameter(GENERATION_PARAM))
			requestedPath = request.getParameter(GENERATION_PARAM);

		// By setting content type, the response writer will use appropiate encoding
		response.setContentType(contentType);

		try {
			// Send gzipped resource if user agent supports it.
			if (requestedPath.startsWith(BundleRenderer.GZIP_PATH_PREFIX)) {
				requestedPath = "/" + requestedPath.substring(BundleRenderer.GZIP_PATH_PREFIX.length(), requestedPath.length());
				response.setHeader("Content-Encoding", "gzip");
				bundlesHandler.streamBundleTo(requestedPath, response.getOutputStream());
			} else {

				// In debug mode, we take in account the image generated from a StreamGenerator like classpath Image generator
				// The following code will rewrite the URL path for the generated images,
				// because in debug mode, we are retrieving the CSS ressources directly from the webapp
				// and if the CSS contains generated images, we should rewrite the URL.
				ImageResourcesHandler imgRsHandler = (ImageResourcesHandler) servletContext.getAttribute(JawrConstant.IMG_CONTEXT_ATTRIBUTE);
				if (imgRsHandler != null && this.jawrConfig.isDebugModeOn() && resourceType.equals(JawrConstant.CSS_TYPE)) {

					// Write the content of the CSS in the Stringwriter
					Writer writer = new StringWriter();
					Reader rd = rsReaderHandler.getResource(requestedPath);
					if(rd == null){
						throw new ResourceNotFoundException(requestedPath);
					}
					IOUtils.copy(rd, writer);
					String content = writer.toString();

					String imageServletMapping = imgRsHandler.getJawrConfig().getServletMapping();
					
					if (imageServletMapping == null) {
						imageServletMapping = "";
					}

					// Define the replacement pattern for the generated image (like jar:img/myImg.png)
					String relativeRootUrlPath = getRootRelativeCssUrlPath(request, requestedPath);
					String replacementPattern = PathNormalizer.normalizePath("$1" + relativeRootUrlPath + imageServletMapping + "/$4_cbDebug/$7$8");
					
					Matcher matcher = GENERATED_IMG_PATTERN.matcher(content);

					// Rewrite the images define in the classpath, to point to the image servlet
					StringBuffer result = new StringBuffer();
					while (matcher.find()) {
						matcher.appendReplacement(result, replacementPattern);
					}
					matcher.appendTail(result);
					Writer out = response.getWriter();
					out.write(result.toString());
				} else {

					if(isValidRequestedPath(requestedPath)){
						Writer out = response.getWriter();
						bundlesHandler.writeBundleTo(requestedPath, out);	
					}else{
						throw new ResourceNotFoundException(requestedPath);
					}
				}
			}
		} catch (ResourceNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			if (log.isInfoEnabled())
				log.info("Received a request for a non existing bundle: " + requestedPath);
			return;
		}

		if (log.isDebugEnabled())
			log.debug("request succesfully attended");
	}

	/**
	 * Checks if the path is valid and can be accessed.
	 * @param requestedPath the requested path
	 * @return true if the path is valid and can be accessed.
	 */
	protected boolean isValidRequestedPath(String requestedPath) {
		
		boolean result = true;
		if(requestedPath.startsWith(JawrConstant.WEB_INF_DIR_PREFIX) || requestedPath.startsWith(JawrConstant.META_INF_DIR_PREFIX)){
			result = false;
		}else{
			// If it's not a generated path check the extension file 
			if(!generatorRegistry.isPathGenerated(requestedPath)){
				String extension = FileNameUtils.getExtension(requestedPath);
				if(!extension.toLowerCase().equals(resourceType)){
					result = false;
				}
			}
		}
		
		return result;
	}
	
	/**
	 * Returns the extension for the requested path
	 * @param requestedPath the requested path
	 * @return the extension for the requested path
	 */
	protected String getExtension(String requestedPath) {
		
		return FileNameUtils.getExtension(requestedPath);
	}

	/**
	 * Returns the relative path of an url to go back to the root.
	 * For example : if the url path is defined as "/cssServletPath/css/myStyle.css" -> "../../"
	 * 
	 * @param request the request
	 * @param url the requested url
	 * @return the relative path of an url to go back to the root.
	 */
	private String getRootRelativeCssUrlPath(HttpServletRequest request, String url) {

		String servletPath = "".equals(jawrConfig.getServletMapping()) ? "" : request.getServletPath();
		String originalRequestPath = "".equals(jawrConfig.getServletMapping()) ? request.getServletPath() : request.getPathInfo();
		// Deals with Jawr generated resource path containing /jawr_generator.css
		if(originalRequestPath.startsWith(ResourceGenerator.CSS_DEBUGPATH)){
			url = ResourceGenerator.CSS_DEBUGPATH;
		}

		url = PathNormalizer.asPath(servletPath + url);
		
		Matcher matcher = URL_SEPARATOR_PATTERN.matcher(url);
		StringBuffer result = new StringBuffer();
		int i = 0;
		while (matcher.find()) {
			if (i == 0) {
				matcher.appendReplacement(result, "");
				i++;
			} else {
				matcher.appendReplacement(result, ROOT_REPLACE_PATTERN);
			}

		}

		return result.toString();
	}

	/**
	 * Adds aggresive caching headers to the response in order to prevent browsers requesting the same file twice.
	 * 
	 * @param resp the response
	 */
	protected void setResponseHeaders(HttpServletResponse resp) {
		// Force resource caching as best as possible
		resp.setHeader(CACHE_CONTROL_HEADER, CACHE_CONTROL_VALUE);
		resp.setHeader(LAST_MODIFIED_HEADER, LAST_MODIFIED_VALUE);
		resp.setHeader(ETAG_HEADER, ETAG_VALUE);
		Calendar cal = Calendar.getInstance();
		cal.roll(Calendar.YEAR, 10);
		resp.setDateHeader(EXPIRES_HEADER, cal.getTimeInMillis());
	}

	/**
	 * Analog to Servlet.destroy(), should be invoked whenever the app is redeployed.
	 */
	public void destroy() {
		// Stop the config change listener.
		if (null != this.configChangeListenerThread)
			configChangeListenerThread.stopPolling();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.jawr.web.resource.bundle.factory.util.ConfigChangeListener#configChanged(java.util.Properties)
	 */
	public synchronized void configChanged(Properties newConfig) {
		if (log.isDebugEnabled())
			log.debug("Reloading Jawr configuration");
		try {
			// Initialize the Thread local for the Jawr context
			if(isJmxEnabled()){
				ThreadLocalJawrContext.setJawrConfigMgrObjectName(JmxUtils.getMBeanObjectName(servletContext, resourceType));
			}
			
			initializeJawrConfig(newConfig);
		} catch (Exception e) {
			throw new RuntimeException("Error reloading Jawr config: " + e.getMessage(), e);
		}finally{
			
			// Reset the Thread local for the Jawr context
			ThreadLocalJawrContext.reset();
		}
		
		if (log.isDebugEnabled())
			log.debug("Jawr configuration succesfully reloaded. ");
	}
}