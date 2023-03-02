import jwt from 'jsonwebtoken';
const JWT_SECRET ='agadfgsdfvalsfgjasdlfjasdf'
export const signJwt = (object:Object,options?: jwt.SignOptions | undefined) => {
      return jwt.sign(object, JWT_SECRET, {
        ...(options && options),
        algorithm: "RS256",
      });
}

export const verifyJwt = (token:string) => {
    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded){
            return decoded
        }
        return null
    } catch (error) {
        return error
    }
}