// * IMPORTS * 
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetservicesService {

  constructor(private http:HttpClient) { } //Inicializamos las clases a utilizar (HttpClient para peticiones al servidor / router para redireccionar la pagina a otros componentes)

// ******************************** GET SERVICES ********************************

  //Servicio para obtener los usuarios de la BBDD
  getUser(token:any){
    let getUsersURI = "http://localhost:3000/user" //URL peticion al Backend
    return this.http.get(getUsersURI, {headers: {'token':token}}) //Mediante los headers le pasamos el token que esta almacenado en localStorage para verificar que el usuario esta logeado y puede acceder
  }

  //Servicio para obtener un solo anuncio
  getAnnounce(id:string){
    let getAnnounceURI = "http://localhost:3000/announce:" + id
    return this.http.get(getAnnounceURI)
  }

  //Servicio para obtener anuncios
  getAnnounces(announcesArray:any){
    let getAnnouncesURI = "http://localhost:3000/getannounces" //URL peticion Backend

    if(announcesArray == undefined){ //Si es undefined lo dejamos como un string vacio para que no de error por undefined.
      announcesArray = ""
    }
    
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Mediante append, insertamos los datos en el formData
    for (let i = 0 ; i<= announcesArray.length-1; i++){
      fd.append("announcesArray[]", announcesArray[i]._id) //Paso el array de anuncios mostrados en un primer momento (para que no se repitan)
    }

    return this.http.post(getAnnouncesURI, fd)
  }

  //Servicio para obtener los anuncios de el usuario actual loggeado
  getMyPosts(token:any){
    let getMyPostsURI = "http://localhost:3000/myposts" //URL peticion Backend
    //Mediante headers pasamos el token del usuario actual y de esta manera poder obtener sus anuncios
    return this.http.get(getMyPostsURI, {headers: {'token':token}})
  }

  // ******** Anuncios Standard ******** 

  //Servicio para obtener anuncios bicicletas
  getBicycles(){
    let getBicyclesURI = "http://localhost:3000/bicycles"
    return this.http.post(getBicyclesURI, "fdVacio")
  }

  //Servicio para obtener anuncios cosas niños
  getChildren(){
    let getChildrenURI = "http://localhost:3000/children"
    return this.http.post(getChildrenURI, "fdVacio")
  }

  //Servicio para obtener anuncios libros, musica y cine
  getCinemaBooksMusic(){
    let getCinemaBooksMusicURI = "http://localhost:3000/cinemabooksmusic"
    return this.http.post(getCinemaBooksMusicURI, "fdVacio")
  }

  //Servicio para obtener anuncios consolas y videojuegos
  getConsolesVideogames(){
    let getConsolesVideogamesURI = "http://localhost:3000/consolesvideogames"
    return this.http.post(getConsolesVideogamesURI, "fdVacio")
  }

  //Servicio para obtener anuncios construccion
  getConstruction(){
    let getConstructionURI = "http://localhost:3000/construction"
    return this.http.post(getConstructionURI, "fdVacio")
  }

  //Servicio para obtener anuncios deporte y ocio
  getSportLeisure(){
    let getSportLeisureURI = "http://localhost:3000/sportleisure"
    return this.http.post(getSportLeisureURI, "fdVacio")
  }

  //Servicio para obtener anuncios electrodomesticos
  getHomeAppliances(){
    let getHomeAppliancesURI = "http://localhost:3000/homeappliances"
    return this.http.post(getHomeAppliancesURI, "fdVacio")
  }

  //Servicio para obtener anuncios casa y jardin
  getHomeGarden(){
    let getHomeGardenURI = "http://localhost:3000/homegarden"
    return this.http.post(getHomeGardenURI, "fdVacio")
  }

  //Servicio para obtener anuncios informatica y electronica
  getComputingElectronics(){
    let getComputingElectronicsURI = "http://localhost:3000/computingelectronics"
    return this.http.post(getComputingElectronicsURI, "fdVacio")
  }

  //Servicio para obtener anuncios industria y agricultura
  getIndustryAgriculture(){
    let getIndustryAgricultureURI = "http://localhost:3000/industryagriculture"
    return this.http.post(getIndustryAgricultureURI, "fdVacio")
  }

  //Servicio para obtener anuncios moda
  getFashion(){
    let getFashionURI = "http://localhost:3000/fashion"
    return this.http.post(getFashionURI, "fdVacio")
  }

  //Servicio para obtener anuncios otros
  getOthers(){
    let getOthersURI = "http://localhost:3000/others"
    return this.http.post(getOthersURI, "fdVacio")
  }

  //Servicio para obtener anuncios telefonia
  getSmartphonesTelephony(){
    let getSmartphonesTelephonyURI = "http://localhost:3000/smartphonestelephony"
    return this.http.post(getSmartphonesTelephonyURI, "fdVacio")
  }

  //Servicio para obtener anuncios TV, audio y foto
  getTvAudioPhoto(){
    let getTvAudioPhotoURI = "http://localhost:3000/tvaudiophoto"
    return this.http.post(getTvAudioPhotoURI, "fdVacio")
  }

  // ******** Anuncios Propiedades/Inmobiliaria ********

  //Servicio para obtener anuncios propiedades
  getProperties(){
    let getPropertiesURI = "http://localhost:3000/properties"
    return this.http.post(getPropertiesURI, "fdVacio")
  }

  // ******** Anuncios Motor y accesorios ********

  //Servicio para obtener anuncios motos
  getMotos(){
    let getMotosURI = "http://localhost:3000/motos"
    return this.http.post(getMotosURI, "fdVacio")
  }

  //Servicio para obtener anuncios motor y accesorios
  getMotorAccesories(){
    let getMotorAccesoriesURI = "http://localhost:3000/motoraccesories"
    return this.http.post(getMotorAccesoriesURI, "fdVacio")
  }

  // ******** Anuncios Empleo y servicios ********

  //Servicio para obtener anuncios empleos
  getJobs(){
    let getJobsURI = "http://localhost:3000/jobs"
    return this.http.post(getJobsURI, "fdVacio")
  }

  //Servicio para obtener anuncios servicios
  getServices(){
    let getServicesURI = "http://localhost:3000/services"
    return this.http.post(getServicesURI, "fdVacio")
  }

}
