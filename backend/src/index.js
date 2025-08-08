import {app} from "./app.js"
import { connectDB } from "./db/index.js";
import dotenv from "dotenv"


dotenv.config()


connectDB()
.then(() => {
    app.listen(process.env.PORT,() => {
    console.log(`⚙️ Server Is Running`);
    
})
})
.catch((error) => {
    console.log(`Failed to connect Server and DB`);
    console.log(error);
    
})