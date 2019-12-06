import bcrypt from 'bcryptjs'

export async function comparePassword(passReceived: string, passStored: string):Promise<{ok:boolean}>{
   //console.log(typeof(passReceived)+' / '+ typeof(passStored));
   try{
   const ok= await bcrypt.compare(passReceived.toString(), passStored.toString());
   //console.log('ok is:'+ ok);
   return Promise.resolve({ok});
  }
  catch(e){
    console.log('error is:'+ e);
    return Promise.resolve({ok:false});
  }
}