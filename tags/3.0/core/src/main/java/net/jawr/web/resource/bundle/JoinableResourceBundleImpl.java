/**
 * Copyright 2007-2009 Jordi Hern�ndez Sell�s, Ibrahim Chaehoi
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
package net.jawr.web.resource.bundle;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.jawr.web.collections.ConcurrentCollectionsFactory;
import net.jawr.web.exception.ResourceNotFoundException;
import net.jawr.web.resource.ResourceHandler;
import net.jawr.web.resource.bundle.factory.util.PathNormalizer;
import net.jawr.web.resource.bundle.postprocess.ResourceBundlePostProcessor;
import net.jawr.web.resource.bundle.sorting.SortFileParser;
import net.jawr.web.util.StringUtils;

import org.apache.log4j.Logger;

/**
 * Basic implementation of JoinableResourceBundle. 
 * 
 * @author Jordi Hern�ndez Sell�s
 * @author Ibrahim Chaehoi
 *
 */
public class JoinableResourceBundleImpl implements JoinableResourceBundle {
	
	private static final Logger log = Logger.getLogger(JoinableResourceBundle.class.getName());
	
	/** The name of the bundle used in the configuration properties */
	private String name;
	
	/** The ID for this bundle. The URL, which will identify the bundle. */
	private String id;
	
	/** The inclusion pattern */
	private InclusionPattern inclusionPattern;
	
	/** The list of path mappings. It could contains directory mapping like 'myPath/**' */
	private List pathMappings;
	
	/** The final item path list containing all the resource linked to this bundl */
	protected List itemPathList;
	
	/** The resource handle */
	private ResourceHandler resourceHandler;
	
	/** The licence path list */
	protected Set licensesPathList;
	
	/** The file extension */
	private String fileExtension;
	
	/** The URL prefix */
	private String urlPrefix;
	
	/** The IE conditional expression */
	private String explorerConditionalExpression;
	
	/** The alternate URL for the bundle */
	private String alternateProductionURL;
	
	/** The prefix mapping for locale vairant version */
	private Map prefixMap;
	
	/** The list of locale variant keys */
	protected List localeVariantKeys;
	
	/** The file post processor */
	private ResourceBundlePostProcessor unitaryPostProcessor;
	
	/** The bundle post processor */
	private ResourceBundlePostProcessor bundlePostProcessor;
	
	/**
	 * Protected access constructor, which omits the mappings parameter. 
	 * 
	 * @param id the ID for this bundle.
     * @param name String Unique name for this bundle.
     * @param fileExtension String File extensions for this bundle.
     * @param inclusionPattern InclusionPattern Strategy for including this bundle.
     * @param resourceHandler ResourceHandler Used to access the files and folders.
     * @param urlPrefix The prefix to include in URLs whenever this bundle is included in a link. 
	 */
	public JoinableResourceBundleImpl(String id,	String name, 
			String fileExtension,
			InclusionPattern inclusionPattern,
			ResourceHandler resourceHandler) {
		super();

		this.inclusionPattern = inclusionPattern;
		
		this.id = PathNormalizer.asPath(id);
		this.name = name;
		this.resourceHandler = resourceHandler;
		this.itemPathList = ConcurrentCollectionsFactory.buildCopyOnWriteArrayList();
		this.licensesPathList = new HashSet();
        this.fileExtension = fileExtension;
        prefixMap = ConcurrentCollectionsFactory.buildConcurrentHashMap();
        
	}	
	
	
    /**
     * Constructor
     * @param id the ID of this bundle
     * @param name Unique name for this bundle.
     * @param fileExtension File extensions for this bundle.
     * @param inclusionPattern  Strategy for including this bundle.
     * @param pathMappings Set Strings representing the folders or files to include, possibly with wildcards.
     * @param resourceHandler Used to access the files and folders.
     * @param urlPrefix The prefix to include in URLs whenever this bundle is included in a link. 
     */
     public JoinableResourceBundleImpl(String id, String name, 
        									String fileExtension,
        									InclusionPattern inclusionPattern,
        									List pathMappings, 
											ResourceHandler resourceHandler) {
		this(id, name, fileExtension, inclusionPattern, resourceHandler);
      
		if(log.isDebugEnabled())
			log.debug("Adding mapped files for bundle " + getId());
		this.pathMappings = pathMappings;
		
		initPathList();
		if(log.isDebugEnabled())
			log.debug("Added " + this.itemPathList .size() + " files and " + licensesPathList.size() + " licenses for the bundle " + getId());
		
	}

