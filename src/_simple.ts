// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import * as Process from "process";

import {compileDebugMatcher} from "./_util";

import Logger from "./log/Logger";
import LogEvent from "./log/LogEvent";
import {default as DefaultLogLevel, LogLevelConstants} from "./log/LogLevel";

import PlainTextFormatter from "./format/PlainTextFormatter";
import ColorTextFormatter from "./format/ColorTextFormatter";
import TextFormatter from "./format/TextFormatter";

import {Filter} from "./transport/AbstractTransport";
import TextTransport from "./transport/TextTransport";


/**
 * Creates a new simple console logger.
 * 
 * By default, this uses common standards for printing log messages to the terminal. 
 *
 * @param options The logger options.
 */
export default function make<LogLevel extends LogLevelConstants>(options?: Options<LogLevel>): Logger<LogLevel>;

/**
 * Creates a new console logger.
 *
 * @param name The logger name.
 * @param options The logger options.
 */
export default function make<LogLevel extends LogLevelConstants>(name: string, options?: Options<LogLevel>): Logger<LogLevel>;

/**
 * @internal
 */
export default function make<LogLevel extends LogLevelConstants>
(arg1?: Options<LogLevel> | string, arg2?: Options<LogLevel>): Logger<LogLevel> {
	type Event = LogEvent<LogLevel>;
	
	const name = typeof arg1 == 'string' ? arg1 : 'main';
	const options = typeof arg1 != 'string' ? arg1 : arg2;

	// Determine output stream and color output.
	const pipe = process.stdout;
	const color = (options?.color ?? 'auto') === 'auto' ? (Process.env['NO_COLOR'] == null && pipe.isTTY) : options!.color;
	
	// Determine logging filter options.
	const type = options?.mode ?? 'program';
	const levels = options?.levels instanceof Array ? new Set(options.levels) : (options?.levels ?? 'auto');
	
	// Create logging filters.
	const filterByLevel = levels === 'auto' ?
		((event: Event) => (event.level !== DefaultLogLevel.DEBUG)) : 
		((event: Event) => levels.has(event.level));
	
	const filter: Filter<LogLevel> = (() => {
		const matcher = compileDebugMatcher(process.env['DEBUG'] ?? name);
		switch (type) {
			
			case "debug":
				return (event: Event) => true;

			case "program":
				return (event: Event) => filterByLevel(event) || matcher(event.module);

			case "library":
				return (event: Event) => filterByLevel(event) && matcher(event.module);
				
		}
	})();
	
	// Create logging formatter.
	const formatter: TextFormatter<LogLevel> = new (color ? ColorTextFormatter : PlainTextFormatter)({
		date: (options?.date ?? 'simple') === 'full'
	});
	
	return new Logger<LogLevel>({
		module: name,
		transports: [
			new TextTransport<LogLevel>({
				filter,
				formatter,
				destination: (message: string) => {
					pipe.write(message);
					pipe.write('\n');
				}
			})
		]
	});
}

interface Options<LogLevel extends LogLevelConstants = LogLevelConstants> {

	/**
	 * Use colors in the logger?
	 */
	color?: boolean | 'auto',

	/**
	 * What log levels to show.
	 */
	levels?: 'auto' | LogLevel[];

	/**
	 * What messages to show.
	 * 
	 * <ul>
	 *     <li><code>debug</code> - Show messages from all modules. </li>
	 *     <li><code>program</code> - Show messages from all modules, including hidden ones from modules specified in the `DEBUG` environment variable.</li>
	 *     <li><code>library</code> - Show messages from the modules specified in the `DEBUG` environment variable only.</li>
	 * </ul>
	 * 
	 * Default: `program`
	 */
	mode?: 'debug' | 'program' | 'library';

	/**
	 * What type of date formatting to use.
	 * Defaults to simple.
	 */
	date?: 'simple' | 'full',

}
