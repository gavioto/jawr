/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package test.net.jawr.web.resource.bundle.postprocess.impl;

import java.io.ByteArrayOutputStream;
import java.io.Writer;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import net.jawr.web.config.JawrConfig;
import net.jawr.web.resource.FileSystemResourceHandler;
import net.jawr.web.resource.bundle.InclusionPattern;
import net.jawr.web.resource.bundle.JoinableResourceBundle;
import net.jawr.web.resource.bundle.JoinableResourceBundleImpl;
import net.jawr.web.resource.bundle.handler.ResourceBundlesHandler;
import net.jawr.web.resource.bundle.handler.ResourceBundlesHandlerImpl;
import net.jawr.web.resource.bundle.postprocess.BundleProcessingStatus;
import net.jawr.web.resource.bundle.postprocess.impl.LicensesIncluderPostProcessor;
import test.net.jawr.web.resource.bundle.handler.ResourceHandlerBasedTest;
/**
 *
 * @author jhernandez
 */
public class LicensesIncluderPostProcessorTest  extends  ResourceHandlerBasedTest{

	private static final String ROOT_TESTDIR = "/licenseprocessor/";
	private LicensesIncluderPostProcessor processor;
	private JoinableResourceBundle resourcebundle;
	private FileSystemResourceHandler rsHandler;
	private JawrConfig jeesConfig;
	
	public LicensesIncluderPostProcessorTest() {
	    try {			
		Charset charsetUtf = Charset.forName("UTF-8"); 
		rsHandler = createResourceHandler(ROOT_TESTDIR,charsetUtf);
		jeesConfig = new JawrConfig(new Properties());
		jeesConfig.setCharsetName("UTF-8");
		
		List c = Collections.singletonList("js/**");
		resourcebundle = new JoinableResourceBundleImpl("script.js","script",
										".js",
										new InclusionPattern(true,0),
										c,
										rsHandler);
		
		processor = new LicensesIncluderPostProcessor();


	    } catch (Exception e) {
		    System.out.println("Error in test constructor");
		    e.printStackTrace();
	    }
	}
	
	/**
	 * Test the ability to include license files in a bundle. 
	 */
	public void testDoPostProcessBundle() {
	try {
	    List cols = new ArrayList();
	    cols.add(resourcebundle);
	    ResourceBundlesHandler collector = new ResourceBundlesHandlerImpl(cols, rsHandler, jeesConfig);
	    collector.initAllBundles();
	    ByteArrayOutputStream baOs = new ByteArrayOutputStream();
	    WritableByteChannel wrChannel = Channels.newChannel(baOs);
	    Writer writer = Channels.newWriter(wrChannel, jeesConfig.getResourceCharset().name());
	    collector.writeBundleTo("/js/script.js", writer);
	    BundleProcessingStatus status = new BundleProcessingStatus(resourcebundle,rsHandler,jeesConfig);
	    StringBuffer sb = processor.postProcessBundle(status, new StringBuffer(baOs.toString(jeesConfig.getResourceCharset().name())));
	    String contents = sb.toString();
	    assertTrue("License in root folder not included",(contents.indexOf("/** License in folder **/")!=-1));
	    assertTrue("License in subfolder not included",(contents.indexOf("/** License in subfolder **/")!=-1));
	} catch (Exception ex) {
	    fail("Error:" +ex.getMessage());
	}
	}
}