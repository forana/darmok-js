var darmok = require("./src/darmok");

var starnames = darmok.util.splitFile("starnames.txt");
var generator = darmok.markov(starnames, 2);

for (var i = 0; i < 25; i++) {
    console.log(generator.generate());
}
