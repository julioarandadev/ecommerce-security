import {Request, Response} from 'express';

export async function midwSingIn(req: Request, res: Response, next: any){
    if(req.body.userName && req.body.email && req.body.password){
       next();
    }else{
      res.json(
         {
          auth: false,
          message:"Missing authentication data!"  
         }
      );
    }

}