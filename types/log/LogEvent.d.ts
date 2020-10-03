import { LogLevelConstants } from "./LogLevel";
/**
 * A record of a logging event.
 */
export default class LogEvent<LogLevel extends LogLevelConstants = LogLevelConstants> {
    /**
     * The {@link LogLevel severity level}.
     */
    readonly level: LogLevel;
    /**
     * The timestamp at which the event occurred.
     */
    readonly timestamp: Date;
    /**
     * The event message.
     */
    readonly message: string;
    /**
     * Any extra data supplied with the event.
     */
    readonly data: any;
    /**
     * The program module that produced the event.
     */
    readonly module: string;
    /**
     * Creates a new log event.
     *
     * @param level The log level.
     * @param timestamp The event timestamp.
     * @param module The module that produced the event.
     * @param message The event message.
     * @param data Extra data provided with the event.
     */
    constructor(level: LogLevel, timestamp: Date, module: string, message: string, data: any);
}
