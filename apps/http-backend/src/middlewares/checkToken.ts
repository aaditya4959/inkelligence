import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";import { getErrorMap, string } from "zod";
;

dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
    userId?:string;
}



const checkToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "You are not signed in!" });
    }

    const bearerToken = authHeader.split(" ");
    if (bearerToken.length !== 2 || bearerToken[0] !== "Bearer") {
        return res.status(400).json({ message: "Invalid token format!" });
    }

    const token = bearerToken.length === 2 ? bearerToken[1] : null;

    

    try {
        if(!token){
            res.status(400).json({
                "message":"Invalid token format"
            })
        }else{
            // Verify the JWT token
             const decoded = jwt.verify(token, secret) as JwtPayload;

            if (!decoded.userId) {
                return res.status(403).json({ message: "Invalid token!" });
            }

            req.userId = decoded.userId; // Attach userId to request object
            next(); // Proceed to next middleware
        }
        
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token!",
            //@ts-ignore
            error: error.message });
    }
};

export default checkToken;