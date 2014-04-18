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
package net.jawr.web.exception;

/**
 * This class defines the exception which is thrown during JMX configuration
 * 
 * @author Ibrahim Chaehoi
 *
 */
public class JmxConfigException extends RuntimeException {

	/** The serial version UID */
	private static final long serialVersionUID = -6974583055148217861L;

	/**
	 * Constructor
	 * @param message the message
	 * @param cause the cause of the exception
	 */
	public JmxConfigException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * Constructor
	 * @param message the message
	 */
	public JmxConfigException(String message) {
		super(message);
	}

	/**
	 * Constructor
	 * @param cause the cause of the exception
	 */
	public JmxConfigException(Throwable cause) {
		super(cause);
	}

}
