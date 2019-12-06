import { Request, Response } from 'express';
import { existEmail } from "../../helpers/email.finder"
import { existPersonInApp } from "../../helpers/app.scope.finder";
import { comparePassword } from "../../helpers/comparePass"
import { genUserToken } from "../../helpers/tkGen.controller";

export async function singInController(req: Request, res: Response){
    
    //if exist Persona App
    const appHeader:any = req.headers['wappecommerce'];
    let vEmail = await existEmail(req.body.email);

    if(!vEmail.ok){
        return res.status(401).json({
            email:false,
            messaje: 'Invalid email direction !'
        });
    }
    else{
        //console.log('User in database: '+ existEmailok.user);
        if(vEmail.user==req.body.userName){
            let isAppOk= await existPersonInApp(vEmail.idPerson, appHeader);
            if(!isAppOk){
                return res.status(401).json({
                    app:false,
                    messaje: 'Sorry, you have no permission on this app!'
                });
            }else{
                let isPassOk = await comparePassword(req.body.password,vEmail.pass);
                
                if(!isPassOk.ok){
                    return res.status(400).json({message: "Sorry, invalid Password"});
                }else{
                    console.log('- - - Person & Password Verified - - -');
                    var person ={
                        firstName:req.body.firstName,
                        lastName: req.body.lastName,   
                        userName:req.body.userName,
                        email:req.body.email,
                        idPerson:vEmail.idPerson,                    
                        }
                    
                    var tokenPackage = {  
                        person,
                        scopes:isAppOk.scopes,
                        idApp:appHeader,                    
                    };
                    
                    const token = await genUserToken(tokenPackage);
                    
                    if (isAppOk.scopes){
                        req.headers.scopes = isAppOk.scopes.toString();
                        req.headers.token=token;
                        req.headers.user=person.toString();   
                    }
                  
                    return res.status(200).json({
                        message: 'Hello '+req.body.userName+' ! You Are welcome.',
                        person,
                        token,
                        scopes:isAppOk.scopes
                                                
                    }); 
                   
                }
            }    
        }
        else{
            return res.status(401).json({
                user:false,
                messaje: 'Sorry, username incorrect!'
            });
        }
    }
}


  /*
                    return res.status(200).json({
                        message: 'Hello '+req.body.userName+' ! You Are welcome.',
                        person,
                        token,
                        scopes:confirm.scopes
                                                
                    }); 
                    */

/* 
export async function getPersons(req: Request, res: Response){
    const conn = await connect();
    const persons = await conn.query(`SELECT ${personFields} FROM person`);
    res.json  (persons[0]);
};
*/

/*
export async function getOnePerson(req:Request,res:Response){
    const  {idPerson,userName, email}= req.body
            
    let data_field = isPerson(idPerson,userName,email);

    if(data_field){
        
        const conn = await connect();
        const onePerson= await conn.query(`SELECT ${personFields} FROM person WHERE ${data_field[1]}=?`,[data_field[0]]);
        res.json(onePerson[0]);
        console.log(onePerson[0]);
        return
    }
    
    console.log("dato: " + data_field);
    console.log("campo: "+ data_field);
    res.json({message:'Missing Data - You must send us userName or email'})    

}

export async function updatePerson(req: Request,res:Response){
    const idPerson = req.params.idPerson;
    const updPerson:itfPerson = req.body;
    const conn = await connect();
    console.log(updPerson);
    await conn.query('UPDATE person SET? WHERE idPerson =?',[updPerson, idPerson]);
    return res.json({message:'Modified Person'});
}

export async function deletePerson (req:Request,res:Response){
    const idPerson = req.params.idPerson;
    const conn = await connect();
    await conn.query('DELETE FROM person WHERE idPerson=?',[idPerson]);
    return res.json({message:"Person Deleted"});
};
*/
