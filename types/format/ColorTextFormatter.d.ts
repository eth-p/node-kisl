import { LogLevelConstants } from "../log/LogLevel";
import PlainTextFormatter from "./PlainTextFormatter";
/**
 * A {@link TextFormatter text formatter} that generates ANSI-colored text from a log event.
 */
export default class ColorTextFormatter<Opts, LogLevel extends LogLevelConstants = LogLevelConstants> extends PlainTextFormatter<Opts & Options, LogLevel> {
    protected colors: Options['colors'] | null;
    /**
     * Creates a new color text formatter.
     * This formats log levels similarly to {@link PlainTextFormatter}, but with ANSI colors.
     *
     * @param options The formatter options.
     */
    constructor(options?: Opts & Options);
    protected formatLevel(level: LogLevel): string;
    protected formatModule(module: string): string;
    protected formatTimestampDate(timestamp: Date): string;
    protected formatTimestampTime(timestamp: Date): string;
    protected formatMessage(message: string): string;
    protected formatData(data: any): string;
    protected generateIndent(length: number): string;
    protected strlen(str: string): number;
}
export declare type Color = (text: string) => string;
export interface Options {
    /**
     * Colors.
     */
    colors?: {
        level_debug?: Color;
        level_status?: Color;
        level_info?: Color;
        level_warn?: Color;
        level_error?: Color;
        level_fatal?: Color;
        timestamp_date?: Color;
        timestamp_time?: Color;
        modules?: Color;
        module?: {
            [key: string]: Color;
        };
        message?: Color;
        indent?: Color;
    };
}
