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
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send({ error: "El id debe ser un número" });
        return;
    }

    const usuario = usuarios.find((usuario) => usuario.id == +id);
    if (!usuario) {
        res.status(404).send({ error: `El usuario con id ${id} no existe` });
        return;
        
    }

    res.status(200).send(usuario);
});

app.post("/usuarios", (req, res) => {
    const { nombre, apellido, email } = req.body;

    // Validación 1: Información completa
    if (!nombre || !apellido || !email) {
        res.status(400).send({ error: "Todos los campos (nombre, apellido, email) son obligatorios." });
        return;
    }

    // Validación 2: Email único
    const emailExiste = usuarios.some((usuario) => usuario.email === email);
    if (emailExiste) {
        res.status(400).send({ error: "El email ya está en uso." });
        return;
    }

    // Agregar el nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        apellido,
        email
    };
    usuarios.push(nuevoUsuario);

    res.status(201).send("El usuario se agregó correctamente");
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el http://localhost:3000');
});
