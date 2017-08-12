class NotFound extends Error {
    constructor(message){
        super(message);
        this.status = 404;
    }
}
module.exports = {
    NotFound: NotFound
}

class BadRequest extends Error {
    constructor(message){
        super(message);
        this.status = 400;
    }
}
    module.exports = {
        BadRequest: BadRequest
    }
    