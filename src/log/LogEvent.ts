// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {LogLevelConstants} from "./LogLevel";


/**
 * A record of a logging event.
 */
export default class LogEvent<LogLevel extends LogLevelConstants = LogLevelConstants> {

	/**
	 * The {@link LogLevel severity level}.
	 */
	public readonly level: LogLevel;

	/**
	 * The timestamp at which the event occurred.
	 */
	public readonly timestamp: Date;

	/**
	 * The event message.
	 */
	public readonly message: string;

	/**
	 * Any extra data supplied with the event.
	 */
	public readonly data: any;

	/**
	 * The program module that produced the event.
	 */
	public readonly module: string;


	// -------------------------------------------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new log event.
	 *
	 * @param level The log level.
	 * @param timestamp The event timestamp.
	 * @param module The module that produced the event.
	 * @param message The event message.
	 * @param data Extra data provided with the event.
	 */
	public constructor(level: LogLevel, timestamp: Date, module: string, message: string, data: any) {
		this.level = level;
		this.timestamp = timestamp;
		this.module = module;
		this.message = message;
		this.data = data;
	}

}
