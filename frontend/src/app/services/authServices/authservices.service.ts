// *** IMPORTS *** 
import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private http:HttpClient, private router:Router) { } //Inicializamos las clases a utilizar (HttpClient para peticiones al servidor / router para redireccionar la pagina a otros componentes)

  // ******************************** AUTH SERVICES ********************************

  // **** Servicio para registrar un usuario nuevo **** 
  signUpService(name:string, email:string, password:string, phone:string){
    let uriSignUp = "http://localhost:3000/signup" //URL peticiones Backend
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend 
    const fd = new FormData()
    //Mediante append, insertamos los datos en el formData
    fd.append("name", name)
    fd.append("email", email)
    fd.append("phone", phone)
    fd.append("password", password)

    return this.http.post(uriSignUp, fd)
  }

  // **** Servicio para loggear un usuario **** 
  loginService(email:string, password:string){
    let uriLogin = "http://localhost:3000/login" //URL peticiones Backend
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend 
    const fd = new FormData()
    //Mediante append, insertamos los datos en el formData
    fd.append("email", email)
    fd.append("password", password)

    return this.http.post(uriLogin, fd)
  }

   // **** Servicio para comprobar si un usuario esta loggeado **** 
  isLoggedService(){ //Funcion para comprobar si hay un usuario logeado
    if(localStorage.getItem('token') == "undefined"){
      localStorage.removeItem('token')
      return false
    }else{
      //Con !! devuelve true si existe el token dentro del localStorage
      return !!localStorage.getItem('token')
    }
  }

  // **** Servicio para cerrar la sesion de un usuario **** 
  logOutService(){ //Funcion para cerrar sesion eliminando el token
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
