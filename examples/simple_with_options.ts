import make, {LogLevel} from "..";

const logger = make('name', {

	/*
	 * Use ANSI colors in the logger.
	 * 
	 * 'auto' -- Automatically, depending on NO_COLOR and if printing to a terminal.
	 * false  -- No.
	 * true   -- Yes.
	 * 
	 * Default: 'auto'
	 */
	color: false,

	/*
	 * A list of log levels that will be shown by default.
	 * 
	 * Default: Everything except debug.
	 */
	levels: ['debug', LogLevel.ERROR],

	/*
	 * Change the mode that kisl is operating in.
	 * 
	 * 'debug'   -- Show messages from all modules, regardless of the levels option above.
	 * 'library' -- Show messages from the modules specified in the `DEBUG` environment variable only.
	 * 'program' -- Show non-filtered (i.e. anything excluded in the levels option) messages by default. 
	 *              Any modules that are specified in the `DEBUG` environment variable will have all messages shown.
	 *
	 * Default: 'program'
	 */
	mode: 'program',

	/*
	 * What type of date formatting to use.
	 * Simple date formatting omits the date information, while full shows both the date and time.
	 * 
	 * Default: 'simple'
	 */
	date: 'simple', // Or 'full'
	
});
