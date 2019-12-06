import { connect } from "../MySqlDbConnection";
import { iPerson } from "../interfaces/post.interface";

export async function createPersonBasicRole(data:iPerson,idApp:any): Promise <{idPerson:number, ok?:boolean}>{
   const newPost:iPerson = data;     
   try{
      const conn = await connect();
      const resultPerson = await conn.query('INSERT INTO person SET?', [newPost]);
      await conn.query('INSERT INTO personapplicationrole (`idrolep`, `idproject`,`iduser`) VALUES (?,?,?)',[1,idApp,resultPerson[0].insertId]);
      return Promise.resolve({
          idPerson: resultPerson[0].insertId,
          ok:true});
   }catch(e){
       console.log(e);
       
       return Promise.resolve({
           idPerson: 0,
           ok: false});
   }                               
}