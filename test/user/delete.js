module.exports = (superagent, assert, url) => {

    var user = {
        email: "testuser@gmail.com",
        pass: "1234567890TestUser",
        name: "TestUser",
        user_group: 4,
        fullname: "Test User Full Name"
    };

    describe("DELETE /id/ should return", function(){

        function checkAuth(userN, userP, code, callBack){
            superagent
                .post(url)
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

        function deleteUser(done){
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    if (res.status == 200 && user_parsed.name == user.name)
                        superagent
                            .delete(url + "id/" + user_parsed.user_id + "/" + user.name + "/" + user.pass)
                            .end(function(err, res){
                                done();
                            });
                    else
                        done();
                });
        }

        beforeEach(function(done){
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    if (res.status == 400)
                        superagent
                            .post(url)
                            .send({
                                username: user.name,
                                userpass: user.pass,
                                email: user.email,
                                fullname: user.fullname
                            })
                            .end(function(err, res){
                                done();
                            });
                    else
                        done();
                });
        });

        afterEach(deleteUser);
        after(deleteUser);

        it('200 if all right', function(done) {
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    if (res.status == 200 && user_parsed.name == user.name)
                        superagent
                            .delete(url + "id/" + user_parsed.user_id + "/" + user.name + "/" + user.pass)
                            .end(function(err, res){
                                assert.ifError(err);
                                assert.equal(res.status, 200);
                                done();
                            });
                    else
                        done();
                });
        });

        it('400 if incorrect id', function(done) {
            superagent
                .del(url + "id/-1/" + user.name + "/" + user.pass)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 if query send about another user', function(done) {
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    if (res.status == 200 && user_parsed.name == user.name)
                        superagent
                            .delete(url + "id/" + user_parsed.user_id + "/UserWithoutPerm/UserWithoutPerm/")
                            .end(function(err, res){
                                assert.equal(res.status, 400);
                                done();
                            });
                    else
                        done();
                });
        });

        it('401 if incorrect password', function(done) {
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    if (res.status == 200 && user_parsed.name == user.name)
                        superagent
                            .delete(url + "id/" + user_parsed.user_id + "/" + user.name + "/" + "ThisIsIncorrectPassword")
                            .end(function(err, res){
                                assert.equal(res.status, 401);
                                done();
                            });
                    else
                        done();
                });
        });

    });
}