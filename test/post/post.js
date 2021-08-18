module.exports = (superagent, assert, url, user) => {
    var post = {
        'title': "test post by nodejs",
        'alt_name': "test_post_by_nodejs",
        'short_story': "test_post_short",
        'full_story': "test_post_full",
        'categories': "1,2,3",
        'keywords': "test, post",
        'trailer': "https://www.youtube.com/embed/h49TVsV-nY4",
        'year': "2016",
        'voicers': "test voicers",
        'translaters': "test translaters",
        'editor': "test editor",
        'manga': "test manga",
        'author': "test author",
        'roles': "test roles",
        'timer': "test timer",
        'seriesCount': "12+",
        'type': "TV"
    };

    var dataToSend = Object.assign({}, post, {
        'username': user.name,
        'userpass': user.pass
    });

    describe('POST / should return', function(){

        function deleteTestPostIfExists(done){
            superagent
                .get(url + "alt_name/" + post.alt_name)
                .end(function(err, res){
                    if (res.status == 200){
                        superagent
                            .delete(url + "id/" + JSON.parse(res.text).id + "/" + user.name + "/" + user.pass)
                            .end(function(e, r){
                                done();
                            });
                    }else{
                        done();
                    }
                });
        }

        afterEach(function(done){
            deleteTestPostIfExists(done);
        });

        beforeEach(function(done){
            deleteTestPostIfExists(done);
        });

        it('201 if all data were fulled in', function(done) {
            superagent
                .post(url)
                .send(dataToSend)
                .end(function(err, res){
                    assert.equal(res.status, 201);
                    done();
                });
        });

        it('400 if user logged in, but not fulled data', function(done) {
            superagent
                .post(url)
                .send({
                    'username': user.name,
                    'userpass': user.pass
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('401 if user has no logged in', function(done) {
            superagent
                .post(url)
                .send(post)
                .end(function(err, res){
                    assert.equal(res.status, 401);
                    done();
                });
        });

        it('403 if user has no permission', function(done) {
            dataToSend.username = "UserWithoutPerm";
            dataToSend.userpass = "UserWithoutPerm";
            superagent
                .post(url)
                .send(
                    dataToSend
                )
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}