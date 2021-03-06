var request = require('request');
var fs = require('fs');
var BASE_URL = "https://api.github.com/";
var currentPosition = 0;

function getRepoContributors(key, repoOwner, repoName, callback) {
  console.log('Beginning request');
  var options = {
    url:  BASE_URL + "repos/" + repoOwner + "/" + repoName + "/contributors?per_page=100",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': key
    }
  };
  request(options, function(err, res, body) {
    callback(err, body);
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
  }).on('error', function(error){
    console.log("File write error for path: " + filePath);
  }));
}

function getStarredRepos(key, url, callback){
  var options = {
    url:  url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': key
    }
  };
  request(options, function(err, res, body) {
    callback(err, body);
  });
}

module.exports = {getRepoContributors: getRepoContributors, downloadImageByURL: downloadImageByURL, getStarredRepos, getStarredRepos};
