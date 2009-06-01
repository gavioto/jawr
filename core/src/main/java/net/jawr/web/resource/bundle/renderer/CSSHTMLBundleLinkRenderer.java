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
package net.jawr.web.resource.bundle.renderer;

import net.jawr.web.resource.bundle.handler.ResourceBundlesHandler;

/**
 * Renderer that creates css link tags. 
 * 
 * @author Jordi Hern�ndez Sell�s
 */
public class CSSHTMLBundleLinkRenderer extends AbstractBundleLinkRenderer implements BundleRenderer{
    
    private static final String PRE_TAG = "<link rel=\"stylesheet\" type=\"text/css\" media=\"";
    private static final String MID_TAG = "\" href=\"";
    private static final String POST_TAG = "\" />\n";
    private static final String POST_HTML_TAG = "\" >\n";
    private static final String POST_XHTML_EXT_TAG = "\" ></link>\n";
    public static final String FLAVORS_XHTML = "xhtml";
    public static final String FLAVORS_XHTML_EXTENDED = "xhtml_ext";
    public static final String FLAVORS_HTML = "html";
    
    private static String closingFlavor = POST_TAG;
    private String media;
    
    /** Creates a new instance of CSSHTMLBundleLinkRenderer */
    public CSSHTMLBundleLinkRenderer(ResourceBundlesHandler bundler, boolean useRandomParam, String media) {
        super(bundler, useRandomParam);
        
        this.media = null == media ? "screen" : media;
    }
    
    /**
     * Utility method to get the closing tag value based on 
     * a config parameter. 
     * @param flavor
     * @return
     */
    public static void setClosingTag(String flavor) {
    	
    	if(FLAVORS_XHTML_EXTENDED.equalsIgnoreCase(flavor)) {
        	closingFlavor = POST_XHTML_EXT_TAG;
        }
        else if(FLAVORS_HTML.equalsIgnoreCase(flavor))
        	closingFlavor = POST_HTML_TAG;
        else closingFlavor = POST_TAG;
    	
    }

    /* (non-Javadoc)
     * @see net.jawr.web.resource.bundle.renderer.AbstractBundleLinkRenderer#createBundleLink(java.lang.String, java.lang.String)
     */
    protected String renderLink(String fullPath) {
    	
        StringBuffer sb = new StringBuffer(PRE_TAG);
		sb.append(media).append(MID_TAG)
						.append(fullPath)	
						.append(closingFlavor); 
        return sb.toString();
    }
    
}
