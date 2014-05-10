var assert = require("assert")
var _ = require("lodash")

/*
    Given an array of options and an array of values corresponding to the probability of each,
    choose one randomly.

    (the probabilities do not need to total to 1, but they do need to have a positive total)
*/
module.exports.weightedChoice = function(options, weights) {
    assert(options.length == weights.length, "Options and weights must be the same length");
    assert(options.length > 0, "Must provide at least one option");

    var weightSum = _.reduce(weights, function(sum, weight) {
        return weight + sum;
    }, 0);

    assert(weightSum >= 0, "Weights must sum to zero (got " + JSON.stringify(weights) + ")");

    var random = Math.random();
    var rollingTotal = 0;
    for (var i=0; i<options.length; i++) {
        rollingTotal += weights[i]/weightSum;
        if (rollingTotal >= random) {
            return options[i];
        }
    }

    // shouldn't be possible, so let's throw a stupid message
    throw {"message": "weightedChoice() returned nothing"};
};

/*
    Load a file and split it into trimmed lines, ignoring whitespace
*/
module.exports.splitFile = function(filename, options) {
    if (!options) {
        options = {
            encoding: "UTF-8"
        };
    }
    var fs = require("fs");
    var file = fs.readFileSync(filename, options);
    file.replace("/r", "/n");
    var lines = []
    _.each(file.split("\n"), function(line) {
        line = line.trim();
        if (line.length > 0) {
            lines.push(line);
        }
    });
    return lines;
};
