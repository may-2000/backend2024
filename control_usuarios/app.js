const express = require("express");

const app = express();

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
    ];

    app.get("/usuarios", (req, res) => {
        res.status(200).send(usuarios);
    });      

app.get("/usuarios/:id", (req, res) => {
    const params = req.params;
    const { id } = params;
    const usuario = usuarios.find((usuarios) => usuarios.id == id);
    
    res.status(200).send("usuario");
    
})
app.listen(3000, () => {
    console.log('Servidor corriendo en el http://localhost:3000');
});