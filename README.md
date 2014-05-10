# darmok.js
A random name generator for node.js, named for an episode of Star Trek [http://en.wikipedia.org/wiki/Darmok](http://en.wikipedia.org/wiki/Darmok).

## Installation
`npm install darmok`

## Usage
### darmok.markov(entries, lookbackDistance)
Creates a generator that will create names via Markov chain.

* `entries` - Array of words to train on. These are case-sensitive.
* `lookbackDistance` - The number of previous characters to consider when choosing the next letter in a word. `1` would mean the previous letter is considered, and your results would be fairly random but somewhat make sens. `0` would mean no previous letters considered, and your results would be a nonsensical jumble. But, go too high and your results will just return the entries you gave it to train with. Observationally, `2` is a pretty good balance.

Returns a `generator` object.

### darmok.sentence(frames, categories)
Creates a generator that will generate names based on a randomly-chosen string template and some categories of words.

The templates are of the form:

```This is a {template}```

Where `{template}` is a placeholder for the string variable `template`.

* `frames` - An object whose property names are sentence templates, and the corresponding values are the relative chance for that template to be selected (values don't have to total to 1, but they do have to total to positive).
* `categories` - An object whose property names correspond to variables from the templates in `frames`, and the corresponding values are arrays of strings to be randomly chosen from for the values of those variables).

(refer to `example.js` if this is confusing)

Returns a `generator` object (which will entirely ignore `maxLength`).

### *generator*.generate([maxLength])
Returns a generated name with an optional maximum length specified by `maxLength` (if not specified).

No minimum length is guaranteed.

The returned string will have an additional property `graceful` - if the word generation is cut short by hitting `maxLength`, this value will be truthy (can be used to repeat generation if word quality is a concern).

### darmok.util.splitFile(filename[, options])
Reads a file synchronously and returns an array of trimmed non-empty entries. Useful for loading word lists.

The parameters are the same as what's passed to `fs.readFileSync`. If not specified, options defaults to UTF-8 encoding.

## Example
See `example.js`.

## Tests
Using mocha (recommend `npm install -g mocha`):

```
$ mocha
  
  ․․․․․․

  9 passing (7ms)
```

## License
MIT

## Changelog
* 10/05/2014 - v0.1.0 - Initial push
