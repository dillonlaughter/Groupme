var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;
//   console.log('1');
//   console.log(request);
//   console.log('2');
//   console.log(this.req.chunks[0]);
//   console.log('3');
//   console.log(/^\/cool guy$/);
//   console.log('4');
//   console.log(request.text);
//   console.log('5');

  if(request.text.length != request.text.replace('/cool','').length) {
    this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(text) {
  var botResponse, options, body, botReq;
  
  console.log('logs');
//   botResponse = 'test';
//   console.log(botResponse);
  botResponse = text.replace('/','');
  console.log(botResponse);
  console.log('logs');

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
