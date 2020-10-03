import { LogLevelConstants } from "../log/LogLevel";
import LogEvent from "../log/LogEvent";
import Transport from "./Transport";
/**
 * An abstract {@link Transport log transport} that can filter out log messages.
 */
export default abstract class AbstractTransport<LogLevel extends LogLevelConstants = LogLevelConstants> implements Transport<LogLevel> {
    protected _filter: Filter<LogLevel>;
    /**
     * Creates a new text transport.
     *
     * @param options The transport options.
     */
    protected constructor(options: Options<LogLevel>);
    /**
     * The set of log levels that will be transported.
     */
    get filter(): Filter<LogLevel>;
    set filter(filter: Filter<LogLevel>);
    /**
     * Checks if a logging event should be transported.
     *
     * @param event The event.
     * @return True if the event should be transported.
     *
     * @protected
     */
    protected isTransported(event: LogEvent<LogLevel>): boolean;
    abstract transport(event: LogEvent<LogLevel>): void | Promise<void>;
}
/**
 * A filter that determines if a log should be transported.
 */
export declare type Filter<LogLevel extends LogLevelConstants = LogLevelConstants> = (event: LogEvent<LogLevel>) => boolean;
export interface Options<LogLevel extends LogLevelConstants = LogLevelConstants> {
    /**
     * A filter that determines which events should be displayed.
     *
     * If not provides, all events will be displayed.
     */
    filter?: Filter<LogLevel>;
}
