// * IMPORTS * 
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostupdateservicesService {

  constructor(private http:HttpClient) { } //Inicializamos las clases a utilizar (HttpClient para peticiones al servidor / router para redireccionar la pagina a otros componentes)

  // ******************************** POST / UPDATE SERVICES ********************************

  // **** Servicio subir anuncio standard ****
  uploadAnnounceStandard(title:string, email:string, phone:string, category:string, subcategory:string, sex:string, status:string, price:string, description:string, ubication:string, type:string, editNum:string, itsEdit:boolean, _idEdit:string, photosEditDelete:Array<string>, photosEdit:Array<string>, photos:Array<any>, _idUser:string){
    //VARIABLES
    let postAnnounceStandardURI = "http://localhost:3000/postannouncestandard" //URL peticiones Backend
    let edit =""
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Form data no acepta tipo de datos booleanos, por lo tanto pasamos el valor a un string
    if(itsEdit === undefined){ //Compruebo si es undefined lo cual quiere decir que viene de publicar y no de editar
      //En caso de venir de publicar, la variable la cambio a false
      edit = "false"
      //Le doy valor a los array para que no de error por undefined al pasarlos y usarlos en el backend
      photosEdit = [""]
      photosEditDelete = [""]
    }else{ //En caso de ser una edicion, dejo la variable como true 
      if(itsEdit){
        edit = "true"
      }else{ //El else no haria falta pero lo pongo
        edit = "false"
      }
    }

    //Mediante append, insertamos los datos en el formData
    fd.append("_idUser", _idUser)
    fd.append("_idEdit", _idEdit)
    fd.append("title", title)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("category", category)
    fd.append("subcategory", subcategory)
    fd.append("sex", sex)
    fd.append("status", status)
    fd.append("price", price)
    fd.append("description", description)
    fd.append("ubication", ubication)
    fd.append("type", type)
    fd.append("editNum", editNum)
    fd.append("itsEdit", edit)

    for (var i = 0; i < photos.length; i++) { //Utilizo bucle for para insertar en el formData el array de imagenes
      fd.append('photos', photos[i])
    }

    photosEdit.forEach((value) =>{ //Paso el array de paths de imagenes de la edicion
      fd.append("photosEdit[]", value)
    })

    photosEditDelete.forEach((value) =>{ //Paso el array de paths de imagenes a eliminar de la edicion
      fd.append("photosEditDelete[]", value)
    })

    return this.http.post(postAnnounceStandardURI, fd) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  // **** Servicio subir anuncio vehiculos ****
  uploadAnnounceVehiculo(brand:string, model:string, price:string, year:string, title:string, sellerType:string, version:string, numberSeats:string, numberDoors:string, horsepower:string, carType:string , kilometres:string, engine:string, gearShift:string, email:string, phone:string, description:string, ubication:string, type:string, editNum:string, itsEdit:boolean, _idEdit:string, photosEditDelete:Array<string>, photosEdit:Array<string>, photos:Array<any>, _idUser:string){
    //VARIABLES
    let postAnnounceVehicleURI = "http://localhost:3000/postannouncevehicle" //URL peticiones Backend
    let edit =""
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Form data no acepta tipo de datos booleanos, por lo tanto pasamos el valor a un string
    if(itsEdit === undefined){ //Compruebo si es undefined lo cual quiere decir que viene de publicar y no de editar
      //En caso de venir de publicar, la variable la cambio a false
      edit = "false"
      //Le doy valor a los array para que no de error por undefined al pasarlos y usarlos en el backend
      photosEdit = [""]
      photosEditDelete = [""]
    }else{ //En caso de ser una edicion, dejo la variable como true 
      if(itsEdit){
        edit = "true"
      }else{ //El else no haria falta pero lo pongo
        edit = "false"
      }
    }

    //Mediante append, insertamos los datos en el formData
    fd.append("_idUser", _idUser)
    fd.append("brand", brand)
    fd.append("model", model)
    fd.append("price", price)
    fd.append("year", year)
    fd.append("title", title)
    fd.append("sellerType", sellerType)
    fd.append("version", version)
    fd.append("numberSeats", numberSeats)
    fd.append("numberDoors", numberDoors)
    fd.append("horsepower", horsepower)
    fd.append("carType", carType)
    fd.append("kilometres", kilometres)
    fd.append("engine", engine)
    fd.append("gearShift",gearShift)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("description", description)
    fd.append("ubication", ubication)
    fd.append("type", type)
    fd.append("editNum", editNum)
    fd.append("itsEdit", edit)
    fd.append("_idEdit", _idEdit)

    for (var i = 0; i < photos.length; i++) { //Utilizo bucle for para insertar en el formData el array de imagenes
      fd.append('photos', photos[i])
    }

    photosEdit.forEach((value) =>{ //Paso el array de paths de imagenes de la edicion
      fd.append("photosEdit[]", value)
    })

    photosEditDelete.forEach((value) =>{ //Paso el array de paths de imagenes a eliminar de la edicion
      fd.append("photosEditDelete[]", value)
    })

    return this.http.post(postAnnounceVehicleURI, fd) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  // **** Servicio subir anuncio moto ****
  uploadAnnounceMoto(brand:string, model:string, price:string, year:string, title:string, sellerType:string, version:string, horsepower:string, motoType:string , kilometres:string, email:string, phone:string, description:string, ubication:string, type:string, editNum:string, itsEdit:boolean, _idEdit:string, photosEditDelete:Array<string>, photosEdit:Array<string>, photos:Array<any>, _idUser:string){
    //VARIABLES
    let postAnnounceMotoURI = "http://localhost:3000/postannouncemoto" //URL peticiones Backend
    let edit =""
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Form data no acepta tipo de datos booleanos, por lo tanto pasamos el valor a un string
    if(itsEdit === undefined){ //Compruebo si es undefined lo cual quiere decir que viene de publicar y no de editar
      //En caso de venir de publicar, la variable la cambio a false
      edit = "false"
      //Le doy valor a los array para que no de error por undefined al pasarlos y usarlos en el backend
      photosEdit = [""]
      photosEditDelete = [""]
    }else{ //En caso de ser una edicion, dejo la variable como true 
      if(itsEdit){
        edit = "true"
      }else{ //El else no haria falta pero lo pongo
        edit = "false"
      }
    }

    //Mediante append, insertamos los datos en el formData
    fd.append("_idUser", _idUser)
    fd.append("brand", brand)
    fd.append("model", model)
    fd.append("price", price)
    fd.append("year", year)
    fd.append("title", title)
    fd.append("sellerType", sellerType)
    fd.append("version", version)
    fd.append("horsepower", horsepower)
    fd.append("motoType", motoType)
    fd.append("kilometres", kilometres)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("description", description)
    fd.append("ubication", ubication)
    fd.append("type", type)
    fd.append("editNum", editNum)
    fd.append("itsEdit", edit)
    fd.append("_idEdit", _idEdit)

    for (var i = 0; i < photos.length; i++) { //Utilizo bucle for para insertar en el formData el array de imagenes
      fd.append('photos', photos[i])
    }

    photosEdit.forEach((value) =>{ //Paso el array de paths de imagenes de la edicion
      fd.append("photosEdicion[]", value)
    })

    photosEditDelete.forEach((value) =>{ //Paso el array de paths de imagenes a eliminar de la edicion
      fd.append("photosEdicionDelete[]", value)
    })

    return this.http.post(postAnnounceMotoURI, fd) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  // **** Servicio subir anuncio propiedades/inmobiliaria ****
  uploadAnnounceProperty(title:string, sellerType:string, rentOrSell:string, typeOfSpace:string, price:string, area:string, status:string, email:string, phone:string, description:string, ubication:string, type:string, editNum:string, itsEdit:boolean, _idEdit:string, photosEditDelete:Array<string>, photosEdit:Array<string>, photos:Array<any>, _idUser:string){
    //VARIABLES
    let postAnnouncePropertyURI = "http://localhost:3000/postannounceproperty" //URL peticiones Backend
    let edit =""
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Form data no acepta tipo de datos booleanos, por lo tanto pasamos el valor a un string
    if(itsEdit === undefined){ //Compruebo si es undefined lo cual quiere decir que viene de publicar y no de editar
      //En caso de venir de publicar, la variable la cambio a false
      edit = "false"
      //Le doy valor a los array para que no de error por undefined al pasarlos y usarlos en el backend
      photosEdit = [""]
      photosEditDelete = [""]
    }else{ //En caso de ser una edicion, dejo la variable como true 
      if(itsEdit){
        edit = "true"
      }else{ //El else no haria falta pero lo pongo
        edit = "false"
      }
    }

    //Mediante append, insertamos los datos en el formData
    fd.append("_idUser", _idUser)
    fd.append("_idEdit", _idEdit)
    fd.append("title", title)
    fd.append("sellerType", sellerType)
    fd.append("rentOrSell", rentOrSell)
    fd.append("typeOfSpace", typeOfSpace)
    fd.append("price", price)
    fd.append("area", area)
    fd.append("status", status)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("description", description)
    fd.append("ubication", ubication)
    fd.append("type", type)
    fd.append("editNum", editNum)
    fd.append("itsEdit", edit)

    for (var i = 0; i < photos.length; i++) { //Utilizo bucle for para insertar en el formData el array de imagenes
      fd.append('photos', photos[i])
    }

    photosEdit.forEach((value) =>{ //Paso el array de paths de imagenes de la edicion
      fd.append("photosEdit[]", value)
    })

    photosEditDelete.forEach((value) =>{ //Paso el array de paths de imagenes a eliminar de la edicion
      fd.append("photosEditDelete[]", value)
    })

    return this.http.post(postAnnouncePropertyURI, fd) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  // **** Servicio subir anuncio propiedades/inmobiliaria **** 
  uploadAnnounceServiceJob(title:string, category:string, price:string, email:string, phone:string, description:string, ubication:string, type:string, editNum:string, itsEdit:boolean, _idEdit:string, photosEditDelete:Array<string> ,photosEdit:Array<string>, photos:Array<any>, _idUser:string){
    //VARIABLES
    let postAnnounceJobServiceURI = "http://localhost:3000/postannouncejobservice" //URL peticiones Backend
    let edit = ""
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Form data no acepta tipo de datos booleanos, por lo tanto pasamos el valor a un string
    if(itsEdit === undefined){ //Compruebo si es undefined lo cual quiere decir que viene de publicar y no de editar
      //En caso de venir de publicar, la variable la cambio a false
      edit = "false"
      //Le doy valor a los array para que no de error por undefined al pasarlos y usarlos en el backend
      photosEdit = [""]
      photosEditDelete = [""]
    }else{ //En caso de ser una edicion, dejo la variable como true 
      if(itsEdit){
        edit = "true"
      }else{ //El else no haria falta pero lo pongo
        edit = "false"
      }
    }

    //Mediante append, insertamos los datos en el formData para pasarlos al backend
    fd.append("_idEdit", _idEdit) //En caso de ser una edicion se pasa el id del anuncio a editar, en caso contrario se pasa un string vacio
    fd.append("_idUser", _idUser)
    fd.append("title", title)
    fd.append("category", category)
    fd.append("price", price)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("description", description)
    fd.append("ubication", ubication)
    fd.append("type", type)
    fd.append("editNum", editNum)
    fd.append("itsEdit", edit)

    for (var i = 0; i < photos.length; i++) { //Utilizo bucle for para insertar en el formData el array de imagenes
      fd.append('photos', photos[i])
    }

    photosEdit.forEach((value) =>{ //Paso el array de paths de imagenes de la edicion
      fd.append("photosEdit[]", value)
    })

    photosEditDelete.forEach((value) =>{ //Paso el array de paths de imagenes a eliminar de la edicion
      fd.append("photosEditDelete[]", value)
    })

    return this.http.post(postAnnounceJobServiceURI, fd) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  // **** Servicio para editar los datos de un solo usuario **** 
  editProfile(name:string, email:string, phone:string, token:any){
    let editProfileURI = "http://localhost:3000/editprofile"

    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    fd.append("name", name)
    fd.append("email", email)
    fd.append("phone", phone)

    //Pasamos el token mediante los headers para validar que el usuario esta loggeado y ademas poder localizarlo y editarlo en la BBDD mediante el token
    return this.http.post(editProfileURI, fd, {headers: {'token':token}}) //Pasamos el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

}
