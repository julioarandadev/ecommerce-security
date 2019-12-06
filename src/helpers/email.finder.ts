import { connect } from "../MySqlDbConnection";

export async function existEmail(email?: String):Promise<{idPerson: number, user?: string, pass: string ,ok:boolean}>{
   try{
       const conn = await connect();
       const [rows,fields]= await conn.query("SELECT `idperson`, `username`, `password` FROM person WHERE email=?", [email]);
       
       
       if (rows[0] != null){
            
           return Promise.resolve({
               idPerson: rows[0].idperson,
               user: rows[0].username,
               pass: rows[0].password,
               ok:true
           });
       }else{
           return Promise.resolve({
               idPerson:0,
               pass:'',
               ok:false});
       }
   }
   catch(e){
       console.log(e);
       return Promise.resolve({
        idPerson:0,
        pass:'',
        ok:false
        });
   } 
       
       
}