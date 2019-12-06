import {existPersonInApp  } from "./helpers/app.scope.finder";
import { comparePassword } from "./helpers/comparePass";

export async function singIn(idPerson: number, idApp: number, passRec: string, passStrd: string): Promise< {scopes?: number[], ok?: boolean, msg?:string }>{
   // Valid App and Get Scopes
   const appIsOk = await existPersonInApp(idPerson, idApp);
   
   if(!appIsOk.ok){
      return Promise.resolve({
         ok:false,
         msg:""
      });
   }
   else{
    
      //verify password
      const isPassOk = await comparePassword(passRec,passStrd);
      
      if (!isPassOk.ok){
         return Promise.resolve({
            ok:false,
            msg:"Invalid Password"
         });
      }
      else{
         
         // Return token
         
         return Promise.resolve({
            scopes:appIsOk.scopes,
            ok:true
         });
      }
   }
}