	/**
	 * Detects all files that belong to this bundle and adds them to the 
	 * items path list. 
	 */
	private void initPathList()	{
		if(log.isDebugEnabled())
			log.debug("Creating bundle path List for " + getId());
		
		for(Iterator it = pathMappings.iterator();it.hasNext();)
		{
			String pathMapping = (String) it.next();

			// Handle generated resources
			if(resourceHandler.isResourceGenerated(pathMapping)){
				itemPathList.add(pathMapping);
			}
			// path ends in /, the folder is included without subfolders
			else if(pathMapping.endsWith("/")) {
				addItemsFromDir(pathMapping,false);
			}
			// path ends in /, the folder is included with all subfolders
			else if(pathMapping.endsWith("/**")){
				addItemsFromDir(pathMapping.substring(0,pathMapping.lastIndexOf("**")),true);
			}
			else if(pathMapping.endsWith(fileExtension)){
				itemPathList.add(PathNormalizer.asPath(pathMapping));
			}
			else if(pathMapping.endsWith(LICENSES_FILENAME)){
				licensesPathList.add(PathNormalizer.asPath(pathMapping));
			}
			else log.warn("Wrong mapping [" + pathMapping  
							+ "] for bundle [" 
							+ this.name 
							+ "]. Please check configuration. ");
		}
		if(log.isDebugEnabled())
			log.debug("Finished creating bundle path List for " + getId());
	}

