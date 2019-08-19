require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// console.log(keys.spotify.id);
// console.log(keys.spotify.secret);

var moment = require("moment");
moment().format();

var axios = require("axios");

var command = process.argv[2];
// console.log(command);

var userInput = process.argv.slice(3).join(" ");
// console.log(userInput);

var output;

//search the Bands in Town Artist Events API

function BandInTownFunction() {
    if (userInput !== ""){
        var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
        axios.get(queryURL).then(function (response) {
            var concert = response.data;
                // console.log(response.data);
            if (concert.length === 0) {
                console.log ("There is no events for " + userInput)
            }else {
                console.log ("There are " + concert.length + " events for " + userInput);
            }
        

            for (i = 0; i < concert.length; i++){
                var date = concert[i].datetime;
                var convertedDate = moment(date, "YYYY-MM-DDTHH:mm:ss");
        
                output = "\n------------------\n" + ("Name of the venue: ") + concert[i].venue.name + ("\nVenue Location: ") + concert[i].venue.country + (", ") + concert[i].venue.city + ("\nEvent Date: ") + convertedDate.format("MM/DD/YY hh:mm A" );

                console.log(output)
            }
            
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);

            }); // to close error 



    } // to close response function

        }; // to close band in town function









/// function to look up movie on IMDB


function ImdbFunction() {
    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        if (userInput !== ""){
        axios.get(queryURL).then(function (response) {
            var movie = response.data;
            // console.log(response.data);
            
            output = "\n---------------------\n" + ("Title of the movie: ") + movie.Title + ("\nYear: ") + movie.Year + ("\nIMDB Rating: ") + movie.imdbRating + ("\nRotten Tomatoes Rating: ") + movie.Ratings[1].Value + ("\nCountry: ") + movie.Country + ("\nLanguage: ") + movie.Language + ("\nPlot: ") + `${movie.Plot}\n` + ("\nActors: ") + movie.Actors;

            console.log(output);
            
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
                

            }); // to close error 

        }
        else {
                var queryURL = "http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=trilogy";
                axios.get(queryURL).then(function(response){
                    var movie = response.data;

                    
                output = "\n---------------------\n" + "Ooops! you forgot to put the name of the movie!Here is our recommendation" +("\nTitle of the movie: ") + movie.Title + ("\nYear: ") + movie.Year + ("\nIMDB Rating: ") + movie.imdbRating + ("\nRotten Tomatoes Rating: ") + movie.Ratings[1].Value + ("\nCountry: ") + movie.Country + ("\nLanguage: ") + movie.Language + ("\nPlot: ") + `${movie.Plot}\n` + ("\nActors: ") + movie.Actors;
                    
        
                    console.log(output);
                });


    } // to close response function

        }; // to close band in IMDB function









        /// Spotify Function 


    function SpotifyFuction() {
        if(userInput !== ""){
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } // to close 2nd if
          var song = data.tracks;

            output = "\n--------------------------\n" + ("Artist(s): ") + song.items[0].artists[0].name + ("\nSong name: ") + song.items[0].name + ("\nSpotify Preview Link: ") + song.items[0].preview_url + ("\nSong Album: ") + song.items[0].album.name;

            console.log(output);
           
        }) 
    } // to close first if
    else {
            spotify.search({type: 'track', query: 'The Sign'}, function(err, data){
                if (err){
                    return console.log('Error occurred: ' + err);
                }
                var song = data.tracks;

            output = "\n--------------------------\n" + ("Artist(s): ") + song.items[0].artists[0].name + ("\nSong name: ") + song.items[0].name + ("\nSpotify Preview Link: ") + song.items[0].preview_url + ("\nSong Album: ") + song.items[0].album.name;
    
                console.log(output);
            });
    }
        
    } // to close SpotifyFunction




    /// Do what it says function 


    function doWhatItSays() {
       
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            console.log("Error");
        }  else{
    
    console.log(data); 
    var output = data.split(",");
    command = output[0];
    userInput = output[1];   
    switch (command) {
        case "concert-this":
            return BandInTownFunction();
        case "movie-this":
            return ImdbFunction();
        case "spotify-this-song":
            return SpotifyFuction();
        
    };
        };
        
    }); // to close read File function

        
    } // to close Do what it says function







        switch (command) {
            case "concert-this":
                return BandInTownFunction();
            case "movie-this":
                return ImdbFunction();
            case "spotify-this-song":
                return SpotifyFuction();
            case "do-what-it-says":
                return doWhatItSays();
        };

        