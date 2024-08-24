import { app } from "./app.js";
import dotenv from 'dotenv'
import { dbConnect } from "./src/database/db.js";

dotenv.config({path: "./.env"});

dbConnect().then(()=>{
    app.listen(process.env.PORT,()=>console.log(`App is running at :- ${process.env.PORT}`))
})
.catch(()=>{
    console.log("Database connection failed...");
})


