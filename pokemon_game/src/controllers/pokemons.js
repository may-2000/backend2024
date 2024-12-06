const {request, response} = require('express');
const pool = require('../db/connection');
const pokemonsModel = require('../models/pokemons');

const  getAllPokemons= async (req = request, res = response) =>{
    let conn;
    try{
        conn = await pool.getConnection();
        const pokemons = await conn.query(pokemonsModel.getAll);
        res.send(pokemons);

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}

const  getPokemonById= async (req = request, res = response) =>{
    
    let conn;
    try{

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}

const  get3RandomPokemons= async (req = request, res = response) =>{
    
    let conn;
    try{

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}

const  createPokemon= async (req = request, res = response) =>{
    
    let conn;
    try{

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}

const  updatePokemon= async (req = request, res = response) =>{
    
    let conn;
    try{

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}

const  deletePokemon= async (req = request, res = response) =>{
    
    let conn;
    try{

    }catch(error){
        res.status(500).json(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}


module.exports = {
    getAllPokemons,
    getPokemonById,
    get3RandomPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon
}