// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {LogLevelConstants} from "../log/LogLevel"
import LogEvent from "../log/LogEvent";

import TextFormatter from "../format/TextFormatter";
import PlainTextFormatter from "../format/PlainTextFormatter";

import AbstractTransport, {Options as SuperOptions} from "./AbstractTransport";
import Transport from "./Transport";


/**
 * A {@link Transport log transport} that writes text to some destination.
 */
export default class TextTransport<LogLevel extends LogLevelConstants = LogLevelConstants> extends AbstractTransport<LogLevel> {

	protected formatter: TextFormatter;
	protected destination: Options<LogLevel>['destination'];


	// -------------------------------------------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new text transport.
	 * 
	 * @param options The transport options.
	 */
	public constructor(options: Options<LogLevel> & SuperOptions<LogLevel>) {
		super(options);
		this.destination = options.destination;
		this.formatter = options.formatter ?? new PlainTextFormatter();
	}


	// -------------------------------------------------------------------------------------------------------------
	// Implementation: LogTransport
	// -------------------------------------------------------------------------------------------------------------
	
	public transport(event: LogEvent<LogLevel>): void | Promise<void> {
		if (!this.isTransported(event)) return;
		this.destination(this.formatter.format(event));
	}

}

export interface Options<LogLevel> {

	/**
	 * The destination to write to.
	 * This is a function that accepts a string and does something with it.
	 */
	destination: (text: string) => void | Promise<void>;

	/**
	 * The text formatter to use.
	 */
	formatter?: TextFormatter;
	
}
