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
      console.log(err);
    })
    .on('response', function(response){
      console.log('Response code: ' + response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath).on('finish', function(){
      console.log("Write complete");
    }));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(user){
    console.log(user.avatar_url);
  });
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")