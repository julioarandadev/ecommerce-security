import { createPool } from "mysql2/promise";
const {dbKeys} = require ('./keys');

export async function connect(){
   try{
   const connection = (createPool(dbKeys));
   console.log('- - - MySql connected - - -');
   return connection;
    }
    catch(error){
        console.error("Connection Error: " + error);
        return error;
    }
   
}

/*
 const pool= mysql.createPool(dbkeys);

 pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code==='ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected...');
    return
});

// Promisify pool querys - convertimos callbacks en promesas
pool.query=promisify(pool.query);

module.exports=pool;
*/


