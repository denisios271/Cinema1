module.exports = (superagent, assert, url) => {

    var user = {
        email: "testuser@gmail.com",
        pass: "1234567890TestUser",
        name: "TestUser",
        user_group: 4,
        fullname: "Test User Full Name"
    };

    describe("POST / should return", function(){

        function deleteTestUser(done){
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    if (res.status == 200 && user_parsed.name == user.name)
                        superagent
                            .delete(url + user_parsed.user_id + "/" + user.name + "/" + user.pass)
                            .end(function(err, res){
                                done();
                            });
                    else
                        done();
                });
        }

        function checkAuth(userN, userP, code, callBack){
            superagent
                .post(url + "auth/")
                .send({
                    'username': userN,
                    'userpass': userP
                })
                .end(function(err, res){
                    assert.equal(res.status, code);
                    var body = JSON.parse(res.text);
                    assert.equal(body.name, userN);
                    callBack();
                });
        }

        beforeEach(deleteTestUser);
        afterEach(deleteTestUser);

        it('201 if all right', function(done) {
            superagent
                .post(url)
                .send({
                    username: user.name,
                    userpass: user.pass,
                    email: user.email,
                    fullname: user.fullname
                })
                .end(function(err, res){
                    assert.ifError(err);
                    assert.equal(res.status, 201);
                    superagent
                        .get(url + "name/" + user.name)
                        .end(function(err, res){
                            assert.ifError(err);
                            assert.equal(res.status, 200);
                            var body = JSON.parse(res.text);
                            assert.equal(body.name, user.name);
                            assert.equal(body.email, user.email);
                            assert.equal(body.fullname, user.fullname);
                            assert.equal(body.user_group, 4);
                            checkAuth(user.name, user.pass, 200, done);
                        });
                });
        });

        it('400 if not fulled data', function(done) {
            superagent
                .post(url)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

    });
}