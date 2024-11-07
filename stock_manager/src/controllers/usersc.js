const{request, response}=require('express');
const pool = require('./db/connection');
const{usersQueries} = require('../models/users');

//const users=[
//    {id: 1, name: 'Max'},
//    {id: 2, name: 'Daniel'},
//  {id: 3, name: 'Agustin'},
//];
const getAllUsers= async (req=request, res=response)=>{
  let conn;
  try{
    conn = await pool.getConnection();
    const users = await conn.query(usersQueries.getAll);

   // console.log({users});
    res.send(users);
  }catch(error){
    res.status(500).send(error);
    return;
  }finally{
  if (conn) conn.end();
  }
}

const getUserById = async (req=request, res=response)=>{
  const {id}=req.params;

  if(isNaN(id)){
      res.status(400).send('Invalid ID');
      return;
    }
  
  let conn;
  try{
      conn = await pool.getConnection();
      const user = await conn.query(usersQueries.getUserById, [+id]);
      if(!user){
          res.status(404).send('User not found');
          return;
      }
      res.send(user);
      
  }catch(error){
      res.status(500).send(error);
  }finally{
      if (conn) conn.end();
  }
}
// TAREA que explico el profesor en clase
// Crear un nuevo usuari{zzzzz}
const createUser = async (req = request, res = response) => {
  const {username, password, email} = req.body;

  if (!username  || !password || !email) {
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
  
  console.log({username, password, email})
  const newUser = await conn.query(usersQueries.create, [username, password, email]);

  if (newUser.length > 0) {
    res.status(500).send("User could not be created ");
    return;
  }
  res.status(201).send("User created successfully");
} catch (error) {
  res.status(500).send(error);
  return;
}
finally {
  if (conn) conn.end();
}    
}
// Actualizar un usuario
const updateUser = (req = request, res = response) => {
  const {id} = req.params;
  const {name} = req.body;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  const user = users.find(user => user.id === +id);

  if (!user) {
      res.status(404).send('User not found');
      return;
  }

  users.forEach(user=>{
    if(user.id===+id){
        user.name=name;
    }
});
res.send('user update succerfully');
}

// Eliminar un usuario por ID
const deleteUser = (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  const user = users.find(user => user.id === +id);

  if (!user) {
    res.status(404).send('User not found');
    return;
}

  users.splice(users.findIndex ((user)=>user.id===+id),1);
  res.send('User deleted');
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };