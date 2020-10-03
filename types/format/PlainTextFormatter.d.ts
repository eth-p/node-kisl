import { LogLevelConstants } from "../log/LogLevel";
import LogEvent from "../log/LogEvent";
import TextFormatter from "./TextFormatter";
/**
 * A {@link TextFormatter text formatter} that generates plain text from a log event.
 */
export default class PlainTextFormatter<Opts, LogLevel extends LogLevelConstants = LogLevelConstants> implements TextFormatter {
    protected options: Opts & Options;
    constructor(options?: Opts & Options);
    /**
     * Formats the log level.
     *
     * @param level The log level.
     * @return The formatted log level.
     *
     * @protected
     */
    protected formatLevel(level: LogLevel): string;
    /**
     * Formats the module.
     *
     * @param module The module that caused the event.
     * @return The formatted module.
     *
     * @protected
     */
    protected formatModule(module: string): string;
    /**
     * Formats the date portion of a timestamp.
     *
     * @param timestamp The timestamp.
     * @return The formatted date portion of the timestamp.
     *
     * @protected
     */
    protected formatTimestampDate(timestamp: Date): string;
    /**
     * Formats the time portion of a timestamp.
     *
     * @param timestamp The timestamp.
     * @return The formatted time portion of the timestamp.
     *
     * @protected
     */
    protected formatTimestampTime(timestamp: Date): string;
    /**
     * Formats the time stamp.
     *
     * @param timestamp The timestamp to format.
     * @return The formatted timestamp.
     *
     * @protected
     */
    protected formatTimestamp(timestamp: Date): string;
    /**
     * Formats the message.
     *
     * @param message The message.
     * @return The formatted message.
     *
     * @protected
     */
    protected formatMessage(message: string): string;
    /**
     * Formats the extra event data.
     *
     * @param data The event data.
     * @return The formatted event data.
     *
     * @protected
     */
    protected formatData(data: any): string;
    /**
     * Gets the length of a string.
     * Don't question it.
     *
     * @param str The string.
     * @return The string length.
     *
     * @protected
     */
    protected strlen(str: string): number;
    /**
     * Generates indentation for multiline log messages.
     *
     * @param length The indentation length.
     *
     * @protected
     */
    protected generateIndent(length: number): string;
    /**
     * Called to format a logging event.
     *
     * @param event The event.
     *
     * @return The corresponding string.
     */
    format(event: LogEvent<LogLevel>): string;
}
export interface Options {
    /**
     * Format the event level.
     */
    level?: boolean;
    /**
     * Format the event time.
     */
    time?: boolean;
    /**
     * Format the event date.
     */
    date?: boolean;
    /**
     * Format the event data.
     */
    data?: boolean;
    /**
     * Format the event source module.
     */
    module?: boolean;
}
