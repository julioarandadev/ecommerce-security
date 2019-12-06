import jwt from 'jsonwebtoken';
import {key} from './tkconfig'

const keyToken: string = key(true);

export async function genUserToken(data:any){
   return jwt.sign(data, keyToken, { expiresIn: 60 * 60 * 60 });
}