// ---------------------------------------------------------------------------------------------------------------------
// node-kisl | Copyright (C) 2020 eth-p | MIT License
// https://github.com/eth-p/node-kisl
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Compiles a function that checks if a `DEBUG=...` environment variable matches a module name.
 * 
 * @param debug The debug pattern to compile.
 * 
 * @return A function that checks module names against the compiled pattern.
 */
export function compileDebugMatcher(debug: string): (module: string) => boolean {
	function formatRegex(char: string) {
		switch (char) {
			case "*":
				return '[^:]*';
				
			case "**":
				return ".*";
				
			default:
				return `\\u{${char.charCodeAt(0).toString(16)}}`;
		}
	}
	
	const patterns: [RegExp, boolean][] = debug.split(",")
		.map(p => p.trim())
		.map(p => (p.startsWith('-') ? [p.substring(1), false] : [p, true]) as [string, boolean])
		.map(([p, type]) => [
			new RegExp(`^${Array.from(p).map(formatRegex).join('')}$`, 'u'),
			type
		]);
	
	return function(module: string) {
		let result = false;
		
		patterns.forEach(([pattern, type]) => {
			if (pattern.test(module)) {
				result = type;
			}
		});
		
		return result;
	}
}
