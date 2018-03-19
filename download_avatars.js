var httpOperations = require('./http_operations');

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
if (Array.isArray(input) && input.length === 2){
  httpOperations.getRepoContributors("jquery", "jquery", function(err, result) {
    result.forEach(function(user){
      var path = "avatars/" + user.login + ".jpg";
      httpOperations.downloadImageByURL(user.avatar_url, path, result.length);
    });
  });
} else {
  console.log("Please supply arguments in this form:  download_avatars.js <owner> <repo>");
}



