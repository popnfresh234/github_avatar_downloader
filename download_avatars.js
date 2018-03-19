var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!!!');

function getRepoContributors(repoOwner, repoName, callback) {
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

    })
    .on('response', function(response){

    })
    .pipe(fs.createWriteStream(filePath).on('finish', function(){

    }));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(user){
    var path = "avatars/" + user.login + ".jpg";
    downloadImageByURL(user.avatar_url, path);
  });
});

