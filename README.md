# liri-node-app

 https://chuckthefrenchie.github.io/liri-node-app/

 
LIRI is a Language Interpretation and Recognition Interface.
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.


It is a command line node app that takes in parameters and gives you back data.

liri.js can take in one of the following commands:

   `concert-this`
   `spotify-this-song`
   `movie-this`
   `do-what-it-says`

And it will search for the bands in town, show you the information for your favourite song, or give you info about the movie you chose. 

Aslo LIRI can take the text inside of random.txt and then use it to call one of LIRI's commands.

* `concert-this`

if you enter " node liri.js concert-this 'name of your fav band' " it will retrive information about the upcoming concerts of the chosen band

* `spotify-this-song`

if you enter " node liri.js spotify-this-song 'name of your fav song' " it will retrive information about the song you chose


* `movie-this`

if you enter " node liri.js movie-this-song 'name of your fav mavie' " it will retrive information about the movie you chose


* `do-what-it-says`

if you enter " node liri.js do-what-it-says " it will retrive information about the song you typed in the random.txt file
