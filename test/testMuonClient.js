
var assert = require('assert');
var url = require('url');
var muon = require("../munode.js")();


var muonPort = 18081;



describe("test muon-node client ", function() {
    
  

    it ("basic test", function(done) {
        this.timeout(3500);
        
        var nucleus = require("./muon-test.js");

        nucleus.listen(muonPort);
        nucleus.onResourceQuery({}, [
            { recordId:"gns", inspection: { NetworkSettings: { IPAddress:"111.111.111.111" }}},
            { recordId:"mymodule", inspection: { NetworkSettings: { IPAddress:"111.111.111.111" }}},
            { recordId:"simples", inspection: { NetworkSettings: { IPAddress:"111.111.111.111" }}},
            { recordId:"proxy", inspection: { NetworkSettings: { IPAddress:"111.111.111.88" }}},
        ]);

        //TODO, the standard containers ...
        //expect a response message of the correct form, including data from the docker api.

        muon.on(function (event) {
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


