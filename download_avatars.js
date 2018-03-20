var httpOperations = require('./http_operations');

var INPUT_FORMAT_MSG = 'download_avatars.js <owner> <repo>';

console.log('Welcome to the GitHub Avatar Downloader!!!');


function downloadImageByURL(url, filePath){
  request(url)
  .on('error', function(err){
    console.log(err);
  })
  .on('response', function(response){

  })
  .pipe(fs.createWriteStream(filePath).on('finish', function(){
    currentPosition ++;
    if (currentPosition === userCount){
      console.log(currentPosition + " Complete");
    } else {
      console.log(currentPosition);
    }
  }));
}

var input = process.argv.slice(2);
//Checks to make sure user has input two arguments, otherwise reminds them of input format
if (input.length === 2){
  httpOperations.getRepoContributors(input[0], input[1], function(err, result) {
    //Check and see if there's an error, otherwise continue parsing
    if (err !== null){
      console.log("Something went wrong!");
    } else {
      //If we don't have an array of results, dipslay error.  Else loop over results and download images
      if (!Array.isArray(result)){
        console.log("No results for this data, try again using this format : " + INPUT_FORMAT_MSG);
      } else {
        result.forEach(function(user){
          var path = "avatars/" + user.login + ".jpg";
          httpOperations.downloadImageByURL(user.avatar_url, path, result.length);
        });
      }
    }
  });
} else {
  console.log("Please supply arguments in this form:  " + INPUT_FORMAT_MSG);
}



