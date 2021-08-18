module.exports = (superagent, assert, url) => {
    url += "name/"

    describe("GET /name/ should return", function(){

        it('200 if user exists', function(done) {
            superagent
                .get(url + "TokiSeven")
                .end(function(err, res){
                    assert.ifError(err);
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(body.name, "TokiSeven");
                    assert.equal(body.user_id, 1);
                    done();
                });
        });

        it('400 if user doesn\'t exists', function(done) {
            superagent
                .get(url + "")
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

    });
}