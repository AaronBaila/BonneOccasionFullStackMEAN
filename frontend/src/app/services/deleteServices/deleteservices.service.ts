// * IMPORTS * 
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DeleteservicesService {

  constructor(private http:HttpClient) { } //Inicializamos las clases a utilizar (HttpClient para peticiones al servidor / router para redireccionar la pagina a otros componentes)

  // ******************************** DELETE SERVICES ********************************

  //Funcion para eliminar un solo anuncio
  deleteAnnounce(id:string){
    let deleteAnnounceURI = "http://localhost:3000/deleteannounce:" + id //URL peticiones al Backend. A la URL le paso el id del anuncio a eliminar
    
    return this.http.delete(deleteAnnounceURI)
  }

  //Funcion para eliminar un solo usuario
  deleteUser(_idUser:string){
    let deleteUserURI = "http://localhost:3000/deleteuser:" + _idUser //URL peticiones al Backend. A la URL le paso el id del usuario a eliminar

    return this.http.delete(deleteUserURI)
  }

  //Funcion para eliminar todos los anuncios pertenecientes a un usuario
  deleteAnnouncesProfile(arrayMyPosts:Array<any>){
    let deleteAnnouncesProfileURI = "http://localhost:3000/deleteannouncesprofile" //URL peticiones al Backend
    let arrayMyPostsIDs = [""] //Mediante esta variable, almaceno las ID de todos los posts pertenecientes a un usuario. De esta manera puedo eliminar todos los anuncios pertenecientes a un usuario
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    arrayMyPosts.forEach((value) =>{ //Paso el array de IDs
      arrayMyPostsIDs.push(value._id.toString())
    })

    arrayMyPostsIDs.splice(0,1) //Elimino el primer elemente del array, el cual es una string vacia debido a que he tenido que inicializarlo para que no de error por undefined 

    for (let i = 0; i<= arrayMyPostsIDs.length-1; i++){
      fd.append("arrayMyPostsIDs[]", arrayMyPostsIDs[i]) //Paso el array mediante append
    }

    return this.http.post(deleteAnnouncesProfileURI, fd)
  }

}
