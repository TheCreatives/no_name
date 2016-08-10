describe("hello", function() {
    var request = require("request");

    var base_url = "http://localhost:3000/tasks";

    describe("Hello world", function() {
        describe("GET /", function() {
            it("returns status code 200", function(done) {
                request.get(base_url, function(err, res, body) {
                    expect(res.body).toBe("Tasks");
                    done();
                });
            });
        });
    });
});