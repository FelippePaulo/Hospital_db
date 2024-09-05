import { AppDataSource } from "./data-source"
import "reflect-metadata";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/Auth.routes";
import medicoRoutes from "./routes/Medico.routes";
import pacienteRoutes from "./routes/Paciente.routes"
import consultaRoutes from "./routes/Consulta.routes"
import { Paciente } from "./entity/Paciente";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api", medicoRoutes, pacienteRoutes, consultaRoutes, authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new Users()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(Users)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))