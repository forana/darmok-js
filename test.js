"use strict";

var assert = require("assert");
var _ = require("lodash");
var util = require("./src/util");
var darmok = require("./src/darmok");

var expectFailure = function(callback) {
    return function() {
        var caught = false;
        try {
            callback();
        } catch (e) {
            caught = true;
        }
        assert(caught);
    };
};

describe("darmok", function() {
    describe("markov", function() {
        it("should error on an empty corpus", expectFailure(function() {
            darmok.markov([], 1);
        }));

        it("should error on invalid lengths", function() {
            expectFailure(function() {
                darmok.markov(["hey"], 0);
            });
            expectFailure(function() {
                darmok.markov(["listen"], -1);
            });
            expectFailure(function() {
                darmok.markov(["watch", "out"], "navi");
            });
            expectFailure(function() {
                darmok.markov(["hello"], 3.15159);
            });
        });
    });

    describe("sentence", function() {
        it("should error when no frames are given", expectFailure(function() {
            darmok.sentence({}, {});
        }));

        it("should not error when no sentences are given", function() {
            darmok.sentence({"hey": 1});
        });

        it("should return exactly what's given if one option is sent across the board", function() {
            var result = darmok.sentence({"{who} am {name}": 1}, {who: ["I"], name: ["Groot"]}).generate();
            assert(result == "I am Groot", "received " + result);
        });
    });
});

describe("util", function() {
    describe("weightedChoice", function() {
        it("should choose something", function() {
            var choice = util.weightedChoice([1,2,3], [1,1,1]);
            assert(choice != null);
            assert(_.contains([1,2,3], choice));
        });
        it("should return the only option when only one is given", function() {
            var choice = util.weightedChoice(["you"], [1000]);
            assert(choice == "you");
        });
        it("should error out if arrays are empty", expectFailure(function() {
            util.weightedChoice([], []);
        }));
        it("should error out if array dimensions mismatch", expectFailure(function() {
            util.weightedChoice([1,2], [1,2,3]);
        }));
    });
});
