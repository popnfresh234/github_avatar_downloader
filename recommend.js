

require('dotenv').config();
var input = process.argv.slice(2);
var key = process.env.GITHUB_TOKEN;
var linkToStarredRepos = [];

function recommend(starredUrl){
  return(starredUrl.slice(0, starredUrl.length -15));
}

function countRepos(input, repoCounter, counter){

  input.forEach(function(repo, index){
    if (repo.full_name in repoCounter){
      //Increment if the number has already been added ot the frequency counter
      repoCounter[repo.full_name] ++;
    } else {
      //Otherwise this is the first occurence
      repoCounter[repo.full_name] = 1;
    }
  });
  counter ++;
  return counter;
}

function convertToArray(repoCounter){
  var sortingArray = [];
  for (var repo in repoCounter){
    sortingArray.push([repo, repoCounter[repo]]);
  }
  //console.log(sortingArray);
  sortingArray.sort(function(a, b){
    var x = a[1];
    var y = b[1];
    return y - x;
  });
  sortingArray.forEach(function(repo, index){
    if(index < 5){
      console.log("[ " + repo[1] + " stars ] " + repo[0]);
    }
  });
  console.log("Done");
}

function buildRepoList(inputArray){
  var repoCounter = {};
  var counter = 0;
  inputArray.forEach(function(linkToStarredRepos, index){
    httpOperations.getStarredRepos(key, linkToStarredRepos, function(error, result){
      counter = countRepos(result, repoCounter, counter);
      if(counter === inputArray.length){
        convertToArray(repoCounter);
      }
    });
  });
}

var httpOperations = require('./http_operations');
var INPUT_FORMAT_MSG = 'download_avatars.js <owner> <repo>';




console.log('Welcome to the GitHub Avatar Downloader!!!');


httpOperations.getRepoContributors(key, input[0], input[1], function(err, result) {
  result.forEach(function(user, index){
    linkToStarredRepos.push(recommend(user.starred_url));
    if(index === result.length -1){
      buildRepoList(linkToStarredRepos);
    }
  });
});


