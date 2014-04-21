/**
 * Copyright 2009 Ibrahim Chaehoi
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
package net.jawr.web.resource.bundle.renderer;

import java.util.HashSet;
import java.util.Set;

/**
 * This class defines the Bundle renderer context
 * 
 * @author Ibrahim Chaehoi
 *
 */
public class BundleRendererContext {

	/** The context path */
	private String contextPath;
	
	/** The variant key */
	private String variantKey;
	
	/** The included bundles */
	private Set includedBundles;
	
	/** The included resources in debug mode */
	private Set includedResources;
	
	/** The flag indicating if the global bundles have already been added */
	private boolean globalBundleAdded;
	
	/** The flag indicating if we are using Gzip or not */
	private boolean useGzip;
	
	/** The flag indicating if it's an SSL request or not */
	private boolean isSslRequest;

	/**
	 * Constructor
	 * @param contextPath the context path
	 * @param variantKey the variant key
	 * @param useGzip the flag indicating if we are using Gzip or not
	 * @param isSslRequest the flag indicating if it's an SSL request or not
	 */
	public BundleRendererContext(String contextPath, String variantKey,
			boolean useGzip, boolean isSslRequest) {
		super();
		this.contextPath = contextPath;
		this.variantKey = variantKey;
		this.includedBundles = new HashSet();
		this.includedResources = new HashSet();
		this.useGzip = useGzip;
		this.isSslRequest = isSslRequest;
	}

	/**
	 * Returns the context path
	 * @return the contextPath
	 */
	public String getContextPath() {
		return contextPath;
	}

	/**
	 * Sets the context path
	 * @param contextPath the contextPath to set
	 */
	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	/**
	 * Returns the variant key
	 * @return the variantKey
	 */
	public String getVariantKey() {
		return variantKey;
	}

	/**
	 * Sets the variant key
	 * @param variantKey the variantKey to set
	 */
	public void setVariantKey(String variantKey) {
		this.variantKey = variantKey;
	}

	/**
	 * Returns true if the global bundles have already been added
	 * @return true if the global bundles have already been added
	 */
	public boolean isGlobalBundleAdded() {
		return globalBundleAdded;
	}

	/**
	 * Sets the flag indicating if the global bundles have already been added
	 * @param globalBundleAdded the flag to set
	 */
	public void setGlobalBundleAdded(boolean globalBundleAdded) {
		this.globalBundleAdded = globalBundleAdded;
	}

	/**
	 * Returns true if we use Gzip
	 * @return true if we use Gzip
	 */
	public boolean isUseGzip() {
		return useGzip;
	}

	/**
	 * Sets the flag indicating if we use Gzip
	 * @param useGzip the flag to set
	 */
	public void setUseGzip(boolean useGzip) {
		this.useGzip = useGzip;
	}

	/**
	 * Returns true if it's an SSL request
	 * @return true if it's an SSL request
	 */
	public boolean isSslRequest() {
		return isSslRequest;
	}

	/**
	 * Sets the flag indicating if it's an SSL request
	 * @param isSslRequest the flag to set
	 */
	public void setSslRequest(boolean isSslRequest) {
		this.isSslRequest = isSslRequest;
	}

	/**
	 * Returns the included bundles
	 * @return the included bundles
	 */
	public Set getIncludedBundles() {
		return includedBundles;
	}
	
	/**
	 * Sets the included bundle
	 * @param includedBundles the included bundles to set
	 */
	public void setIncludedBundles(Set includedBundles) {
		this.includedBundles = includedBundles;
	}

	/**
	 * Returns the included resources
	 * @return the includedResources
	 */
	public Set getIncludedResources() {
		return includedResources;
	}

	/**
	 * Sets the included resources
	 * @param includedResources the includedResources to set
	 */
	public void setIncludedResources(Set includedResources) {
		this.includedResources = includedResources;
	}
	
}