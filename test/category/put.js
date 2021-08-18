module.exports = (superagent, assert, url, user) => {

    describe("PUT /id/ should return", function(){

        var category_id = 0;
        var category_to_change = {
            parentid: 1,
            name: "Тестовая категория - измененная",
            alt_name: "test_category_-_changed",
            descr: "Нет описания - измененное",
            keywords: "Нет,ключевых,слов,изменено"
        };

        beforeEach(function(done){
            superagent
                .get(url + "alt_name/test_category")
                .end(function(err, res){
                    var TEST_CATEGORY = JSON.parse(res.text)
                    if (res.status == 200 && TEST_CATEGORY.alt_name == "test_category"){
                        category_id = TEST_CATEGORY.id;
                        done();
                    }else{
                        superagent
                            .post(url)
                            .send({
                                username: user.name,
                                userpass: user.pass,
                                parentid: 0,
                                name: "Тестовая категория",
                                alt_name: "test_category",
                                descr: "Нет описания",
                                keywords: "Нет,ключевых,слов"
                            })
                            .end(function(err, res){
                                superagent
                                    .get(url + "alt_name/test_category")
                                    .end(function(err, res){
                                        if (res.status == 200)
                                            category_id = JSON.parse(res.text).id;
                                        done();
                                    });
                            });
                    }
                });
        });

        it('200 if all right', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .put(url + "id/" + category_id)
                .send({
                    username: user.name,
                    userpass: user.pass,
                    parentid: category_to_change.parentid,
                    name: category_to_change.name,
                    alt_name: category_to_change.alt_name,
                    descr: category_to_change.descr,
                    keywords: category_to_change.keywords
                })
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    superagent
                        .get(url + "id/" + category_id)
                        .end(function(err, res){
                            assert.equal(res.status, 200);
                            var body = JSON.parse(res.text);
                            assert.equal(body.alt_name, category_to_change.alt_name);
                            assert.equal(body.name, category_to_change.name);
                            superagent
                                .del(url + "id/" + body.id + "/" + user.name + "/" + user.pass)
                                .end(function(err, res){
                                    done();
                                });
                        });
                });
        });

        it('400 if don\'t set category id', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .put(url + "id/")
                .send({
                    username: user.name,
                    userpass: user.pass,
                    parentid: category_to_change.parentid,
                    name: category_to_change.name,
                    alt_name: category_to_change.alt_name,
                    descr: category_to_change.descr,
                    keywords: category_to_change.keywords
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 if incorrect data', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .put(url + "id/" + category_id)
                .send({
                    username: user.name,
                    userpass: user.pass
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 if not logged in', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .put(url + "id/" + category_id)
                .send({
                    parentid: category_to_change.parentid,
                    name: category_to_change.name,
                    alt_name: category_to_change.alt_name,
                    descr: category_to_change.descr,
                    keywords: category_to_change.keywords
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('403 if user has no permission', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .put(url + "id/" + category_id)
                .send({
                    username: "UserWithoutPerm",
                    userpass: "UserWithoutPerm",
                    parentid: category_to_change.parentid,
                    name: category_to_change.name,
                    alt_name: category_to_change.alt_name,
                    descr: category_to_change.descr,
                    keywords: category_to_change.keywords
                })
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}