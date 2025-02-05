import {request, Request, response, Response} from "express";
import express from "express"
import dotenv from "dotenv"
import checkToken from "./middlewares/checkToken";
import {z} from "zod"
import jwt from "jsonwebtoken";




const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();

const secret = process.env.JWT_SECRET as string;



app.use(express.json());

// Define the schema for signup validation
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});



// signup endpoint (hashing using bcrypt is not done in any end point )
//@ts-ignore // should be checked.
app.post("/api/v1/signup", (req: Request, res:Response  ) => {
    try {
        // Validate request body using Zod
        const parsedBody = signupSchema.parse(req.body);

        const { username, password } = parsedBody;

        // Check if username already exists (dummy logic for now)
        let usernameFound = false; // Replace this with actual DB check

        if (usernameFound) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Proceed with user creation logic

        return res.status(201).json({
            message: "User created successfully",
        });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors, // Zod provides detailed validation errors
            });
        }
        
        return res.status(500).json({
            message: "Something went wrong while signing up!",
            error: err,
        });
    }
});


app.post("/api/v1/signin", (req:Request, res:Response) => {
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({
            "message":"Please enter all the fields"
        });
    }

    try{
       
            // check the db if the username exists and get the user details if exists.


            // now compare the password with the given in the db after de hashing.

            // now send the user a jwt and a successfull status code.
            //dummy code
            const userId = 1;
            const token = jwt.sign({
                userId: userId
            }, secret);

            res.status(201).json({
                "message":"User signed in successfully.",
                "token":token
            })
            
        
    }catch(err){
        res.status(500).json({
            "message":"Something went wrong while signing in!",
            "error":err
        });
    }
})


//@ts-ignore  Fix the ts error here.
app.post("/api/v1/create-room",checkToken ,(req,res) => {

    // the code for creating a new room goes here


})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})