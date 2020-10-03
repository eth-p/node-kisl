import { LogLevelConstants } from "../log/LogLevel";
import LogEvent from "../log/LogEvent";
import TextFormatter from "../format/TextFormatter";
import AbstractTransport, { Options as SuperOptions } from "./AbstractTransport";
/**
 * A {@link Transport log transport} that writes text to some destination.
 */
export default class TextTransport<LogLevel extends LogLevelConstants = LogLevelConstants> extends AbstractTransport<LogLevel> {
    protected formatter: TextFormatter;
    protected destination: Options<LogLevel>['destination'];
    /**
     * Creates a new text transport.
     *
     * @param options The transport options.
     */
    constructor(options: Options<LogLevel> & SuperOptions<LogLevel>);
    transport(event: LogEvent<LogLevel>): void | Promise<void>;
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
