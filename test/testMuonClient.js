
var muonPort = 7777;

var assert = require('assert');
var url = require('url');

var nucleus = require("./muon-test.js");
nucleus.listen(muonPort);

var muon = require("../munode.js")();

describe("test muon-node client ", function() {
    
  

    it ("basic test", function(done) {
        this.timeout(3500);

        //TODO, the standard containers ...
        //expect a response message of the correct form, including data from the docker api.

	var sender = function() {
	  nucleus.on(function (event) {
            assert.equal(event.resource, "container");
            assert.equal(event.action, "put");
            assert.equal(event.type, "gene");
            assert.equal(event.recordId, "simplenode");
            console.dir(event.payload);
            //    payload:actions[6]
           // muon.shutdown();
            done()
	  });
	  
	  //tell mock muon to emit a PUT.
	  muon.emit({
	      resource: "container",
	      type: "gene",
	      recordId:"simplenode",
	      action: "put",
	      payload: {
		  "id": "simplenode",
		  "image": "sp_platform/uber-any",
		  "env": {
		      "GIT_REPO_URL": "https://github.com/fuzzy-logic/simplenode.git",
		      "DNSHOST": "simplenode.muon.cistechfutures.net"
		  }
	      }
	  });
	}
	
        //quite crappy. can't quite get to the low level stuff needed to properly event this.
        setTimeout(sender, 100);
    });  

});


