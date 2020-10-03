# kisl

A simple, no-bells, no-whistles NodeJS TypeScript logger that follows the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle).


## Features

- Small dependency tree.
- Simple setup.
- Easy to extend.
- ANSI colors (when printing to terminal).
- Supports the [NO_COLOR standard](https://no-color.org/).
- Supports the `DEBUG=[module]` environment variable.
 

## Usage

When used in a program, kisl is meant to be extremely simple to set up.
It doesn't support logging to files, file rotation, or anything complex like sending log events to a remote location.

It's as easy to use as this:

```js
const logger = require('kisl')();

logger.info('Hello, world!');
```

For more advanced usage, check out the [advanced setup example](examples/advanced.ts).

