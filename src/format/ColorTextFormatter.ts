// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------
import {inspect} from "util";
import * as Colors from "ansi-colors";
import {stripColor} from "ansi-colors";

import DefaultLogLevel, {LogLevelConstants} from "../log/LogLevel";

import TextFormatter from "./TextFormatter";
import PlainTextFormatter from "./PlainTextFormatter";


/**
 * A {@link TextFormatter text formatter} that generates ANSI-colored text from a log event.
 */
export default class ColorTextFormatter<Opts, LogLevel extends LogLevelConstants = LogLevelConstants> extends PlainTextFormatter<Opts & Options, LogLevel> {

	protected colors: Options['colors'] | null;

	// -------------------------------------------------------------------------------------------------------------
	// Constructor
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new color text formatter.
	 * This formats log levels similarly to {@link PlainTextFormatter}, but with ANSI colors.
	 *
	 * @param options The formatter options.
	 */
	public constructor(options?: Opts & Options) {
		super(options);
		this.colors = options?.colors ?? null;
	}


	// -------------------------------------------------------------------------------------------------------------
	// Override: PlainTextFormatter
	// -------------------------------------------------------------------------------------------------------------

	protected formatLevel(level: LogLevel): string {
		const uncolored = super.formatLevel(level);
		switch (level) {
			case DefaultLogLevel.DEBUG:
				return (this.options.colors?.level_debug ?? Colors.dim)(uncolored);

			case DefaultLogLevel.STATUS:
				return (this.options.colors?.level_status ?? plain)(uncolored);

			case DefaultLogLevel.INFO:
				return (this.options.colors?.level_info ?? plain)(uncolored);

			case DefaultLogLevel.WARN:
				return (this.options.colors?.level_warn ?? Colors.yellow)(uncolored);

			case DefaultLogLevel.ERROR:
				return (this.options.colors?.level_error ?? Colors.red)(uncolored);

			case DefaultLogLevel.FATAL:
				return (this.options.colors?.level_fatal ?? Colors.redBright)(uncolored);

			default:
				return ((this.options.colors as { [key: string]: Color | undefined })?.[`level_${level}`] ?? plain)(uncolored);
		}
	}

	protected formatModule(module: string): string {
		const color = this.options.colors?.module?.[module] ?? this.options.colors?.modules ?? Colors.bold;
		return color(super.formatModule(module));
	}

	protected formatTimestampDate(timestamp: Date): string {
		return (this.options.colors?.timestamp_date ?? Colors.cyan.dim)(super.formatTimestampDate(timestamp));
	}

	protected formatTimestampTime(timestamp: Date): string {
		return (this.options.colors?.timestamp_time ?? Colors.cyan)(super.formatTimestampTime(timestamp));
	}

	protected formatMessage(message: string): string {
		return (this.options.colors?.message ?? plain)(super.formatMessage(message));
	}

	protected formatData(data: any): string {
		const depth = 20;
		const compact = inspect(data, {
			compact: true,
			colors: true,
			depth,
		});

		if (this.strlen(compact) <= 40) return compact;
		return inspect(data, {
			compact: false,
			colors: true,
			depth
		});
	}

	protected generateIndent(length: number): string {
		return (this.options.colors?.indent ?? Colors.dim)(super.generateIndent(length));
	}

	protected strlen(str: string): number {
		return stripColor(str).length;
	}

}

export type Color = (text: string) => string;
const plain = ((s: string) => s);

export interface Options {

	/**
	 * Colors.
	 */
	colors?: {

		// Levels
		level_debug?: Color,
		level_status?: Color,
		level_info?: Color,
		level_warn?: Color
		level_error?: Color,
		level_fatal?: Color,

		// Timestamp
		timestamp_date?: Color,
		timestamp_time?: Color,

		// Module
		modules?: Color
		module?: { [key: string]: Color }

		// Message
		message?: Color

		// Misc
		indent?: Color

	}

}
