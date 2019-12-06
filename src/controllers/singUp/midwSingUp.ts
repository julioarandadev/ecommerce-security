import {Request, Response} from 'express';

export async function midwSingUp(req: Request, res: Response, next: any){
    if(req.body.userName && req.body.email && req.body.password && req.body.firstName && req.body.lastName && req.body.dateOfBirth){
       next();
    }else{
      res.json(
         {
          auth: false,
          message:"Missing required data for singUp!"  
         }
      );
    }

}