//IMPORTACIONES
import { User, AnnouncementStandard, AnnouncementVehicle, AnnouncementMoto, AnnouncementProperty, AnnouncementServiceJob} from "../bbdd/dbModels.js"
import * as fs from 'fs'

//************ FUNCIONES DELETE ****************

//Funcion para eliminar un usuario
export async function deleteUser(req, res){
    //Mediante req.params.id obtengo el id del frontend de la URL
    User.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{ //Mediante el id busco el anuncio a eliminar mediante mongoose
        res.json({
            status:"SUCCESS",
            message:"User succesfully deleted",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"FAILED",
            message:"An error occurred while deleting the user"
        })
    })
}

//Funcion para eliminar todos los anuncios de un usuario
export async function deleteAnnouncesProfile(req, res){
    //En esta variable almaceno el array que contiene el id de todos los anuncios publicados por el usuario actual loggeado
    let arrayMyPostsIDs = req.body.arrayMyPostsIDs

    //Mediante mongoose busco en todas las colecciones los anuncios que coincidan con los IDs de los anuncios del usuario loggeado
    let resultAnnounceStandard = await AnnouncementStandard.find({'_id':{$in: arrayMyPostsIDs}})
    let resultAnnounceServiceJob = await AnnouncementServiceJob.find({'_id':{$in: arrayMyPostsIDs}})
    let resultAnnounceProperty = await AnnouncementProperty.find({'_id':{$in: arrayMyPostsIDs}})
    let resultAnnounceVehicle = await AnnouncementVehicle.find({'_id':{$in: arrayMyPostsIDs}})
    let resultAnnounceMoto = await AnnouncementMoto.find({'_id':{$in: arrayMyPostsIDs}})

    //Mediante la sucesion de IFs compruebo en que colecciones se encuentran los anuncios
    if(resultAnnounceStandard !== null){ //Si hay anuncios Standard
        for(let i = 0; i<=resultAnnounceStandard.length-1;i++){ //Recorro todos los anuncios Standard encontrados (los del usuario actual)
            //Elimino las fotos del anuncio
            for(let x = 0; x<=resultAnnounceStandard[i].photosPaths.length-1; x++){
                try {
                    fs.unlinkSync("..\\frontend\\src\\"+resultAnnounceStandard[i].photosPaths[x]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                } catch (err) {
                    console.error(err);
                }              
            }
            //Elimino el anuncio
            AnnouncementStandard.findOneAndDelete({_id:resultAnnounceStandard[i]._id}).then(result =>{
                console.log(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
    if(resultAnnounceServiceJob !== null){
        for(let i = 0; i<=resultAnnounceServiceJob.length-1;i++){
            //Elimino las fotos del anuncio
            for(let x = 0; x<=resultAnnounceServiceJob[i].photosPaths.length-1; x++){
                try {
                    fs.unlinkSync("..\\frontend\\src\\"+resultAnnounceServiceJob[i].photosPaths[x]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                } catch (err) {
                    console.error(err);
                }              
            }
            //Elimino el anuncio
            AnnouncementServiceJob.findOneAndDelete({_id:resultAnnounceServiceJob[i]._id}).then(result =>{
                console.log(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
    if(resultAnnounceProperty !== null){
        for(let i = 0; i<=resultAnnounceProperty.length-1;i++){
            //Elimino las fotos del anuncio
            for(let x = 0; x<=resultAnnounceProperty[i].photosPaths.length-1; x++){
                try {
                    fs.unlinkSync("..\\frontend\\src\\"+resultAnnounceProperty[i].photosPaths[x]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                } catch (err) {
                    console.error(err);
                }              
            }
            //Elimino el anuncio
            AnnouncementProperty.findOneAndDelete({_id:resultAnnounceProperty[i]._id}).then(result =>{
                console.log(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
    if(resultAnnounceVehicle !== null){
        for(let i = 0; i<=resultAnnounceVehicle.length-1;i++){
            //Elimino las fotos del anuncio
            for(let x = 0; x<=resultAnnounceVehicle[i].photosPaths.length-1; x++){
                try {
                    fs.unlinkSync("..\\frontend\\src\\"+resultAnnounceVehicle[i].photosPaths[x]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                } catch (err) {
                    console.error(err);
                }              
            }
            //Elimino el anuncio
            AnnouncementVehicle.findOneAndDelete({_id:resultAnnounceVehicle[i]._id}).then(result =>{
                console.log(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
    if(resultAnnounceMoto !== null){
        for(let i = 0; i<=resultAnnounceMoto.length-1;i++){
            //Elimino las fotos del anuncio
            for(let x = 0; x<=resultAnnounceMoto[i].photosPaths.length-1; x++){
                try {
                    fs.unlinkSync("..\\frontend\\src\\"+resultAnnounceMoto[i].photosPaths[x]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                } catch (err) {
                    console.error(err);
                }              
            }
            //Elimino el anuncio
            AnnouncementMoto.findOneAndDelete({_id:resultAnnounceMoto[i]._id}).then(result =>{
                console.log(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    }

    res.send("User posts deleted succesfully")
}

//Funcion para eliminar un solo anuncio
export async function deleteAnnounce(req, res){
    //Mediante req.params.id obtengo el id del frontend del anuncio a eliminar
    //Mediante mongoose busco en todas las colecciones el anuncio a eliminar
    let resultAnnounceServiceJob = await AnnouncementServiceJob.findById(req.params.id.slice(1))
    let resultAnnounceProperty = await AnnouncementProperty.findById(req.params.id.slice(1))
    let resultAnnounceStandard = await AnnouncementStandard.findById(req.params.id.slice(1))
    let resultAnnounceVehicle = await AnnouncementVehicle.findById(req.params.id.slice(1))
    let resultAnnounceMoto = await AnnouncementMoto.findById(req.params.id.slice(1))
    
    //Mediante la sucesion de IFs compruebo en que coleccion se encuentra el anuncio a eliminar
    if(resultAnnounceServiceJob !== null){ //Si el resultado es diferente a null es que el resultado esta lleno y el anuncio se encuentra en la coleccion ServiceJob
        //Elimino las fotos del anuncio
        for(let i = 0; i<=resultAnnounceServiceJob.photosPaths.length-1; i++){
            try {
                fs.unlinkSync("..\\frontend\\src\\"+ resultAnnounceServiceJob.photosPaths[i]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
            } catch (err) {
                console.error(err)
            }              
        }
        //Elimino el anuncio
        AnnouncementServiceJob.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{
            res.json({
                status:"SUCCESS",
                message:"Anuncio Borrado Correctamente",
                data:result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error occurred while deleting announce"
            })
        })
    }else if(resultAnnounceProperty !== null){
        //Elimino las fotos del anuncio
        for(let i = 0; i<=resultAnnounceProperty.photosPaths.length-1; i++){
            try {
                fs.unlinkSync("..\\frontend\\src\\"+ resultAnnounceProperty.photosPaths[i]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
            } catch (err) {
                console.error(err)
            }              
        }
        //Elimino el anuncio
        AnnouncementProperty.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{
            res.json({
                status:"SUCCESS",
                message:"Anuncio Borrado Correctamente",
                data:result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error occurred while deleting announce"
            })
        })
    }else if(resultAnnounceStandard !== null){
        //Elimino las fotos del anuncio
        for(let i = 0; i<=resultAnnounceStandard.photosPaths.length-1; i++){
            try {
                fs.unlinkSync("..\\frontend\\src\\"+ resultAnnounceStandard.photosPaths[i]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
            } catch (err) {
                console.error(err);
            }              
        }
        //Elimino el anuncio
        AnnouncementStandard.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{
            res.json({
                status:"SUCCESS",
                message:"Anuncio Borrado Correctamente",
                data:result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error occurred while deleting announce"
            })
        })
    }else if(resultAnnounceVehicle !== null){
        //Elimino las fotos del anuncio
        for(let i = 0; i<=resultAnnounceVehicle.photosPaths.length-1; i++){
            try {
                fs.unlinkSync("..\\frontend\\src\\"+ resultAnnounceVehicle.photosPaths[i]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
            } catch (err) {
                console.error(err);
            }              
        }
        //Elimino el anuncio
        AnnouncementVehicle.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{
            res.json({
                status:"SUCCESS",
                message:"Anuncio Borrado Correctamente",
                data:result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error occurred while deleting announce"
            })
        })
    }else {
        //Elimino las fotos del anuncio
        for(let i = 0; i<=resultAnnounceMoto.photosPaths.length-1; i++){
            try {
                fs.unlinkSync("..\\frontend\\src\\"+ resultAnnounceMoto.photosPaths[i]) //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
            } catch (err) {
                console.error(err);
            }              
        }
        //Elimino el anuncio
        AnnouncementMoto.findOneAndDelete({_id:req.params.id.slice(1)}).then(result =>{
            res.json({
                status:"SUCCESS",
                message:"Anuncio Borrado Correctamente",
                data:result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error occurred while deleting announce"
            })
        })
    }
}