// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
export {default as LogEvent} from "./log/LogEvent";
export {default as LogLevel} from "./log/LogLevel";
export {default as Logger} from "./log/Logger";

import _PlainTextFormatter from "./format/PlainTextFormatter";
import _ColorTextFormatter from "./format/ColorTextFormatter";

import _LogTransport from "./transport/Transport";
import _AbstractTransport from "./transport/AbstractTransport";
import _TextTransport from "./transport/TextTransport";

export namespace Transport {
	export type Transport = _LogTransport;
	export const Abstract = _AbstractTransport;
	export const Text = _TextTransport;
}

export namespace Formatter {
	export const PlainText = _PlainTextFormatter;
	export const ColorText = _ColorTextFormatter;
}

// Simple default logger.
import make from "./_simple";
export default make;
