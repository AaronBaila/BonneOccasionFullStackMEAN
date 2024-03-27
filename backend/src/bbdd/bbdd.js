//IMPORTACIONES
import mongoose from "mongoose" //Libreria que permite trabajar con Mongodb de manera mas sencilla
import 'dotenv/config' //Importo las variables generales del archivo .env

//VARIABLES
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//FUNCIONES
//Funcion que conecta con la BBDD (La funcion la exportamos para que se pueda utilizar en otras partes con "export")
export async function dbConnect(){

    await mongoose.connect(process.env.BBDD_URI, connectionParams) //Conexion
    const db = mongoose.connection //Almacenamos la conexion a la BD en la constante db

    db.on('error', console.error.bind(console, 'connection error:')) //Mensaje de error al conectarse
    console.log("Succesfully connected to BBDD") //Mensaje de confirmacion (Conexion correcta)

    return db
}

//Funcion que cierra la conexion con la BBDD
export async function dbClose(){
    await mongoose.connection.close(function () {
        console.log("BBDD conexion close")
        process.exit(0)
    });
}
