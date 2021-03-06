//dependencies
var request = require('request');
var keys = require("./keys.js");
var fs = require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


//user input
var userInfo = process.argv;
var userCommand = userInfo[2];
var userInput = userInfo[3];

//parse input
function parse() {
    var userInputArray = [];
    for (var i = 3; i < process.argv.length; i++) {
        userInputArray.push(userInfo[i]);
    }

    return userInputArray.join(' ');
}

//take input and call different functions
function liriGo() {
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
}

//functions to be called:

//call Twitter API
function tweet() {
    var twitter = new Twitter(keys.twitterKeys);

    var parameters = {
        screen_name: 'SuperShrekEars',
        count: '20'
    };

    twitter.get('statuses/user_timeline', parameters, function(error, tweets, response) {
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
function spot(songName) {
    var spotify = new Spotify({
        id: keys.spotifyKeys.clientID,
        secret: keys.spotifyKeys.clientSecret
    });

    songName = userInfo[3];
    console.log("user input is: " + userInput);

    if (!songName) {
        songName = "The Sign artist:Ace of Base";
    }

    //got this bit from fellow student Stephen Chapman
    //adding double quotes makes spotify API search by order of terms
    else {
        songName = '"' + songName + '"';
    }


    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

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
function flick(movieName) {
    var movieName = userInput;

    //return info for "Mr.Nobody" if no user input
    if (!movieName) {
        movieName = "Mr. Nobody";
    }

    // insert '+' in blank spaces
    movieName = movieName.replace(/ /g, "+");

    // call OMDB API with movie name
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function doIt() {

    // Read the random.txt file
    // Store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var newData = data.split(",");

        for (var i = 0; i < newData.length; i++) {
            userInfo[i + 2] = newData[i].trim();
        }

        console.log(newData);
        console.log(newData[0]);
        console.log(newData[1]);
        console.log(userInfo[3]);
        console.log(userInput);
        //call the specified function

        spot(userInfo[3]);

        //wasn't getting switch to work

        // switch (newData[0]) {
        //     case "my-tweets":
        //         tweet();
        //         break;

        //     case "spotify-this-song":
        //         console.log("user input is: " + userInput);
        //         spot(userInput);
        //         break;

        //     case "movie-this":
        //         console.log("user input is: " + userInput);
        //         flick(userInput);
        //         break;
        // }
    });
}

liriGo();
// inquirer
//     .prompt([{
