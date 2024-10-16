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

// Obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    res.status(200).send(usuarios);
});

// Obtener un usuario por id
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

// Crear un nuevo usuario
app.post("/usuarios", (req, res) => {
    const { nombre, apellido, email } = req.body;

    // Validación 1: Información completa
    if (!nombre || !apellido || !email) {
        res.status(400).send({ error: "Todos los campos son requeridos" });
        return;
    }

    // Validación 2: Email único
    if (usuarios.find((usuario) => usuario.email === email)) {
        res.status(400).send({ error: "El email ya existe" });
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

// Actualizar un usuario completamente (PUT)
app.put("/usuarios/:id", (req, res) => {
    const { nombre, apellido, email } = req.body;
    const { id } = req.params;

    // Validar campos obligatorios
    if (!nombre || !apellido || !email) {
        res.status(400).send({ error: "Todos los campos son requeridos" });
        return;
    }

    // Validar que el ID sea un número
    if (isNaN(+id)) {
        res.status(400).send({ error: "El id debe ser un número" });
        return;
    }

    // Buscar usuario por ID
    const usuario = usuarios.find((usuario) => usuario.id == +id);
    if (!usuario) {
        res.status(404).send({ error: `El usuario con id ${id} no existe` });
        return;
    }

    // Validar que el correo sea único, excepto si es el mismo del usuario actual
    const correoDuplicado = usuarios.find((u) => u.email === email && u.id !== +id);
    if (correoDuplicado) {
        res.status(400).send({ error: "El email ya existe" });
        return;
    }

    // Actualizar los datos del usuario
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;

    res.status(200).send("El usuario se actualizó correctamente");
});

// Actualizar parcialmente un usuario (PATCH)
app.patch("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;

    if (isNaN(+id)) {
        res.status(400).send({ error: "El id debe ser un número" });
        return;
    }

    const usuario = usuarios.find((usuario) => usuario.id == +id);
    if (!usuario) {
        res.status(404).send({ error: `El usuario con id ${id} no existe` });
        return;
    }

    // Actualizar solo los campos enviados
    if (nombre) usuario.nombre = nombre;
    if (apellido) usuario.apellido = apellido;
    if (email) {
        const correoDuplicado = usuarios.find((u) => u.email === email && u.id !== +id);
        if (correoDuplicado) {
            res.status(400).send({ error: "El email ya existe" });
            return;
        }
        usuario.email = email;
    }

    res.status(200).send("El usuario se actualizó parcialmente");
});

// Eliminar un usuario (DELETE)
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
        res.status(400).send({ error: "El id debe ser un número" });
        return;
    }

    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == +id);
    if (usuarioIndex === -1) {
        res.status(404).send({ error: `El usuario con id ${id} no existe` });
        return;
    }

    usuarios.splice(usuarioIndex, 1);
    res.status(200).send({ message: `Usuario con id ${id} eliminado correctamente` });
});

// Servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});