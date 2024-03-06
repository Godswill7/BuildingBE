import env from "dotenv"
env.config();

 const envElements = {
   port: parseInt(process.env.PORT!),
   databaseString: process.env.DB_STRING!,
 };

export default envElements;