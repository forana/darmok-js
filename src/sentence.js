"use strict";

var _ = require("lodash");
var assert = require("assert");
var stringformat = require("stringformat");
var util = require("./util");

module.exports = function(sentenceFrames, categories) {
    assert(_.keys(sentenceFrames).length > 0, "Must give at least one sentence frame");
    return {
        generate: function() {
            var probs = [];
            var frames = [];
            _.each(sentenceFrames, function (prob, frame) {
                probs.push(prob);
                frames.push(frame);
            });

            var frame = util.weightedChoice(frames, probs);
            var words = {};
            _.each(categories, function(wordList, category) {
                words[category] = util.randomChoice(wordList);
            });

            return stringformat(frame, words);
        }
    };
};
