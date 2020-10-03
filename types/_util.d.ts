/**
 * Compiles a function that checks if a `DEBUG=...` environment variable matches a module name.
 *
 * @param debug The debug pattern to compile.
 *
 * @return A function that checks module names against the compiled pattern.
 */
export declare function compileDebugMatcher(debug: string): (module: string) => boolean;
