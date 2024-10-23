const express = require('express');
const app = express();

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.app.use(express.json());
    }

    start() {
        app.listen(this.port,()=>{
            console.log('Server listening on port ' + this.port);
        });
    }
}

module.exports = {Server};
