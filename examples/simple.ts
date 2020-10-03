import make from "..";

// Create the logger.
const logger = make();

// Print log messages.
// By default, these will be printed to the process standard output stream.
logger.debug("This is a debug message.");
logger.debug("Show it with DEBUG=main or DEBUG='*'");

logger.status("Status message.");
logger.info("Info message.");
logger.warn("Warning message.");
logger.error("Error message.");
logger.fatal("Fatal error message.");

// You can also create child loggers that share the same settings as the parent logger.
const another = logger.derive('child');
another.info("I'm a child logger!");
