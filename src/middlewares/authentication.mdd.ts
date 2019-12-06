import {Request, Response} from 'express';
import {verifyToken} from '../helpers/verifyToken';

export async function authentication(req: Request, res: Response, next: any){
   const idApp: any = req.headers['wappecommerce'];
   const token: any = req.headers['token'];
   console.log('- - - Middleware Authentication - - -');
   console.log('URL: ',req.headers);
   if(!idApp){
      /*
      return res.json({
         auth: false,
         message: 'Web App Key invalid!'
      });
      */
     next();
   }
   else{
      if(!token){
         next();  
      }
      else{
         
         let vToken= await verifyToken(token, req, idApp);
         console.log('- - - New token Added - - -');
         if(vToken.ok){
            req.headers.scopes = vToken.scopes;
            req.headers.token= vToken.newToken;
            req.headers.user=vToken.person;
         }
         next();            
         
      }
     
   }
}




