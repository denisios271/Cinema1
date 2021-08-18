module.exports = (superagent, assert, url, user) => {
    var urlLogIn = url + "auth/";
    url += "exit/"

    describe("POST /exit/ should return", function(){

        it('200 if user already logged in', function(done) {
            superagent
                .post(urlLogIn)
                .send({
                    'username': user.name,
                    'userpass': user.pass
                })
                .end(function(err, res){
                    assert.ifError(err);
                    assert.equal(res.status, 200);
                    var body = JSON.parse(res.text);
                    assert.equal(body.name, user.name);
                    superagent
                        .post(url)
                        .set('Cookie', res.headers['set-cookie'])
                        .end(function(err, res){
                            assert.ifError(err);
                            assert.equal(res.status, 200);
                            done();
                        });
                });
        });

        it('401 if user not logged in', function(done) {
            superagent
                .post(url)
                .end(function(err, res){
                    assert.equal(res.status, 401);
                    done();
                });
        });

        it('401 if user tried to log in, but password is incorrect', function(done) {
            superagent
                .post(urlLogIn)
                .send({
                    'username': user.name
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    superagent
                        .post(url)
                        .set('Cookie', res.headers['set-cookie'])
                        .end(function(err, res){
                            assert.equal(res.status, 401);
                            done();
                        });
                });
        });

    });
}