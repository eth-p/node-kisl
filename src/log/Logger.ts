// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import EventEmitter from "events";
import TypedEventEmitter from "typed-emitter";

import Transport from "../transport/Transport";

import LogEvent from "./LogEvent";
import DefaultLogLevel, {LogLevelConstants} from "./LogLevel";


/**
 * A simple logger capable of producing {@link LogEvent log events} and transporting them to a destination.
 */
export default class Logger<LogLevel extends LogLevelConstants = LogLevelConstants>
	extends (EventEmitter as unknown as new () => TypedEventEmitter<Events>) {

	protected _transports: Transport<LogLevel>[];
	protected _module: string;


	// -------------------------------------------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new logger.
	 * @param options The logger options.
	 */
	public constructor(options: Options<LogLevel>) {
		super();

		this._transports = options.transports.slice(0);
		this._module = options.module ?? 'main';
	}


	// -------------------------------------------------------------------------------------------------------------
	// Methods: Protected
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Sends a log event across all transports.
	 *
	 * @param event The event to send.
	 */
	public log(event: LogEvent<LogLevel>) {
		this._transports.forEach(transport => {
			const result = transport.transport(event);
			if (typeof result === 'object' && typeof result.then === 'function') {
				result.then(() => {
				}, (error: Error) => {
					this.emit('error', error);
				})
			}
		});

		this.emit('log', event);
	}


	// -------------------------------------------------------------------------------------------------------------
	// Methods
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a child logger with a different module name.
	 *
	 * @param module The child logger module name.
	 *
	 * @return The child logger.
	 */
	public derive(module: string): Logger {
		const child = new Logger({
			transports: this._transports,
			module
		});

		child._transports = this._transports;  // Force reference to be the same as the parent.

		return child;
	}


	// -------------------------------------------------------------------------------------------------------------
	// Methods: Utility
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Logs an {@link LogLevel.INFO info} event.
	 *
	 * @param message The info message.
	 * @param data Extra data to go along with the event.
	 */
	public info(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.INFO as LogLevel, new Date(), this._module, message, data));
	}

	/**
	 * Logs a {@link LogLevel.DEBUG debug} event.
	 *
	 * @param message The debug message.
	 * @param data Extra data to go along with the event.
	 */
	public debug(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.DEBUG as LogLevel, new Date(), this._module, message, data));
	}

	/**
	 * Logs a {@link LogLevel.STATUS status} event.
	 *
	 * @param message The status message.
	 * @param data Extra data to go along with the event.
	 */
	public status(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.STATUS as LogLevel, new Date(), this._module, message, data));
	}

	/**
	 * Logs a {@link LogLevel.WARN warning} event.
	 *
	 * @param message The warning message.
	 * @param data Extra data to go along with the event.
	 */
	public warn(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.WARN as LogLevel, new Date(), this._module, message, data));
	}

	/**
	 * Logs an {@link LogLevel.ERROR error} event.
	 *
	 * @param message The error message.
	 * @param data Extra data to go along with the event.
	 */
	public error(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.ERROR as LogLevel, new Date(), this._module, message, data));
	}

	/**
	 * Logs a {@link LogLevel.FATAL fatal error} event.
	 *
	 * @param message The error message.
	 * @param data Extra data to go along with the event.
	 */
	public fatal(message: string, data?: any) {
		this.log(new LogEvent<LogLevel>(DefaultLogLevel.FATAL as LogLevel, new Date(), this._module, message, data));
	}

}

interface Events<LogLevel extends LogLevelConstants = LogLevelConstants> {
	log: (event: LogEvent<LogLevel>) => void;
	error: (error: Error) => void;
}

interface Options<LogLevel extends LogLevelConstants = LogLevelConstants> {

	/**
	 * The transports to send log events through.
	 */
	transports: Transport<LogLevel>[];

	/**
	 * The module name.
	 * This defaults to "main".
	 */
	module?: string;
	
}
