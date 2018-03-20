require('dotenv').config();

var httpOperations = require('./http_operations');
var INPUT_FORMAT_MSG = 'download_avatars.js <owner> <repo>';

console.log('Welcome to the GitHub Avatar Downloader!!!');


var input = process.argv.slice(2);


try{
  var input = process.argv.slice(2);
  var key = process.env.GITHUB_TOKEN;
  if(input.length !== 2){
    throw "Please supply arguments in this form:  " + INPUT_FORMAT_MSG;
  }
  if(!key){
    throw "Invalid key!";
  }
  httpOperations.getRepoContributors(key, input[0], input[1], function(err, result) {
    try {
      //Check and see if there's an error, otherwise continue parsing
      if(err !== null){
        throw "Something went wrong!";
      }
      if(!Array.isArray(result)){
        throw "No results for this data, try again using this format : " + INPUT_FORMAT_MSG;
      }
      result.forEach(function(user){
        var path = "avatars/" + user.login + ".jpg";
        httpOperations.downloadImageByURL(user.avatar_url, path, result.length);
      });
    } catch (error) {
      console.log(error);
    }
  });
} catch (error){
  console.log(error);
}






