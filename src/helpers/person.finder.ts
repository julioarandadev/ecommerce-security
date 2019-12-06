import {connect} from "../MySqlDbConnection";

export async function existPerson(userName: String): Promise <boolean> {
    
   try{
       const conn = await connect();
       let [rows, fields] = await conn.execute("SELECT userName FROM person WHERE userName=?", [userName]);
       if (rows[0]){
           return Promise.resolve(true);
       }else{
           return Promise.resolve(false); 
       }
   }
   catch(e){
       console.log(e);
       return Promise.resolve(false); 
   }         
}