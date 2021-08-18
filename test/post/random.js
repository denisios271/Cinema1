module.exports = (superagent, assert, url) => {
    var root = url;
    url += 'random/';

    describe('GET /random/ should return', function(){

        it('200 and random post', (done) => {
            superagent
                .get(url)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    done();
                });
        });

    });
}