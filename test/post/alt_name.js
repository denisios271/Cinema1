module.exports = (superagent, assert, url) => {
    var root = url;
    url += 'alt_name/';

    var post = {
        id: 23,
        alt_name: 'tvoe-imya-kimi-no-na-wa-your-name',
        title: 'Твоё имя / Kimi no na wa / Your name'
    };

    describe('GET /alt_name/ should return', function(){

        it('200 and ' + JSON.stringify(post) + ' when alt_name = ' + post.alt_name, (done) => {
            superagent
                .get(url + post.alt_name)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var obj = JSON.parse(res.text);
                    assert.equal(obj.alt_name, post.alt_name);
                    assert.equal(obj.id, post.id);
                    assert.equal(obj.title, post.title);
                    done();
                });
        });

        it('400 when alt_name is empty', (done) => {
            superagent
                .get(url + "")
                .end((err, res) => {
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('400 without alt_name', (done) => {
            superagent
                .get(url)
                .end((err, res) => {
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('404 if alt_name incorrect (not found post)', (done) => {
            superagent
                .get(url + "NotFound_NotFound_NotFound")
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

    });
}