const { request, response } = require('express');
const pool = require('./db/connection');
const { usersQueries } = require('../models/users');

// Obtener todos los usuarios
const getAllUsers = async (req = request, res = response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const users = await conn.query(usersQueries.getAll);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
    return;
  } finally {
    if (conn) conn.end();
  }
};

// Obtener un usuario por ID
const getUserById = async (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getById, [+id]);
    if (user.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Crear un nuevo usuario
const createUser = async (req = request, res = response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send("Bad request. Some fields are missing.");
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getByUsername, [username]);

    if (user.length > 0) {
      res.status(409).send('User already exists');
      return;
    }

    const newUser = await conn.query(usersQueries.create, [username, password, email]);

    if (newUser.affectedRows === 0) {
      res.status(500).send("User could not be created");
      return;
    }
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send(error);
    return;
  } finally {
    if (conn) conn.end();
  }
};

// Actualizar un usuario
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (isNaN(id)) {
    res.status(400).send("Invalid ID");
    return;
  }

  if (!username) {
    res.status(400).send("Username field is missing");
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getById, [id]);

    if (user.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const result = await conn.query(usersQueries.update, [username, id]);

    if (result.affectedRows === 0) {
      res.status(500).send("User could not be updated");
      return;
    }

    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send(error);
    return;
  } finally {
    if (conn) conn.end();
  }
};


// Eliminar un usuario por ID
const deleteUser = async (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  let conn;
  try{
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getById, [+id]);

    if(user.length === 0){
      res.status(400).send('user not found');
      return
    }

    const deleteUser = await conn.query(usersQueries.delete, [+id]);

    if(deleteUser.affectedRows === 0){
      res.status(500).send('User could not be deleted');
      return;
    }

    res.send("User deleted successfuly");
  }catch (error){
    res.status(500).send(error);
    return;
  } finally{
    if(conn) conn.end();
  }
  

};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser};
