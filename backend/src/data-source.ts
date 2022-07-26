import "reflect-metadata"
import { ConnectionOptions, DataSource } from "typeorm"
import { Expense } from "./entity/Expense"
import { Income } from "./entity/Income"
import { Token } from "./entity/Token"
import { User } from "./entity/User"
import { Wallet } from "./entity/Wallet"

export const AppDataSource:ConnectionOptions ={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/**/entity/*.ts`], 
    migrations: [`${__dirname}/**/migration/*.ts`], 
    subscribers: [],
}
