import { connect } from "../MySqlDbConnection";

export async function userScopes(idPerson:number): Promise<{scopes:any[]}>{
   try{
      var scopes: any = [];
      const conn = await connect();
      let result = await conn.query("SELECT idRole FROM personapplicationrole WHERE idUser=?", [idPerson]);
      if (result[0] != null){
         console.log(result); 
         return Promise.resolve(scopes=result);
      }else{
          return Promise.resolve(scopes);
      }
  }
  catch(e){
      console.log(e);
      return Promise.resolve(scopes);
  } 
   
}