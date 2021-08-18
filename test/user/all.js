module.exports = (superagent, assert, url) => {
    url += "all/"

    describe("GET /all/ should return", function(){

        it('200 and array of users at page 1 (without page)', function(done) {
            superagent
                .get(url)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(true, body.users.length > 0);
                    assert.equal(body.users[0].name, "TokiSeven");
                    assert.equal(body.users[0].user_id, 1);
                    assert.equal(body.page.current, 1);
                    done();
                });
        });

        it('200 and array of users at page 3', function(done) {
            superagent
                .get(url + 3)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(true, body.users.length > 0);
                    assert.equal(body.page.current, 3);
                    done();
                });
        });

        it('200 and array of users at page 1 (page = -1)', function(done) {
            superagent
                .get(url + "-1")
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(true, body.users.length > 0);
                    assert.equal(body.users[0].name, "TokiSeven");
                    assert.equal(body.users[0].user_id, 1);
                    assert.equal(body.page.current, 1);
                    done();
                });
        });

    });
}