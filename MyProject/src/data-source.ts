import "reflect-metadata"
import { DataSource } from "typeorm"
import { Medico } from "./entity/Medico"
import { Paciente } from "./entity/Paciente"
import { Consulta } from "./entity/Consulta"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "felippe",
    password: "felippe",
    database: "Hospital_db",
    synchronize: true,
    logging: false,
    entities: [Consulta, Paciente, Medico],
    migrations: [],
    subscribers: [],
})
