/**
 * Copyright 2007 Jordi Hern�ndez Sell�s
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
package net.jawr.web.resource.bundle.factory.util;

import java.util.List;

import net.jawr.web.servlet.JawrRequestHandler;

/**
 * Transfer object meant for a factory to use to create a JoinableResourceBundle. 
 * 
 * @author Jordi Hern�ndez Sell�s
 *
 */
public class ResourceBundleDefinition {
	
	private String bundleId;
	private List mappings;
	private boolean isGlobal;
	private boolean isComposite;
	private int inclusionOrder;
	private boolean debugOnly = false;
	private boolean debugNever = false;
	private String unitaryPostProcessorKeys;
	private String bundlePostProcessorKeys;
	private String ieConditionalExpression;
	private String alternateProductionURL;
	private List children;
	private List localeVariantKeys;
	
	public List getLocaleVariantKeys() {
		return localeVariantKeys;
	}
	public void setLocaleVariantKeys(List localeVariantKeys) {
		this.localeVariantKeys = localeVariantKeys;
	}
	public List getChildren() {
		return children;
	}
	public void setChildren(List children) {
		this.children = children;
	}
	public String getBundleId() {
		return bundleId;
	}
	public void setBundleId(String bundleId) {
		if(JawrRequestHandler.CLIENTSIDE_HANDLER_REQ_PATH.equals(bundleId))
			throw new IllegalArgumentException("The provided id [" + 
					JawrRequestHandler.CLIENTSIDE_HANDLER_REQ_PATH +
						"] can't be used since it's the same as the clientside handler path. Please change this id (or the name of the script)");
		this.bundleId = bundleId;
	}
	public List getMappings() {
		return mappings;
	}
	public void setMappings(List mappings) {
		this.mappings = mappings;
	}
	public boolean isGlobal() {
		return isGlobal;
	}
	public void setGlobal(boolean isGlobal) {
		this.isGlobal = isGlobal;
	}
	public int getInclusionOrder() {
		return inclusionOrder;
	}
	public void setInclusionOrder(int inclusionOrder) {
		this.inclusionOrder = inclusionOrder;
	}
	public boolean isDebugOnly() {
		return debugOnly;
	}
	public void setDebugOnly(boolean debugOnly) {
		this.debugOnly = debugOnly;
	}
	public boolean isDebugNever() {
		return debugNever;
	}
	public void setDebugNever(boolean debugNever) {
		this.debugNever = debugNever;
	}
	public String getUnitaryPostProcessorKeys() {
		return unitaryPostProcessorKeys;
	}
	public void setUnitaryPostProcessorKeys(String unitaryPostProcessorKeys) {
		this.unitaryPostProcessorKeys = unitaryPostProcessorKeys;
	}
	public String getBundlePostProcessorKeys() {
		return bundlePostProcessorKeys;
	}
	public void setBundlePostProcessorKeys(String bundlePostProcessorKeys) {
		this.bundlePostProcessorKeys = bundlePostProcessorKeys;
	}
	public boolean isComposite() {
		return isComposite;
	}
	public void setComposite(boolean isComposite) {
		this.isComposite = isComposite;
	}
	public String getIeConditionalExpression() {
		return ieConditionalExpression;
	}
	public void setIeConditionalExpression(String ieConditionalExpression) {
		this.ieConditionalExpression = ieConditionalExpression;
	}
	/**
	 * @return the alternateProductionURL
	 */
	public String getAlternateProductionURL() {
		return alternateProductionURL;
	}
	/**
	 * @param alternateProductionURL the alternateProductionURL to set
	 */
	public void setAlternateProductionURL(String alternateProductionURL) {
		this.alternateProductionURL = alternateProductionURL;
	}
	
	

}
