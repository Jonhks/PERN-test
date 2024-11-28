import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// ? instancia de express
const server = express();

// ? Conexion a bd

export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue.bold("conexion exitosa ala bd"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("Error al conectar la base de datos"));
  }
};

connectDB();

// ? Ler datos
server.use(express.json());

//Routing
server.use("/api/products", router);

//? Docs

server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
