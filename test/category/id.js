module.exports = (superagent, assert, url) => {
    url += "id/";

    describe("GET /id/ should return", function(){
        
        it('200 and {alt_name: anime, id: 2} if id = 2', function(done) {
            superagent
                .get(url + 2)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(body.id, 2);
                    assert.equal(body.alt_name, "anime");
                    done();
                });
        });

        it('200 and {alt_name: main, id: 1} if id is empty', function(done) {
            superagent
                .get(url)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(body.id, 1);
                    assert.equal(body.alt_name, "main");
                    done();
                });
        });

        it('400 if id is incorrect', function(done) {
            superagent
                .get(url + "-1")
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

    });
}