/**
 * Copyright 2007-2012 Jordi Hern�ndez Sell�s, Ibrahim Chaehoi
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

import java.io.IOException;
import java.io.Writer;

import net.jawr.web.JawrConstant;
import net.jawr.web.resource.bundle.handler.ResourceBundlesHandler;

/**
 * Renderer that creates javascript link tags. 
 * 
 * @author Jordi Hern�ndez Sell�s
 * @author Ibrahim Chaehoi
 */
public class JavascriptHTMLBundleLinkRenderer extends AbstractBundleLinkRenderer implements JsBundleLinkRenderer{
    
	/** The serial version UID */
	private static final long serialVersionUID = -7753927288041046690L;

	/** The start tag */
    private static final String PRE_TAG = "<script type=\"text/javascript\" src=\"";
    
    /** The source attribute*/
    private static final String SRC_END_ATTRIBUTE = "\"";
    
    /** The defer attribute */
    private static final String DEFER_ATTRIBUTE = " defer=\"defer\"";
    
    /** The end tag */
    private static final String POST_TAG = " ></script>\n";
    
    /** The defer attribute */
    private boolean defer;
    
    /** A flag indicating if we are rendering the global links */
    private boolean renderGlobalLinks;
    
    /** Creates a new instance of JavascriptHTMLBundleLinkRenderer */
    public JavascriptHTMLBundleLinkRenderer(){
    	
    }
    
    /* (non-Javadoc)
     * @see net.jawr.web.resource.bundle.renderer.JsBundleRenderer#init(net.jawr.web.resource.bundle.handler.ResourceBundlesHandler, java.lang.Boolean, java.lang.Boolean)
     */
    @Override
    public void init(ResourceBundlesHandler bundler, Boolean useRandomParam,
    		Boolean defer) {
       init(bundler, useRandomParam);
        if(defer != null){
        	this.defer = defer.booleanValue(); 
        }
    }

    /* (non-Javadoc)
	 * @see net.jawr.web.resource.bundle.renderer.BundleRenderer#getResourceType()
	 */
	public String getResourceType() {
		return JawrConstant.JS_TYPE;
	}
	
	/**
	 * Performs the global bundle rendering
	 * @param ctx the context
	 * @param out the writer
	 * @param debugOn the flag indicating if we are in debug mode or not
	 * @throws IOException if an IO exception occurs
	 */
	protected void performGlobalBundleLinksRendering(BundleRendererContext ctx,
			Writer out, boolean debugOn) throws IOException {
		
		renderGlobalLinks = true;
		super.performGlobalBundleLinksRendering(ctx, out, debugOn);
		renderGlobalLinks = false;
	}
	
    /* (non-Javadoc)
     * @see net.jawr.web.resource.bundle.renderer.AbstractBundleLinkRenderer#createBundleLink(java.lang.String, java.lang.String)
     */
    protected String renderLink(String fullPath) {
    	
    	//if(bundler.get)
    	StringBuffer sb = new StringBuffer(PRE_TAG);
    	sb.append(fullPath);
    	sb.append(SRC_END_ATTRIBUTE);
    	if(defer && !renderGlobalLinks){
    		sb.append(DEFER_ATTRIBUTE);
    	}
    	sb.append(POST_TAG); 
        return sb.toString();
    }
    
}
