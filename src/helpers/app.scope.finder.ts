import { connect } from "../MySqlDbConnection";

export async function existPersonInApp(idPerson?: number, idApp?: number):Promise<{scopes?: number[], ok:boolean}>{        
   
    try{
       const conn = await connect();
       
       const [nScopes,fields] = await conn.query("SELECT `scopename` FROM scope as s INNER JOIN rolescope as rs ON rs.idScopeN = s.idScope INNER JOIN role as r ON r.idRole = rs.idRolen INNER JOIN personapplicationrole as par ON par.idrolep = rs.idrolen WHERE `iduser`=? AND `idProject` =?", [idPerson,idApp]);
            
       if (nScopes[0]!= null){
            let nombreScope = nScopes.map(function(x:any){
            return x.scopename
            });
        
            return Promise.resolve({
                scopes: nombreScope,               
                ok:true
            });

        }
  
        else{
            return Promise.resolve({ok:false});
        } 
    }
    catch(e){
       console.log(e);
       return Promise.resolve({ok:false});
    }       
}