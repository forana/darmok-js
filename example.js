var darmok = require("./src/darmok");
var _ = require("lodash");

var starnames = darmok.util.splitFile("starnames.txt");
var generator = darmok.markov(starnames, 2);

console.log("Star names:");
_.times(25, function() {
    console.log("    " + generator.generate());
});

console.log();

var shipSentenceFrames = {
    "{actor} of {awesome}": 3,
    "{awesome}'s {actor}": 2,
    "{adjective} {awesome}": 2,
    "{adjective} {actor}": 2,
    "{adjective} {actor} of {awesome}": 1,
    "{actor} {adjective}{awesome}": 1
};

var shipCategories = {
    actor: [
        "Bringer",
        "Destroyer",
        "Conveyor",
        "Adjucator",
        "Judge",
        "Treader",
        "Explorer",
        "Greeter",
        "Educator",
        "Trickster",
        "Hawk",
        "Falcon",
        "Gazebo"
    ],
    awesome: [
        "Death",
        "Destruction",
        "Light",
        "Life",
        "Lasers",
        "Exploding",
        "Cutting",
        "Screaming"
    ],
    adjective: [
        "Deadly",
        "Whispering",
        "Warp",
        "Mega",
        "Supreme",
        "Colossal",
        "Clandestined",
        "Millenium",
        "Imperial",
        "Invincible"
    ]
};

generator = darmok.sentence(shipSentenceFrames, shipCategories);
console.log("Ship names:");

_.times(25, function() {
    console.log("    " + generator.generate());
});
