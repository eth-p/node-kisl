import {Logger, Transport, Formatter, LogEvent} from "..";

const logger = new Logger({

	/*
	 * An array of transports that send the log events to somewhere for display or storage.
	 * These are essentially just objects with a `transport(LogEvent)` function.
	 * 
	 * Included in kisl:
	 * 
	 * * kisl.Transport.Text  -- Formats events as text and passes the formatted text along to a function. 
	 * 
	 */
	transports: [

		/*
		 * Custom transport.
		 */
		{
			transport: event => {
				if (event.level === 'error' || event.level === 'fatal') {
					console.error('ERROR', event);
				}
			}
		},
		
		/*
		 * Built-in text transport.
		 */
		new Transport.Text({

			/*
			 * The transport destination.
			 * REQUIRED.
			 *
			 * kisl doesn't care where or how the event reaches its destination, and gives you the freedom
			 * (and responsibility) to figure that out entirely by yourself.
			 */
			destination: (formatted: string) => console.log(formatted),
			
			/*
			 * The filter function.
			 * This accepts a log event and returns `true` if the event should be formatted and sent to the destination.
			 * 
			 * If not specified, all events will be transported.
			 */
			filter: (event: LogEvent) => !event.message.includes('debug'),

			/*
			 * The formatter to use when formatting log messages.
			 * Similarly to transports, this is an interface with a `format(LogEvent)` function that returns a string.
			 * 
			 * If not specified, a plain text formatter will be used.
			 * 
			 * Included in kisl:
			 * 
			 * * kisl.Formatter.PlainText  -- Formats events into plain text.
			 * * kisl.Formatter.ColorText  -- Formats events into plain text with ANSI colors.
			 * 
			 */
			formatter: new Formatter.ColorText({

				// Display Options:
				
				level: true,   // Display the event level.
				time: true,    // Display the time of day in which the event occurred.
				date: true,    // Display the date in which the event occurred.
				data: true,    // Display any additional data that was passed to the event.
				module: true,  // Display the module/logger name that generated the event.
				
				// Color Options:
				
				/*
				 * An object containing color formatting functions.
				 * These functions accept a string and return a string formatted with ANSI color.
				 * 
				 * Example:
				 * 
				 *    text => `\x1B[33m${text}\x1B[0m`
				 * 
				 * It is recommended to use 'chalk' or 'ansi-colors' instead of manual color functions, however.
				 */
				colors: {

					/*
					 * level_[level]: Color
					 * These options set the color for each individual level.
					 */

					/*
					 * timestamp_[date|time]: Color
					 * These options set the color for the date and time segments of the timestamp.
					 */

					/*
					 * modules: Color
					 * The default color for all modules.
					 */

					/*
					 * module: {[key: string]: Color}
					 * Colors specifically assigned to named modules.
					 */

					/*
					 * message: Color
					 * The color for the event message text. 
					 */

					/*
					 * indent: Color
					 * The color for the '....' indentation for multi-lined messages. 
					 */

				}
				
			})
			
		})
	],

	/*
	 * The module/logger name.
	 * This defaults to "main" if unspecified.
	 */
	module: 'my-logger'

});

logger.debug("This is a debug message.");
logger.debug("Show it with DEBUG=main or DEBUG='*'");

logger.status("Status message.");
logger.info("Info message.");
logger.warn("Warning message.");
logger.error("Error message.");
logger.fatal("Fatal error message.");
