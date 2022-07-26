import * as express from "express";
import * as cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { createConnection, ConnectionOptions} from "typeorm";

const router = require("./routes/index");



const errorMiddleware = require("./middleware/error-middleware");

const cookieParser = require("cookie-parser");

const app = express();




createConnection({...AppDataSource})
  .then(async (connection) => {
    await connection.runMigrations()
    app.use(cors({
        credentials:true,
        origin:'http://localhost:3000'
    }))
    app.use(cookieParser())
    app.use(express.json())
    app.use('/api', router)
    app.use(express.urlencoded({ extended: false }))
    app.use(errorMiddleware)
    app.listen(8080, () => {
        console.log('Now running on port 8080')
    })
  })
  .catch((error) => console.log(error));
