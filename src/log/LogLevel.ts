// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {__enum} from "../_type"


/**
 * An enum of log event severity levels.
 */
const LogLevel = __enum({

	/**
	 * Debug message.
	 *
	 * This log level is intended for events that are useful for debugging programs.
	 * It may contain events with sensitive information, and generally should not be stored anywhere.  
	 */
	DEBUG: 'debug',
	
	/**
	 * Status message.
	 * 
	 * This log level is intended for general status information that would be useful to display, but not
	 * strictly necessary for exceptional or informational circumstances.
	 */
	STATUS: 'status',
	
	/**
	 * Information message.
	 * 
	 * This log level is intended for contextual information display or non-routine events.
	 */
	INFO: 'info',

	/**
	 * Warning message.
	 * 
	 * This log level is intended for circumstances that should not affect the normal behavior of the program,
	 * but may be of note or suggest that something could potentially go wrong later. 
	 */
	WARN: 'warn',

	/**
	 * Error message.
	 *
	 * This log level is intended for exceptional circumstances that will likely affect the program's normal operation.
	 */
	ERROR: 'error',

	/**
	 * Fatal error message.
	 *
	 * This log level is intended for fatal errors that would cause the program to exit or crash.
	 */
	FATAL: 'fatal',
	
});

export default LogLevel;

export type LogLevelConstants = typeof LogLevel[keyof typeof LogLevel];
