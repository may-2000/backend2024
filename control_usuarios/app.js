const express = require('express');

const app = express();
app.use(express.json());
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
    const {id} = params;


if(isNaN(id)){
res.status(400).send({error: "El id debe ser un numero"});
return;
};
const usuario = usuarios.find((usuarios) => usuarios.id == +id);
 if(usuario == undefined){
    res.status(404).send({error: `El usuario con ${id} no existe`});
    return;
 }; 

    res.status(200).send(usuario);   
})//End point

app.post("/usuarios", (req, res) => {

const{nombre, apellido, email} = req.body

usuarios.push({id: usuarios.length + 1, nombre: nombre, apellido, email})

     res.status (201).send("El usuario se agrego correctamente");
});
app.listen(3000, () => {
    console.log('Servidor corriendo en el http://localhost:3000');
});