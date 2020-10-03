export { default as LogEvent } from "./log/LogEvent";
export { default as LogLevel } from "./log/LogLevel";
export { default as Logger } from "./log/Logger";
import _PlainTextFormatter from "./format/PlainTextFormatter";
import _ColorTextFormatter from "./format/ColorTextFormatter";
import _LogTransport from "./transport/Transport";
import _AbstractTransport from "./transport/AbstractTransport";
import _TextTransport from "./transport/TextTransport";
export declare namespace Transport {
    type Transport = _LogTransport;
    const Abstract: typeof _AbstractTransport;
    const Text: typeof _TextTransport;
}
export declare namespace Formatter {
    const PlainText: typeof _PlainTextFormatter;
    const ColorText: typeof _ColorTextFormatter;
}
import make from "./_simple";
export default make;
