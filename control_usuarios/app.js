const express = require('express');

const app = express();

app.get("/usuarios", (req, res) => {
    const usuarios = [
        {
            id: 1,
            nombre: "Juan",
            apellido: "Perez",
            email: "jzqJ8@example.com",
        },
        {
            id: 2,
            nombre: "Maria",
            apellido: "Lopez",
            email: "mL0t3@example.com",
        }
    ]
    res.status(200).send(usuarios);        
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el http://localhost:3000');
});
