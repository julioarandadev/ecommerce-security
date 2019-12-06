import { Request, Response } from 'express';
import { existEmail } from "../../helpers/email.finder";
import { existPerson } from "../../helpers/person.finder";
import { createPersonBasicRole } from "../../helpers/createNewPerson"
import { encryptPass } from "../../passEncrypt";
import { existPersonInApp } from "../../helpers/app.scope.finder";
import { genUserToken } from "../../helpers/tkGen.controller";


export async function singUpController(req: Request, res: Response){
   const appHeader:any = req.headers['wappecommerce'];
   const email= req.body.email;
   const userName = req.body.userName;
   let password = req.body.password;

   
   let emailResult = await existEmail(email);
    
   if (emailResult.ok) {
       return Promise.resolve({ err: new Error('The email already exists!')  });
   } else {
       
       let userResult = await existPerson(userName);
       if (userResult) {
           return Promise.resolve({ err: new Error('the user name already exists') });
       } else {
           let encrypt:any= await encryptPass(password);
           
           if (!encrypt.ok){
               return Promise.resolve ({err: new Error('The user could not be created! try later')});
           }else{
               let receivedPass = password;
               req.body.password=encrypt.passEncrypted;
               let created = await createPersonBasicRole(req.body, appHeader);
                            
               if (created.ok){
                   // confirm person and get scopes.
                   let confirm = await existPersonInApp(created.idPerson, appHeader);
                   let scopes = confirm.scopes;
                   let idPerson= created.idPerson;
                   
                   if(!confirm) {
                       return Promise.resolve({
                           err: new Error('Person doesnt exist! ')
                       });   

                   }else{
                    console.log(' scopes: ', confirm.scopes);   
                    var person ={
                        firstName:req.body.firstName,
                        lastName: req.body.lastName,   
                        userName:req.body.userName,
                        email:req.body.email
                        }
                    
                    var tokenPackage = {
                        id:idPerson,
                        person,
                        scopes:scopes,
                        app:appHeader,                    
                    };
                    
                    const token = await genUserToken(tokenPackage);
                    if (scopes){
                        req.headers.scopes = scopes.toString();
                        req.headers.token=token;
                        }
     
                    return res.status(200).json({
                        message: 'Hello '+req.body.userName+' ! You Are welcome.',
                        person,
                        token,
                        scopes:confirm.scopes                            
                    });
                   }
               }
               else{
                   return Promise.resolve ({err: new Error('The user could not be created! try later')});
               }
           }
           
       }           
   }             
}

       
/* 
***********************************************************
       let confirm = await singUp(req.body, appHeader);

       if (!confirm.err){

           console.log(' scopes: ' + confirm.scopes);
               var person ={
                   firstName:req.body.firstName,
                   lastName: req.body.lastName,   
                   username:req.body.userName,
                   email:req.body.email
                   }
               
               var tokenPackage = {
                   id:confirm.person,
                   person,
                   scopes:confirm.scopes,
                   app:appHeader,                    
               };
               
               const token = await genUserToken(tokenPackage);
               if (confirm.scopes){
                   req.headers.scopes = confirm.scopes.toString();
                   req.headers.token=token;
                   }

               return res.status(200).json({
                   message: 'Hello '+req.body.userName+' ! You Are welcome.',
                   person,
                   token,
                   scopes:confirm.scopes                            
               });

       
       }else{
           res.json({
               messaje: confirm.err.message
           });        
       }
   
    }

*/