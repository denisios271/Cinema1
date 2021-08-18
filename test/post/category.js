module.exports = (superagent, assert, url) => {
    url += "category/";

    var test_post = {
        id: 23,
        category: '9,4,53',
        alt_name: 'tvoe-imya-kimi-no-na-wa-your-name',
        voicers: 'TokiSeven & Fretta'
    };

    describe('GET /category/ should return', function(){

        it('200 without page number (first page)', (done) => {
            superagent
                .get(url + "anime/")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var obj = JSON.parse(res.text);
                    assert.equal(obj.currentPage, 1);
                    assert.equal(obj.category.id, 2);
                    assert.equal(obj.category.alt_name, 'anime');
                    done();
                });
        });

        it('200 with page number', (done) => {
            superagent
                .get(url + "anime/2")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var obj = JSON.parse(res.text);
                    assert.equal(obj.currentPage, 2);
                    assert.equal(obj.category.id, 2);
                    assert.equal(obj.category.alt_name, 'anime');
                    done();
                });
        });

        it('200 with incorrect page number (should be first page)', (done) => {
            superagent
                .get(url + "anime/-1")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var obj = JSON.parse(res.text);
                    assert.equal(obj.currentPage, 1);
                    assert.equal(obj.category.id, 2);
                    assert.equal(obj.category.alt_name, 'anime');
                    done();
                });
        });

        it('400 without category', (done) => {
            superagent
                .get(url)
                .end((err, res) => {
                    assert.equal(res.status, 400);
                    done();
                });
        });

        it('404 with incorrect category', (done) => {
            superagent
                .get(url + "anianianianiani/")
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });
        
    });
}