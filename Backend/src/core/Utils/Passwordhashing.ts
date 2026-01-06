import bcrypt from 'bcrypt'

export class BcryptManager{
static async dcrypt(password: string, hashedPassword: string): Promise<boolean> {
try {
const isMatch = await bcrypt.compare(password, hashedPassword);        
return isMatch;
} catch (error) {
console.error("Password compare error:", error);
return false;
}
}

static async passwordHashing(password:string):Promise<string>{  
const SaltRounds:number = 10
const Hashedpassword = await bcrypt.hash(password,SaltRounds)
return Hashedpassword
}

}