"use strict";
module.exports = (superagent, assert, url, user) => {
    let post_id = -1;

    let post = {
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

    let dataToSend = post;
    Object.assign(dataToSend, {
        'username': user.name,
        'userpass': user.pass
    });

    function callbackInPost(callback){
        superagent
            .get(url + "id/" + post_id)
            .end(callback);
    }

    function checkPostData(callback){
        callbackInPost(function(err, res){
            callback(JSON.parse(res.text));
        });
    }

    describe("DELETE /id/ should return", function(){

        // create data (post) if not exists and get it's id
        beforeEach(function(done){
            superagent
                .get(url + "alt_name/" + post.alt_name)
                .end(function(err, res){
                    if (res.status == 200){
                        let post_response = JSON.parse(res.text);
                        post_id = (post_response.alt_name == post.alt_name) ? post_response.id : -1;
                        done();
                    }else{
                        superagent
                            .post(url)
                            .send(dataToSend)
                            .end(function(err, res){
                                superagent
                                    .get(url + "alt_name/" + post.alt_name)
                                    .end(function(err, res){
                                        post_id = (res.status == 200) ? JSON.parse(res.text).id : -1;
                                        if (post_id == -1)
                                            throw new Error("Post does not exist");
                                        done();
                                    });
                            });
                    }
                });
        });

        after(function(done){
            superagent
                .del(url + "id/" + post_id + "/" + user.name + "/" + user.pass)
                .end(function(err, res){
                    done();
                });
        });

        it('200 if all right', function(done) {
            superagent
                .del(url + "id/" + post_id + "/" + user.name + "/" + user.pass)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    superagent
                        .get(url + "id/" + post_id)
                        .end(function(err, res){
                            assert.equal(res.status, 404);
                            done();
                        });
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

        it('400 if not logged in', function(done) {
            superagent
                .del(url + "id/" + post_id)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('403 if user has no permission', function(done) {
            superagent
                .del(url + "id/" + post_id + "/" + "UserWithoutPerm" + "/" + "UserWithoutPerm")
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}