	/**
	 * Adds all the resources within a path to the item path list. 
	 * @param dirName
	 * @param addSubDirs boolean If subfolders will be included. In such case, 
	 * 							 every folder below the path is included.  
	 */
	private void addItemsFromDir(String dirName, boolean addSubDirs)
	{
		Set resources = resourceHandler.getResourceNames(dirName);
		
			
		if(log.isDebugEnabled()) {
			log.debug("Adding " + resources.size() + " resources from path [" + dirName + "] to bundle " + getId());
		}

		
		// If the directory contains a sorting file, it is used to order the resources. 
		if(resources.contains(SORT_FILE_NAME) || resources.contains("/" + SORT_FILE_NAME)) {
			SortFileParser parser;
			try {
				String sortFilePath = PathNormalizer.joinPaths(dirName, SORT_FILE_NAME);
				parser = new SortFileParser(resourceHandler.getResource(sortFilePath),
															resources,
															dirName);
			} catch (ResourceNotFoundException e) {
				throw new RuntimeException("Unexpected ResourceNotFoundException when reading a sorting file[" + e.getRequestedPath() + "]",e);
			}
			List sortedResources = parser.getSortedResources();
			for(Iterator it = sortedResources.iterator();it.hasNext();) {
				String resourceName = (String) it.next();
				
				// Add subfolders or files
				if(resourceName.endsWith(fileExtension)){
					itemPathList.add(PathNormalizer.asPath(resourceName));
					if(log.isDebugEnabled())
						log.debug("Added to item path list from the sorting file:" + resourceName);
				}
				else if(addSubDirs && resourceHandler.isDirectory(resourceName))
					addItemsFromDir(resourceName,true);
			}		
		}
		
		// Add licenses file
		if(resources.contains(LICENSES_FILENAME) || resources.contains("/" + LICENSES_FILENAME)) {
			licensesPathList.add(PathNormalizer.joinPaths(dirName, LICENSES_FILENAME));
		}
		
		// Add remaining resources (remaining after sorting, or all if no sort file present)
		List folders = new ArrayList();
		for(Iterator it = resources.iterator();it.hasNext();) {
			String resourceName = (String) it.next();
			String resourcePath = PathNormalizer.joinPaths(dirName, resourceName);
			if(resourceName.endsWith(fileExtension)) {
				itemPathList.add(PathNormalizer.asPath(resourcePath));

				if(log.isDebugEnabled())
					log.debug("Added to item path list:" + PathNormalizer.asPath(resourcePath));
			}
			else if(addSubDirs && resourceHandler.isDirectory(resourcePath))
				folders.add(resourceName);
		}
		
		// Add subfolders if requested. Subfolders are added last unless specified in sorting file. 
		if(addSubDirs)
		{
			for(Iterator it = folders.iterator();it.hasNext();) {
				String folderName = (String) it.next();
				addItemsFromDir(PathNormalizer.joinPaths(dirName, folderName),true);
			}
		}
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getId()
	 */
	public String getId() {
		return this.id;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getName()
	 */
	public String getName() {
		return name;
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#isComposite()
	 */
	public boolean isComposite() {
		return false;
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getUnitaryPostProcessor()
	 */
	public ResourceBundlePostProcessor getUnitaryPostProcessor() {
		return unitaryPostProcessor;
	}

	/**
	 * Sets the unitary post processor
	 * @param unitaryPostProcessor the unitary post processor
	 */
	public void setUnitaryPostProcessor(
			ResourceBundlePostProcessor unitaryPostProcessor) {
		this.unitaryPostProcessor = unitaryPostProcessor;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getBundlePostProcessor()
	 */
	public ResourceBundlePostProcessor getBundlePostProcessor() {
		return bundlePostProcessor;
	}

	/**
	 * Sets the bundle post processor
	 * @param bundlePostProcessor the post processor to set
	 */
	public void setBundlePostProcessor(
			ResourceBundlePostProcessor bundlePostProcessor) {
		this.bundlePostProcessor = bundlePostProcessor;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getExplorerConditionalExpression()
	 */
	public String getExplorerConditionalExpression() {
		return explorerConditionalExpression;
	}


	/**
	 * Set the conditional comment expression. 
	 * @param explorerConditionalExpression
	 */
	public void setExplorerConditionalExpression(
			String explorerConditionalExpression) {
		this.explorerConditionalExpression = explorerConditionalExpression;
	}
	
	/**
	 * Set the list of variants for localized resources
	 * @param localeVariantKeys
	 */
	public void setLocaleVariantKeys(List localeVariantKeys) {
		this.localeVariantKeys = localeVariantKeys;
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getLocaleVariantKeys()
	 */
	public List getLocaleVariantKeys(){
		return this.localeVariantKeys;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getAlternateProductionURL()
	 */
	public String getAlternateProductionURL() {
		return this.alternateProductionURL;
	}


	/**
	 * Sets the alternate production URL
	 * @param alternateProductionURL the alternateProductionURL to set
	 */
	public void setAlternateProductionURL(String alternateProductionURL) {
		this.alternateProductionURL = alternateProductionURL;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#belongsTobundle(java.lang.String)
	 */
	public boolean belongsToBundle(String itemPath) {		
		return itemPathList.contains(itemPath);
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getInclusionPattern()
	 */
	public InclusionPattern getInclusionPattern() {
		return this.inclusionPattern;
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#setMappings(java.util.List)
	 */
	public void setMappings(List pathMappings) {
		
		this.pathMappings = pathMappings;
		initPathList();
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getItemPathList()
	 */
	public List getItemPathList() {
		return itemPathList;
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getItemPathList(java.lang.String)
	 */
	public List getItemPathList(String variantKey) {
		if(StringUtils.isEmpty(variantKey))
			return itemPathList;
		
		List rets = new ArrayList();
		for(Iterator it = itemPathList.iterator();it.hasNext();){
			String path = (String) it.next();			
			if(resourceHandler.isResourceGenerated(path)){
				rets.add(path + '@' + variantKey);
			}
			else rets.add(path);
		}
		return rets; 
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#getLicensesPathList()
	 */
	public Set getLicensesPathList() {
		return this.licensesPathList;
	}
	
	/**
	 * Sets the licence path list
	 * @param licencePathList the list to set
	 */
	public void setLicensesPathList(Set licencePathList) {
		this.licensesPathList = licencePathList;
	}

    /* (non-Javadoc)
	* @see net.jawr.web.resource.bundle.JoinableResourceBundle#getURLPrefix()
	*/
    public String getURLPrefix(String variantKey) {
    	if(null == this.urlPrefix)
    		throw new IllegalStateException("The bundleDataHashCode must be set before accessing the url prefix.");
    	
    	// Resolves the locale key like resourcebundle does
    	if(StringUtils.isNotEmpty(variantKey) && null != this.localeVariantKeys) {
    		String key = getAvailableLocaleVariant(variantKey);
    		if(null != key)
    			return prefixMap.get(variantKey) + "." + key + "/";
    	}
    	return this.urlPrefix + "/";
    }

    /* (non-Javadoc)
	* @see net.jawr.web.resource.bundle.JoinableResourceBundle#getBundleDataHashCode()
	*/
    public String getBundleDataHashCode(String variantKey) {
    	if(StringUtils.isEmpty(variantKey)){
			return this.urlPrefix;
		}
		else {
			return (String) prefixMap.get(variantKey);
		}
    }
    
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#setBundleDataHashCode(java.lang.String, int)
	 */
	public void setBundleDataHashCode(String variantKey, int bundleDataHashCode) {		
		String prefix;
		// Since this number is used as part of urls, the -sign is converted to 'N'
		if(bundleDataHashCode < 0){
			prefix = "N" + bundleDataHashCode*-1;
		}
		else prefix = Integer.toString(bundleDataHashCode);
		
		setBundleDataHashCode(variantKey, prefix);
	}
	
	/* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.JoinableResourceBundle#setBundleDataHashCode(java.lang.String, java.lang.String)
	 */
	public void setBundleDataHashCode(String variantKey, String bundleDataHashCode) {		
		
		String prefix = bundleDataHashCode;
		
		if(null == variantKey){
			this.urlPrefix = prefix;
		}
		else {
			prefixMap.put(variantKey, prefix);
		}
	} 
	
    /**
     * Resolves a registered path from a locale key, using the same algorithm used to 
     * locate ResourceBundles. 
     *  
     * @param variantKey
     * @return
     */
    private String getAvailableLocaleVariant(String variantKey) {
    	String key = null;
    	if(this.localeVariantKeys.contains(variantKey)){
    		key = variantKey;
    	}
    	else {
    		String subVar = variantKey;
    		while(subVar.indexOf('_') != -1) {
    			subVar = subVar.substring(0,subVar.lastIndexOf('_'));
    			if(this.localeVariantKeys.contains(subVar)){
        			key = subVar;
        		}
    		}
    	}
    	return key;
    }
 	
}