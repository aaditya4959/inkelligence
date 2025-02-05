import {WebSocketServer} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { date } from "zod";



const wss = new WebSocketServer({ port: 8080});
dotenv.config();

const secret = process.env.JWT_SECRET as string;

wss.on("connection", (socket, request) => {

    // first of all we will check that whether the use is signed in or not.

    const reqURL = request.url;
    if(!reqURL){
        return;
    }

    const queryParams = new URLSearchParams(reqURL.split("?")[1]);
    const token = queryParams.get("token") as string;
    // verifying the token
    if(token){
        const decoded = jwt.verify(token, secret);
       
        if(!decoded || !(decoded as JwtPayload).userId){
            socket.close();
            return;
        }else{
            // The logic of messaging will be added here

            socket.on("message", (data) => {
                console.log(data.toString());
                socket.send(JSON.stringify({
                    message:"Message received by the server!"
                }))
            })

        }
    }else{
        socket.close();
        return;
    }

    


    
})