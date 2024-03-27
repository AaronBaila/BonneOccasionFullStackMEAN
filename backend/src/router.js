// *** IMPORTACIONES ***
import Router from "express" //Funcion de express para gestionar las rutas
import multer from "multer" //Es necesario usar multer en este caso para poder transformar el formData (multipart/form) que llega del frontend a formato JSON
//Importing AUTH FUNCTIONS
import {login, signup, verifyToken} from "./functions/authFunctions.js" //Funciones creadas por mi que se ejecutaran al entrar en una de las rutas
//Importing POST/UPDATE FUNCTIONS
import {postAnnounceStandard, postAnnounceVehicle, postAnnounceMoto, postAnnounceProperty, postAnnounceServicesJob, editProfile} from "./functions/postFunctions.js"
//Importing GET FUNCTIONS
import {getUser, getAnnounce, getAnnounces, getVehicles, getBicycles, getConsolesVideogames, getProperties, getHomeAppliances, getChildren, getCinemaBooksMusic, getConstruction, getSportLeisure, getJobs, getServices, getHomeGarden, getIndustryAgriculture, getComputingElectronics, getFashion, getSmartphonesTelephony, getTvAudioPhoto, getOthers, getMotos, getMyPosts} from "./functions/getFunctions.js"
//Importing DELETE FUNCTIONS
import {deleteAnnounce, deleteUser, deleteAnnouncesProfile} from "./functions/deleteFunctions.js"

// ********* VARIABLES ************
export const router = Router() //Enrutador (Lo exportamos para que se pueda utilizar en otras partes con "export")

// ** Configuracion de MULTER **

const storage = multer.diskStorage({ //Instanciamos una variable que contiene la configuracion de almacenaje para multer
    destination: function (req,file,cb){ //Indico la carpeta donde se guardaran las imagenes
        cb(null, '../frontend/src/assets/uploads/') //Archivos se guardaran en la carpeta ./uploads/
    },
    filename:function(req,file,cb){ //Indico el nombre del archivo que se va a almacenar
        cb(null, Math.random().toString(36).slice(-10) + '.jpg') //Mediante la funcion Math creo una combinacion de 10 caracteres aleatorios para nombrar la imagen
    }
})

const fileFilter = (req,file,cb) =>{ //Mediante esta varibale configura los filtros para los archivos que voy a permitir que se suban
    //Indico que solo pueda subir imaegenes con formato "jpeg, jpg y png"
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({ //Instanciamos multer como una variable llamada upload para poder utilizarlo con este nombre
    //Indico la configuracion con la que va a funcionar multer, utilizo las variables instanciadas arriba
    storage:storage,
    limits:{ //Indico el limite de peso de los archivos
        // 5.242.880 bytes = 5 Megabytes
        fileSize: 1024 * 1024 * 5 //Esta en Bytes (1024 * 1024 * 5 = 5.242.880 bytes que e slo mismo que 5 Megabytes)
    },
    fileFilter:fileFilter
})

//***********************************************

// ********* RUTAS ************

// * AUTH ROUTES *
router.route("/signup").post(upload.none(), signup) //Añado el upload.none() de multer para convertir el multipart/form data que llega del post a formato Json: https://community.postman.com/t/sending-request-with-form-data-failed-it-send-an-empty-object/30414/6
router.route("/login").post(upload.none(), login)

// * POST ROUTES *
//Utilizo multer para poder subir un array con un limite de 10 archivos ('photos es el nombre del array de fotos que viene del frontEnd' (tiene que ser el mismo nombre que en frontEnd))
router.route("/postannouncestandard").post(upload.array('photos', 10), postAnnounceStandard)
router.route("/postannouncevehicle").post(upload.array('photos', 10), postAnnounceVehicle)
router.route("/postannouncemoto").post(upload.array('photos', 10), postAnnounceMoto)
router.route("/postannounceproperty").post(upload.array('photos', 10), postAnnounceProperty)
router.route("/postannouncejobservice").post(upload.array('photos', 10), postAnnounceServicesJob)

// * EDIT ROUTES *
router.route("/editprofile").post(upload.none(), verifyToken, editProfile)

// * GET ROUTES *
//La mayoria son rutas POST porque le paso info(para los filtros), pero realmente hacen la funcion de GET
router.route("/user").get(verifyToken, getUser)
router.route("/myposts").get(upload.none(), verifyToken, getMyPosts)
//Get announces
router.route("/announce:id").get(getAnnounce)
router.route("/getannounces").post(upload.none(), getAnnounces)
router.route("/motoraccesories").post(upload.none(), getVehicles)
router.route("/bicycles").post(upload.none(), getBicycles)
router.route("/children").post(upload.none(), getChildren)
router.route("/cinemabooksmusic").post(upload.none(), getCinemaBooksMusic)
router.route("/consolesvideogames").post(upload.none(), getConsolesVideogames)
router.route("/construction").post(upload.none(), getConstruction)
router.route("/sportleisure").post(upload.none(), getSportLeisure)
router.route("/homeappliances").post(upload.none(), getHomeAppliances)
router.route("/homegarden").post(upload.none(), getHomeGarden)
router.route("/computingelectronics").post(upload.none(), getComputingElectronics)
router.route("/properties").post(upload.none(), getProperties)
router.route("/motos").post(upload.none(), getMotos)
router.route("/fashion").post(upload.none(), getFashion)
router.route("/smartphonestelephony").post(upload.none(), getSmartphonesTelephony)
router.route("/tvaudiophoto").post(upload.none(), getTvAudioPhoto)
router.route("/others").post(upload.none(), getOthers)
router.route("/industryagriculture").post(upload.none(), getIndustryAgriculture)
router.route("/jobs").post(upload.none(), getJobs)
router.route("/services").post(upload.none(), getServices)

// * DELETE ROUTES *
router.route("/deleteannounce:id").delete(deleteAnnounce)
router.route("/deleteuser:id").delete(deleteUser)
router.route("/deleteannouncesprofile").post(upload.none(), deleteAnnouncesProfile) //En este caso es un POST(porque le paso info), pero su verdadera funcion es la de Delete
