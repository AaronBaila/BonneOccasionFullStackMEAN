//IMPORTACIONES
import express from "express" //Servidor
import morgan from "morgan" //Logs del servidor
import bodyParser from "body-parser" //Necesario para gestionar la informacion que nos llega del frontEnd (gestionar json y  req.body)
import { dbConnect } from "./bbdd/bbdd.js"
import { router } from "./router.js"
import cors from 'cors' //Importante para poder recibir peticiones desde el FrontEnd

//VARIABLES DEL SERVIDOR
const app = express() //Server
app.set("port", process.env.PORT || 3000) //Con process.env.PORT le decimos que coja el puerto por defecto que nos proporciona el servidor, si no hay que use el 3000

//MIDDLEWARES
/* 
IMPORTANTE: 
Es necesario añadir todos los MIDDLEWARES antes que el Middleware de las rutas.
app.use("/", router) -> Este Middleware se añade siempre a el final
*/

app.use(bodyParser.urlencoded({extended:true})) //Necesario para poder obtener el body (req.body)
app.use(bodyParser.json()) //Necesario para que el server gestione los json
app.use(morgan("dev")) //Logs en consola (peticiones, etc.)
app.use(cors()) //Importante para poder recibir peticiones desde el FrontEnd 
app.use("/", router)

//EJECUCION DE FUNCIONES ( INICIO DEL SERVIDOR Y LA BBDD )
startServer() //Funcion que inicia el servidor
dbConnect() //Funcion que establece la conexion con la BBDD

//FUNCIONES
//Funcion que inicia el servidor
function startServer(){
    //Mediante app.listen iniciamos el servidor ("escucha en el puerto asignado")
    app.listen(app.get("port"), ()=>{
        console.log("Server running on port " + app.get("port"))
    })
}
