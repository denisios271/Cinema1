module.exports = (superagent, assert, url) => {

    var user = {
        email: "testuser@gmail.com",
        pass: "1234567890TestUser",
        name: "TestUser",
        fullname: "Test User Full Name"
    };

    var user2 = {
        email: user.email,
        pass: user.pass,
        name: user.name,
        fullname: "Test User Full Name - edited",
        allow_mail: 1,
        info: "Just nothing - only test",
        land: "Moscow",
        favorites: "2,3,22"
    };

    describe("PUT /id/ should return", function(){

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
                    assert.equal(res.status, 200);
                    assert.equal(user_parsed.name, user.name);
                    superagent
                        .put(url + "id/" + user_parsed.user_id)
                        .send({
                            email: user2.email,
                            userpass: user2.pass,
                            username: user2.name,
                            fullname: user2.fullname,
                            allow_mail: user2.allow_mail,
                            info: user2.info,
                            land: user2.land,
                            favorites: user2.favorites
                        })
                        .end(function(err, res){
                            assert.ifError(err);
                            assert.equal(res.status, 200);
                            superagent
                                .post(url + "auth/")
                                .send({
                                    'username': user2.name,
                                    'userpass': user2.pass
                                })
                                .end(function(err, res){
                                    assert.equal(res.status, 200);
                                    var body = JSON.parse(res.text);
                                    
                                    assert.equal(body.user_id, user_parsed.user_id);
                                    assert.equal(body.email, user2.email);
                                    assert.equal(body.name, user2.name);
                                    assert.equal(body.fullname, user2.fullname);
                                    assert.equal(body.allow_mail, user2.allow_mail);
                                    assert.equal(body.info, user2.info);
                                    assert.equal(body.land, user2.land);
                                    assert.equal(body.favorites, user2.favorites);

                                    done();
                                });
                        });
                });
        });

        it('400 if incorrect id', function(done) {
            superagent
                .put(url + "id/-1")
                .send({
                    userpass: user2.pass,
                    username: user2.name,
                    fullname: user2.fullname,
                    allow_mail: user2.allow_mail,
                    favorites: user2.favorites
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('401 if incorrect password', function(done) {
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    assert.equal(res.status, 200);
                    assert.equal(user_parsed.name, user.name);
                    superagent
                        .put(url + "id/" + user_parsed.user_id)
                        .send({
                            email: user2.email,
                            userpass: "blabla",
                            username: user2.name,
                            fullname: user2.fullname,
                            allow_mail: user2.allow_mail,
                            info: user2.info,
                            land: user2.land,
                            favorites: user2.favorites
                        })
                        .end(function(err, res){
                            assert.equal(res.status, 401);
                            done();
                        });
                });
        });

        it('400 if send query about another user', function(done) {
            superagent
                .get(url + "name/" + user.name)
                .end(function(err, res){
                    var user_parsed = JSON.parse(res.text);
                    assert.equal(res.status, 200);
                    assert.equal(user_parsed.name, user.name);
                    superagent
                        .put(url + "id/" + user_parsed.user_id)
                        .send({
                            email: user2.email,
                            userpass: "UserWithoutPerm",
                            username: "UserWithoutPerm",
                            fullname: user2.fullname,
                            allow_mail: user2.allow_mail,
                            info: user2.info,
                            land: user2.land,
                            favorites: user2.favorites
                        })
                        .end(function(err, res){
                            assert.equal(res.status, 400);
                            done();
                        });
                });
        });

    });
}