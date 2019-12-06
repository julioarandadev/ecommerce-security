import { Request,Response } from "express";
import * as jwt from 'jsonwebtoken';
import {key} from './tkconfig'
import {existPersonInApp  } from "../helpers/app.scope.finder";
import { genUserToken } from "../helpers/tkGen.controller";


const keyToken: string = key(true);

export async function verifyToken (token:string, req: Request, idApp:number): Promise<{scopes?: any, newToken?: any,person?:any, ok: boolean}>{
   try{
      const decoded:any = jwt.verify(token,keyToken);
            
            if(req.body.userName === decoded['person'].userName && 
               req.body.email === decoded['person'].email){
                  
                  let idPerson = decoded['person'].idPerson;
                  const existPerson = await existPersonInApp(idPerson, idApp);
                  console.log('- - - Recovering Person Scopes - - -');
                  var person ={
                        firstName:req.body.firstName,
                        lastName: req.body.lastName,   
                        userName:req.body.userName,
                        email:req.body.email,
                        idPerson:idPerson,                    
                        }
                    
                    var tokenPackage = {  
                        person,
                        scopes: existPerson.scopes,
                        idApp: idApp,                    
                    };
                    
                    const newToken = await genUserToken(tokenPackage);
                    
                    return Promise.resolve({
                        person,
                        scopes: existPerson.scopes,
                        newToken,
                        ok: true
                   });  
            }
            return Promise.resolve({
                  ok: false
             });  
      
      
      }
      catch(e){
            
            console.log('Error: '+ e);
            return Promise.resolve({
                        ok: false
                   });
      }
}
