var twitter = require("twitterKeys");
var inquirer = require("inquirer");

var command = process.argv[2];

if (command === "my-tweets") {
    var params = { screen_name: 'SuperShrekEars' };
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

else if (command === "spotify-this-song") {
    var songName = process.argv[3];
}

else if (command === "movie-this") {
    var movieName = process.argv[3];
}

else if (command === "do-what-it-says") {

}

// inquirer
//     .prompt([{
