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
console.log(command);

var userInput = process.argv.slice(3).join(" ");
console.log(userInput);

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






        // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        //   if (err) {
        //     return console.log('Error occurred: ' + err);
        //   }

        // console.log(data); 
        // });


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

        