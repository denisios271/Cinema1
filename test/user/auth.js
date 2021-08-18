module.exports = (superagent, assert, url, user) => {
    var urlLogOut = url + "exit/";
    url += "auth/"

    describe("POST /auth/ should return", function(){

        beforeEach(function(done){
            superagent
                .post(urlLogOut)
                .end(function(err, res){
                    done();
                });
        });

        it('200 if user\'s name/pass are right', function(done) {
            superagent
                .post(url)
                .send({
                    'username': user.name,
                    'userpass': user.pass
                })
                .end(function(err, res){
                    assert.ifError(err);
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(body.name, user.name);
                    done();
                });
        });

        it('400 without user\'s name/pass', function(done) {
            superagent
                .post(url)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 without user\'s pass', function(done) {
            superagent
                .post(url)
                .send({
                    username: user.name
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 without user\'s name', function(done) {
            superagent
                .post(url)
                .send({
                    userpass: user.pass
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('200 if user always logged in', function(done) {
            superagent
                .post(url)
                .send({
                    'username': user.name,
                    'userpass': user.pass
                })
                .end(function(e, r){
                    assert.ifError(e);
                    assert.equal(r.status, 200);
                    superagent
                        .post(url)
                        .set('Cookie', r.headers['set-cookie'])
                        .end(function(err, res){
                            assert.ifError(err);
                            assert.equal(res.status, 200);
                            var body = JSON.parse(res.text);
                            assert(body.name, user.name);
                            done();
                        });
                });
        });

    });
}