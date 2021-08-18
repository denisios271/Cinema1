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

    let edited_post = Object.assign({}, post, {
        title: 'edited test post by nodejs',
        categories: "3,4,5"
    });
    

    let data_to_send = {
        default: Object.assign({}, post, {
            'username': user.name,
            'userpass': user.pass
        }),
        edited: Object.assign({}, edited_post, {
            'username': user.name,
            'userpass': user.pass
        })
    };
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

    describe("PUT /id/ should return", function(){

        // add a new post (if does not exist) and set post_id by it's id
        before(function(done){
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
                            .send(data_to_send.default)
                            .end(function(err, res){
                                superagent
                                    .get(url + "alt_name/" + post.alt_name)
                                    .end(function(err, res){
                                        post_id = (res.status == 200) ? JSON.parse(res.text).id : -1;
                                        done();
                                    });
                            });
                    }
                });
        });

        // reset post (if has been edited) to default values
        beforeEach(function(done){
            if (post_id == -1){
                throw new Error("Post does not exist");
                done();
                return;
            }
            superagent
                .get(url + "alt_name/" + edited_post.alt_name)
                .end(function(err, res){
                    let edited_post_response = JSON.parse(res.text)
                    if (res.status == 200 && edited_post_response.title == edited_post.title){
                        superagent
                            .put(url + "id/" + edited_post_response.id)
                            .send(data_to_send.default)
                            .end(function(err, res){
                                done();
                            });
                    }else{
                        done();
                    }
                });
        });

        // delete test post if has been added
        after(function(done){
            superagent
                .delete(url + "id/" + post_id + "/" + user.name + "/" + user.pass)
                .end(function(e, r){
                    done();
                });
        });

        it('200 if all right', function(done) {
            superagent
                .put(url + "id/" + post_id)
                .send(data_to_send.edited)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    checkPostData(body => {
                        assert.equal(body.alt_name, edited_post.alt_name);
                        assert.equal(body.title, edited_post.title);
                        done();
                    });
                });
        });

        it('400 if don\'t set post id', function(done) {
            superagent
                .put(url + "id/")
                .send(data_to_send.edited)
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('404 if not found post by id', function(done) {
            superagent
                .put(url + "id/" + 0)
                .send(data_to_send.edited)
                .end(function(err, res){
                    assert.equal(res.status, 404);
                    done();
                });
        });

        it('400 if incorrect data (there are no data)', function(done) {
            superagent
                .put(url + "id/" + post_id)
                .send({
                    username: user.name,
                    userpass: user.pass
                })
                .end(function(err, res){
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('401 if not logged in', function(done) {
            superagent
                .put(url + "id/" + post_id)
                .send(post)
                .end(function(err, res){
                    assert.equal(res.status, 401);
                    done();
                });
        });

        it('403 if user has no permission', function(done) {
            let dataWithoutPermission = edited_post;
            Object.assign(dataWithoutPermission, {
                'username': "UserWithoutPerm",
                'userpass': "UserWithoutPerm"
            });
            superagent
                .put(url + "id/" + post_id)
                .send(dataWithoutPermission)
                .end(function(err, res){
                    assert.equal(res.status, 403);
                    done();
                });
        });

    });
}