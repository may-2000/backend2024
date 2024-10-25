const {request, response} = require('express');

const getMesesage = (req=request, res=response) => {
        res.send('Hello from the users controller!');
}

module.exports = {getMesesage};