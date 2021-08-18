module.exports = (superagent, assert, url, user) => {
    var urlRoot = require("../../website.config.js").websiteUrl;

    describe("POST / should return", function(){

        function deleteTestCategory(done){
            superagent
                .get(url + "alt_name/test_category")
                .end(function(err, res){
                    var TEST_CATEGORY = JSON.parse(res.text);
                    if (res.status == 200 && TEST_CATEGORY.alt_name == "test_category")
                        superagent
                            .delete(url + TEST_CATEGORY.id)
                            .send({
                                username: user.name,
                                userpass: user.pass
                            })
                            .end(function(err, res){
                                done();
                            });
                    else
                        done();
                });
        }

        beforeEach(deleteTestCategory);
        afterEach(deleteTestCategory);

        it('201 if all right', function(done) {
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
                    assert.equal(res.status, 201);
                    superagent
                        .get(url + "alt_name/test_category")
                        .end(function(err, res){
                            assert.equal(res.status, 200);
                            var body = JSON.parse(res.text);
                            assert.equal(body.alt_name, "test_category");
                            done();
                        });
                });
        });

        it('400 if user logged in, but not fulled data', function(done) {
            superagent
                .post(url)
                .send({
                    username: user.name,
                    userpass: user.pass
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 if user not logged in', function(done) {
            superagent
                .post(urlRoot + "user/exit/")
                .end(function(err, res){
                    superagent
                        .post(url)
                        .send({
                            parentid: 0,
                            name: "Тестовая категория",
                            alt_name: "test_category",
                            descr: "Нет описания",
                            keywords: "Нет,ключевых,слов"
                        })
                        .end(function(err, res){
                            assert.equal(res.status, 400);
                            done();
                        });
                });
        });

        it('403 if user has no permission', function(done) {
            superagent
                .post(url)
                .send({
                    username: "UserWithoutPerm",
                    userpass: "UserWithoutPerm",
                    parentid: 0,
                    name: "Тестовая категория",
                    alt_name: "test_category",
                    descr: "Нет описания",
                    keywords: "Нет,ключевых,слов"
                })
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}