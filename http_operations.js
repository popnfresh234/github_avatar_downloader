var secrets = require('./secrets');
var request = require('request');
var fs = require('fs');

var currentPosition = 0;

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

function downloadImageByURL(url, filePath, userCount){
  request(url)
  .on('error', function(err){
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath).on('finish', function(){
    //Keeps track of how many images have been downloaded and prints complete when done
    currentPosition ++;
    if (currentPosition === userCount){
      console.log(currentPosition + " Complete");
    } else {
      console.log(currentPosition);
    }
  }));
}

module.exports = {getRepoContributors: getRepoContributors, downloadImageByURL: downloadImageByURL};