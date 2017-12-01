//keys for Twitter and Spotify
var keys = require("./keys.js")
var inquirer = require("inquirer");

//user input
var userCommand = process.argv[2];
var userInput = process.argv[3];

//parse input
function parse() {
    var userInputArray = [];
    for (var i = 3; i < process.argv.length; i++) {
        userInputArray.push(process.argv[i]);
    }

    return userInputArray.join(' ');
}

//take input and call different functions
switch (userCommand) {
    case "my-tweets":
        tweet();
        break;

    case "spotify-this-song":
        spot();
        break;

    case "movie-this":
        flick();
        break;

    case "do-what-it-says":
        doIt();
        break;
}

//functions to be called:

//call Twitter API
function tweet() {
    var twitter = require("twitter");
    var client = new twitter(keys.twitterKeys);

    var parameters = {
        screen_name: 'SuperShrekEars',
        count: '20'
    };

    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var time = tweets[i].created_at;
                var text = tweets[i].text;
                console.log('Posted At: ' + time + '    ' + 'Post Content: ' + text);
            }
        }
        else {
            console.log('Error Occured:\n' + error);
        }
    });
}

//call Spotify API
function spot() {
    var spotify = require('node-spotify-api');
    var spotify = new spotify({
        id: keys.spotifyKeys.clientID,
        secret: keys.spotifyKeys.clientSecret
    });

    var songName = process.argv[3];
    if (!process.argv[3]) {
        songName = "The Sign artist:Ace of Base";
    }


    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //        console.log(data);
        //console.log(JSON.stringify(data.tracks.items[0], null, 4));

        var artists = [];
        for (let i in data.tracks.items[0].artists) {
            artists.push(data.tracks.items[0].artists[i].name);
        }

        console.log("Artist(s): " + artists.join(", "));
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("From Album: " + data.tracks.items[0].album.name);
    });
}

//call OMDB API
function flick() {

}

function doIt() {

}
// inquirer
//     .prompt([{
