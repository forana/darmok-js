"use strict";

var assert = require("assert");
var _ = require("lodash");
var util = require("./util");

var START = "START";
var END = "END";

var initTrail = function(length) {
    var trail = [];
    while (trail.length < length) {
        trail.push(START);
    }
    return trail;
};

var train = function (corpus, lookback) {
    var lookbackDistance = lookback + 1;
    assert(corpus.length > 0);
    assert(lookbackDistance > 0);
    assert(Math.floor(lookbackDistance) == lookbackDistance);

    var matrix = {
        sum: 0,
        children: {}
    };

    // add each training item to the matrix
    _.each(corpus, function(rawItem) {
        var trail = initTrail(lookbackDistance);

        var item = rawItem.split("");
        item.push(END);

        _.each(item, function(letter) {
            trail.push(letter);

            while (trail.length > lookbackDistance) {
                trail = trail.splice(1);
            };

            // div into matrix, create path along the way
            matrix.sum += 1;
            var dive = matrix;
            _.each(trail, function(part) {
                if (!dive.children) {
                    dive.children = {};
                }
                if (!dive.children.hasOwnProperty(part)) {
                    var newSegment = {
                        sum: 1
                    };
                    dive.children[part] = newSegment;
                    dive = newSegment;
                } else {
                    var segment = dive.children[part];
                    segment.sum += 1;
                    dive = segment;
                }
            });
        });
    });

    return new Generator(matrix, lookbackDistance);
}

var Generator = function (matrix, lookback) {
    this.generate = function (maxLength) {
        var trail = initTrail(lookback);
        var selections = [];

        var graceful = false;
        while (selections.length < maxLength || !maxLength) {
            // trim the trail
            while (trail.length > lookback - 1) {
                trail = trail.splice(1);
            }
            // navigate the matrix
            var dive = matrix;
            _.each(trail, function(part) {
                dive = dive.children[part];
            });
            // extract sums and values for choice
            var values = [];
            var sums = [];
            _.each(dive.children, function(value, key) {
                values.push(key);
                sums.push(value.sum);
            });
            // make choice
            var choice = util.weightedChoice(values, sums);
            // if it's the end keyword, call the word over - otherwise add and continue
            if (choice == END) {
                graceful = true;
                break;
            } else {
                selections.push(choice);
                trail.push(choice);
            }
        }

        var result = selections.join("");
        result.graceful = graceful;
        return result;
    };

    return this;
}

module.exports = train;
