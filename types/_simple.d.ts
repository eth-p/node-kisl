import Logger from "./log/Logger";
import { LogLevelConstants } from "./log/LogLevel";
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
interface Options<LogLevel extends LogLevelConstants = LogLevelConstants> {
    /**
     * Use colors in the logger?
     */
    color?: boolean | 'auto';
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
    date?: 'simple' | 'full';
}
export {};
