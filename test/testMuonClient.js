
var muonPort = 7777;

var assert = require('assert');
var url = require('url');
var muon = require("../munode.js")(7777);
var nucleus = require("./muon-test.js");


describe("test muon-node client ", function() {

    it ("basic test", function(done) {
        this.timeout(3500);

        nucleus.listen(muonPort);

        //TODO, the standard containers ...
        //expect a response message of the correct form, including data from the docker api.

        nucleus.on(function (event) {
            assert.equal(event.resource, "container");
            assert.equal(event.action, "put");
            assert.equal(event.type, "runtime");
            assert.equal(event.recordId, "simplenode");
            console.dir(event.payload);
            //    payload:actions[6]
            muon.shutdown();
            done()
        });

        //tell mock muon to emit a PUT.
        muon.send({
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
        
        //quite crappy. can't quite get to the low level stuff needed to properly event this.
        setTimeout(done, 3000);
    });  

});


