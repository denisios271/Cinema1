module.exports = (superagent, assert, url) => {
    var root = url;
    url += 'id/';

    var post = {
        id: 23,
        alt_name: 'tvoe-imya-kimi-no-na-wa-your-name',
        title: 'Твоё имя / Kimi no na wa / Your name'
    };

    describe('GET /id/ should return', function(){

        it('200 and ' + JSON.stringify(post) + ' when id = ' + post.id, (done) => {
            superagent
                .get(url + post.id)
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

        it('400 without id (or empty)', (done) => {
            superagent
                .get(url)
                .end((err, res) => {
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('404 if id is incorrect (not found post)', (done) => {
            superagent
                .get(url + "-12345")
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

    });
}