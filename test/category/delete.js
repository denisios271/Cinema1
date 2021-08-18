module.exports = (superagent, assert, url, user) => {

    describe("DELETE /id/ should return", function(){

        var category_id = 0;

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

        after(function(done){
            superagent
                .get(url + "alt_name/test_category")
                .end(function(err, res){
                    var TEST_CATEGORY = JSON.parse(res.text)
                    if (res.status == 200 && TEST_CATEGORY.alt_name == "test_category"){
                        superagent
                            .del(url + "id/" + TEST_CATEGORY.id + "/" + user.name + "/" + user.pass)
                            .end(function(err, res){
                                done();
                            });
                    }else{
                        done();
                    }
                });
        });

        it('200 if all right', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .del(url + "id/" + category_id + "/" + user.name + "/" + user.pass)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    superagent
                        .get(url + "id/" + category_id)
                        .end(function(err, res){
                            assert.equal(res.status, 400);
                            done();
                        });
                });
        });

        it('400 if incorrect id', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .del(url + "id/-1/" + user.name + "/" + user.pass)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 if not logged in', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .del(url + "id/" + category_id)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('403 if user has no permission', function(done) {
            assert.notEqual(category_id, 0);
            superagent
                .del(url + "id/" + category_id + "/" + "UserWithoutPerm" + "/" + "UserWithoutPerm")
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}