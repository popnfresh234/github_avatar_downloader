var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var userCount = 0;
var currentPosition = 0;

console.log('Welcome to the GitHub Avatar Downloader!!!');

function getRepoContributors(repoOwner, repoName, callback) {
  console.log('Beginning request');
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    callback(err, JSON.parse(body));
  });
}

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

if (Array.isArray(input) && input.length === 2){
  getRepoContributors("jquery", "jquery", function(err, result) {
    userCount = result.length;
    result.forEach(function(user){
      var path = "avatars/" + user.login + ".jpg";
      downloadImageByURL(user.avatar_url, path);
    });
  });
} else {
  console.log("Please supply arguments in this form:  download_avatars.js <owner> <repo>");
}



