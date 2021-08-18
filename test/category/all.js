module.exports = (superagent, assert, url) => {
    url += "all/";

    describe('GET /all/ should return', function(){

        it('200 and array of genres', function(done) {
            superagent
                .get(url)
                .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal("object", typeof JSON.parse(res.text));
                    var body = JSON.parse(res.text);
                    assert.deepEqual(body[0], {
                        "id": 2,
                        "parent": 0,
                        "name": "Аниме",
                        "altname": "anime",
                        "desc": "anime online, аниме онлайн, смотреть аниме, аниме на русском",
                        "keywords": "anime online, аниме онлайн, смотреть аниме, аниме на русском"
                    });
                    done();
                });
        });
        
    });
}