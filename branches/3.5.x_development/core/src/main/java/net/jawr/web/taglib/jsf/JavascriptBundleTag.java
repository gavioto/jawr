/**
 * Copyright 2007-2011 Jordi Hern�ndez Sell�s, Ibrahim Chaehoi
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
package net.jawr.web.taglib.jsf;

import javax.faces.context.FacesContext;

import net.jawr.web.JawrConstant;
import net.jawr.web.resource.bundle.handler.ResourceBundlesHandler;
import net.jawr.web.resource.bundle.renderer.BundleRenderer;
import net.jawr.web.resource.bundle.renderer.JavascriptHTMLBundleLinkRenderer;

/**
 * Implementation of a facelets taglib AbstractResourceBundleTag used to render javascript bundles. 
 * 
 * @author Jordi Hern�ndez Sell�s
 * @author ibrahim Chaehoi
 */
public class JavascriptBundleTag extends AbstractResourceBundleTag {

	/* (non-Javadoc)
	 * @see net.jawr.web.taglib.jsf.AbstractResourceBundleTag#createRenderer(javax.faces.context.FacesContext)
	 */
	protected BundleRenderer createRenderer(FacesContext context) {

		ResourceBundlesHandler rsHandler = getResourceBundlesHandler(context);
		return  new JavascriptHTMLBundleLinkRenderer(rsHandler, getUseRandomParamFlag(rsHandler.getConfig()));
	}

	/* (non-Javadoc)
	 * @see net.jawr.web.taglib.jsf.AbstractResourceBundleTag#getResourceHandlerAttributeName()
	 */
	@Override
	protected String getResourceBundlesHandlerAttributeName() {
		
		return JawrConstant.JS_CONTEXT_ATTRIBUTE;
	}

	
}
