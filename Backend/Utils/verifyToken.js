import crypto from "crypto";

export const verificationToken = ()=>{
const token = crypto.randomBytes(3).toString("hex");
return token;
}

export const expToken= ()=>{
   return new Date(Date.now() + 60 * 60 * 1000);
}