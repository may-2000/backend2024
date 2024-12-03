const express = require('express');
const usersRoutes = require('./routes/users')

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/users', usersRoutes);
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Server is running on Port ${this.port}`);
        })
    }
}

module.exports = Server;