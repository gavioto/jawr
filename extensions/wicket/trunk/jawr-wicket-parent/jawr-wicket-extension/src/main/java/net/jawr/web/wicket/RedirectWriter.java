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
package net.jawr.web.wicket;

import java.io.IOException;
import java.io.Writer;

import org.apache.wicket.request.Response;

/**
 * This class defines a wrapper class for writer in the response.
 *  
 * @autor Robert Kopaczewski (Original author) 
 * @author Ibrahim Chaehoi
 */
public class RedirectWriter extends Writer {
	
	/** The response */
    private Response response;

    /**
     * Constructor
     * 
     * @param response the response
     */
    public RedirectWriter(Response response) {
        this.response = response;
    }

    /* (non-Javadoc)
     * @see java.io.Writer#write(java.lang.String)
     */
    public void write(String str) throws IOException {
        response.write(str);
    }

    /* (non-Javadoc)
     * @see java.io.Writer#write(char[], int, int)
     */
    public void write(char[] cbuf, int off, int len) throws IOException {
        return;
    }

    /* (non-Javadoc)
     * @see java.io.Writer#flush()
     */
    public void flush() throws IOException {
        return;
    }

    /* (non-Javadoc)
     * @see java.io.Writer#close()
     */
    public void close() throws IOException {
        return;
    }
}