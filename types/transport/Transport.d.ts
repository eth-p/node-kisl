import { LogLevelConstants } from "../log/LogLevel";
import LogEvent from "../log/LogEvent";
/**
 * A transport that can store or display log events.
 */
export default interface Transport<LogLevel extends LogLevelConstants = LogLevelConstants> {
    /**
     * Called to transport a logging event to a destination.
     *
     * @param event The event to transport.
     */
    transport(event: LogEvent<LogLevel>): void | Promise<void>;
}
