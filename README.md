# darmok.js
A random word generator for node.js, named for an episode of Star Trek [http://en.wikipedia.org/wiki/Darmok](http://en.wikipedia.org/wiki/Darmok).

## Installation
`npm install darmok`

## Usage
### darmok.markov(entries, lookbackDistance)
Creates a name generator that will create words via Markov chain.

* `entries` - Array of words to train on. These are case-sensitive.
* `lookbackDistance` - The number of previous characters to consider when choosing the next letter in a word. `1` would mean the previous letter is considered, and your results would be fairly random but somewhat make sens. `0` would mean no previous letters considered, and your results would be a nonsensical jumble. But, go too high and your results will just return the entries you gave it to train with. Observationally, `2` is a pretty good balance.

Returns a `generator` object.

### *generator*.generate([maxLength])
Returns a generated word with an optional maximum length specified by `maxLength` (if not specified).

No minimum length is guaranteed.

The returned string will have an additional property `graceful` - if the word generation is cut short by hitting `maxLength`, this value will be truthy (can be used to repeat generation if word quality is a concern).

### darmok.util.splitFile(filename[, options])
Reads a file synchronously and returns an array of trimmed non-empty entries. Useful for loading word lists.

The parameters are the same as what's passed to `fs.readFileSync`. If not specified, options defaults to UTF-8 encoding.

## Tests
Using mocha (recommend `npm install -g mocha`):

```
$ mocha
  
  ․․․․․․

  6 passing (7ms)
```

## Changelog
* 10/05/2014 - v0.1.0 - Initial push