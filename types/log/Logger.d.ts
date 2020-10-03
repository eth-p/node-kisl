import TypedEventEmitter from "typed-emitter";
import Transport from "../transport/Transport";
import LogEvent from "./LogEvent";
import { LogLevelConstants } from "./LogLevel";
declare const Logger_base: new () => TypedEventEmitter<Events>;
/**
 * A simple logger capable of producing {@link LogEvent log events} and transporting them to a destination.
 */
export default class Logger<LogLevel extends LogLevelConstants = LogLevelConstants> extends Logger_base {
    protected _transports: Transport<LogLevel>[];
    protected _module: string;
    /**
     * Creates a new logger.
     * @param options The logger options.
     */
    constructor(options: Options<LogLevel>);
    /**
     * Sends a log event across all transports.
     *
     * @param event The event to send.
     */
    log(event: LogEvent<LogLevel>): void;
    /**
     * Creates a child logger with a different module name.
     *
     * @param module The child logger module name.
     *
     * @return The child logger.
     */
    derive(module: string): Logger;
    /**
     * Logs an {@link LogLevel.INFO info} event.
     *
     * @param message The info message.
     * @param data Extra data to go along with the event.
     */
    info(message: string, data?: any): void;
    /**
     * Logs a {@link LogLevel.DEBUG debug} event.
     *
     * @param message The debug message.
     * @param data Extra data to go along with the event.
     */
    debug(message: string, data?: any): void;
    /**
     * Logs a {@link LogLevel.STATUS status} event.
     *
     * @param message The status message.
     * @param data Extra data to go along with the event.
     */
    status(message: string, data?: any): void;
    /**
     * Logs a {@link LogLevel.WARN warning} event.
     *
     * @param message The warning message.
     * @param data Extra data to go along with the event.
     */
    warn(message: string, data?: any): void;
    /**
     * Logs an {@link LogLevel.ERROR error} event.
     *
     * @param message The error message.
     * @param data Extra data to go along with the event.
     */
    error(message: string, data?: any): void;
    /**
     * Logs a {@link LogLevel.FATAL fatal error} event.
     *
     * @param message The error message.
     * @param data Extra data to go along with the event.
     */
    fatal(message: string, data?: any): void;
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
export {};
