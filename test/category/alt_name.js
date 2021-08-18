module.exports = (superagent, assert, url) => {
    url += "alt_name/";

    describe("GET /alt_name/ should return", function(){

        it('200 and {alt_name: anime, id: 2} if alt_name = anime', function(done) {
            superagent
                .get(url + "anime")
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var body = JSON.parse(res.text);
                    assert.equal(body.id, 2);
                    assert.equal(body.alt_name, "anime");
                    done();
                });
        });

        it('200 and {alt_name: main, id: 1} if alt_name is empty', function(done) {
            superagent
                .get(url)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var body = JSON.parse(res.text);
                    assert.equal(body.id, 1);
                    assert.equal(body.alt_name, "main");
                    done();
                });
        });

        it('400 if there is no category with this alt_name', function(done){
            superagent
                .get(url + "asdasdasd")
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });
    });
}