import bcrypt from 'bcryptjs';

export async function encryptPass(password: any): Promise<{passEncrypted?: String, ok: boolean }>{
   try{
      const salt: any= await bcrypt.genSalt(10);
      const newPass:String = await bcrypt.hash(password, salt);
      //console.log('New Password: '+newPass);
      return Promise.resolve({
         passEncrypted: newPass,
         ok: true
      });
   }
   catch{
      return Promise.resolve({ok:false});
   }
}

