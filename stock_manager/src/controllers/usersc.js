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

const getUserById= async (req=request, res=response)=>{
    const {id}=req.params;

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
      }
try{
  const user = conn.query(usersQueries.getById, [+id]);

  if(!user){
    res.status(404).send('User not found');
    return;
  }
  res.send(user);
}catch(error){
  res.status(500).send(error);
}finally {
    if (conn) conn.end();
  }

}

// TAREA que explico el profesor en clase
// Crear un nuevo usuario
const createUser = (req = request, res = response) => {
  const {name} = req.body;

  if (!name) {
      res.status(400).send('Name is required');
      return;
  }
  const user= users.find(user=>user.name===name);

  if(user){
    res.status(409).send('User alredy exists');
    return;
  }

  users.push({id:users.length+1, name});
  res.send('User created succesfully');
};

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