// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {inspect} from "util";

import DefaultLogLevel, {LogLevelConstants} from "../log/LogLevel";
import LogEvent from "../log/LogEvent";
import TextFormatter from "./TextFormatter";


/**
 * A {@link TextFormatter text formatter} that generates plain text from a log event.
 */
export default class PlainTextFormatter<Opts, LogLevel extends LogLevelConstants = LogLevelConstants> implements TextFormatter {

	protected options: Opts & Options;

	// -------------------------------------------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------------------------------------------

	public constructor(options?: Opts & Options) {
		this.options = options ?? ({} as Opts & Options);
	}

	// -------------------------------------------------------------------------------------------------------------
	// Methods: Protected
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Formats the log level.
	 *
	 * @param level The log level.
	 * @return The formatted log level.
	 *
	 * @protected
	 */
	protected formatLevel(level: LogLevel): string {
		switch (level) {
			case DefaultLogLevel.DEBUG:
				return 'DEBUG ';

			case DefaultLogLevel.STATUS:
			case DefaultLogLevel.INFO:
				return 'INFO  ';

			case DefaultLogLevel.WARN:
				return 'WARN  ';

			case DefaultLogLevel.ERROR:
				return 'ERROR ';

			case DefaultLogLevel.FATAL:
				return 'FATAL ';
				
			default:
				return level.substring(0, Math.min(5, level.length))
					.toUpperCase()
					.padEnd(6, ' ');
		}
	}

	/**
	 * Formats the module.
	 *
	 * @param module The module that caused the event.
	 * @return The formatted module.
	 *
	 * @protected
	 */
	protected formatModule(module: string): string {
		return module;
	}

	/**
	 * Formats the date portion of a timestamp.
	 *
	 * @param timestamp The timestamp.
	 * @return The formatted date portion of the timestamp.
	 *
	 * @protected
	 */
	protected formatTimestampDate(timestamp: Date): string {
		const year = timestamp.getFullYear();
		const month = timestamp.getMonth().toString();
		const date = timestamp.getDate().toString();

		return `${year}-${month.padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
	}

	/**
	 * Formats the time portion of a timestamp.
	 *
	 * @param timestamp The timestamp.
	 * @return The formatted time portion of the timestamp.
	 *
	 * @protected
	 */
	protected formatTimestampTime(timestamp: Date): string {
		const hour = timestamp.getHours().toString();
		const minute = timestamp.getMinutes().toString();
		const second = timestamp.getSeconds().toString();

		return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
	}

	/**
	 * Formats the time stamp.
	 *
	 * @param timestamp The timestamp to format.
	 * @return The formatted timestamp.
	 *
	 * @protected
	 */
	protected formatTimestamp(timestamp: Date): string {
		return [
			this.options.date !== false ? this.formatTimestampDate(timestamp) : null,
			this.options.time !== false ? this.formatTimestampTime(timestamp) : null]
			.filter(seg => seg !== null)
			.join(' ');
	}

	/**
	 * Formats the message.
	 *
	 * @param message The message.
	 * @return The formatted message.
	 *
	 * @protected
	 */
	protected formatMessage(message: string): string {
		return message;
	}

	/**
	 * Formats the extra event data.
	 *
	 * @param data The event data.
	 * @return The formatted event data.
	 *
	 * @protected
	 */
	protected formatData(data: any): string {
		const depth = 20;
		const compact = inspect(data, {
			compact: true,
			depth,
		});

		if (this.strlen(compact) <= 40) return compact;
		return inspect(data, {
			compact: false,
			depth
		});
	}

	/**
	 * Gets the length of a string.
	 * Don't question it.
	 *
	 * @param str The string.
	 * @return The string length.
	 *
	 * @protected
	 */
	protected strlen(str: string): number {
		return str.length;
	}

	/**
	 * Generates indentation for multiline log messages.
	 *
	 * @param length The indentation length.
	 *
	 * @protected
	 */
	protected generateIndent(length: number): string {
		return ` ${''.padStart(length - 2, '.')} `;
	}

	// -------------------------------------------------------------------------------------------------------------
	// Implementation: TextFormatter
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Called to format a logging event.
	 *
	 * @param event The event.
	 *
	 * @return The corresponding string.
	 */
	public format(event: LogEvent<LogLevel>): string {
		const prefix = [
			(this.options.time !== false || this.options.date !== false) ? this.formatTimestamp(event.timestamp) : null,
			this.options.level !== false ? this.formatLevel(event.level) : null,
			this.options.module !== false ? `${this.formatModule(event.module)}:` : null]
			.filter(seg => seg !== null)
			.join(' ');

		const lines = this.formatMessage(event.message).split("\n");
		const data = (this.options.data !== false && event.data != null) ? this.formatData(event.data).split("\n") : [];
		
		if (lines.length === 1 && data.length < 2) {
			return (data.length === 1) ? `${prefix} ${lines[0]}  ${data}` :  `${prefix} ${lines[0]}`;
		}
		
		// Format the lines.
		const indent = this.generateIndent(this.strlen(prefix));
		return `${prefix} ${lines[0]}\n` + [...lines.slice(1), ...data]
			.map(line => `${indent} ${line}`)
			.join("\n");
	}

}

export interface Options {
	
	/**
	 * Format the event level.
	 */
	level?: boolean,

	/**
	 * Format the event time.
	 */
	time?: boolean,

	/**
	 * Format the event date.
	 */
	date?: boolean,

	/**
	 * Format the event data.
	 */
	data?: boolean,

	/**
	 * Format the event source module.
	 */
	module?: boolean

}
