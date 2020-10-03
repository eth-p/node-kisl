// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {LogLevelConstants} from "../log/LogLevel";
import LogEvent from "../log/LogEvent";


/**
 * An object that formats a log event into human-readable text.
 */
export default interface TextFormatter<LogLevel extends LogLevelConstants = LogLevelConstants> {

	/**
	 * Called to format a {@link LogEvent log event}.
	 * 
	 * @param event The event.
	 * 
	 * @return The event formatted as a string.
	 */
	format(event: LogEvent<LogLevel>): string;

}
