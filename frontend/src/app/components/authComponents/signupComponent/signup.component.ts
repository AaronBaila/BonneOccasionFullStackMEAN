import { Component } from '@angular/core'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'
import {Router} from '@angular/router'

/*
IMPORTANTE:

Para que el servicio funcione es necesario importar dentro de app.module.ts:
HttpClientModule, -> Para que las peticiones Http Funcionen
FormsModule -> Para poder obtener los datos del formulario correctamente

*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  //Variables que nos permiten mostrar los errores en el HTML mediante el uso de la directiva *ngIf
  ifErrorPassword:boolean
  ifErrorEmail:boolean
  ifError:boolean

  constructor(private authService:AuthservicesService, private router:Router){
    //Es necesario inicializar las variables mediante un constructor
    this.ifErrorPassword = false
    this.ifErrorEmail = false
    this.ifError = false
  }

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.router.navigate(['/'])
    }else{
      console.log("NO ESTA LOGEADO")
    }
  }

  //Funcion que mediante el uso de nuestro servicio nos permitira hacer la peticion POST con los datos aportados en los inputs
  uploadData(email:HTMLInputElement, password:HTMLInputElement, name:HTMLInputElement, phone:HTMLInputElement): boolean{ //La funcion tiene que reotrnar un Boolean para poder recoger los inputs (No se porque)
    //Reseteamos los errores para que no se acumulen y para poder mostrar otro tipo de error en caso de que haya
    this.ifError = false
    this.ifErrorEmail = false
    this.ifErrorPassword = false

    //Compruebo que los campos se han rellenado correctamente si no cambiamos la varibale de error para mostrarlo en el FrontEnd(HTML)
    if (email.value == "" || name.value == "" || password.value == "" || phone.value == ""){
      this.ifError = true
      this.ifErrorEmail = false
      this.ifErrorPassword = false
    }else if(password.value.length<8){
      this.ifErrorPassword = true
      this.ifError = false
      this.ifErrorEmail = false
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)){
      this.ifErrorEmail = true
      this.ifErrorPassword = false
      this.ifError = false
    }else{ //En caso de que los campos se rellenen correctamente, hacemos uso del servicio para realizar la peticion POST a el servidor Backend
      //USO DEL SERVICIO
      this.authService.signUpService(name.value, email.value, password.value, phone.value).subscribe(
        res =>{
          let objToken: any = {} //Inicializamos el objeto como any para que no de error ya que puede ser que no devuelva token y este vacio
          objToken = res
          console.log(objToken) //Pasamos por consola el resultado
          localStorage.setItem('token', objToken.token) //Almaceno el token en localStorage del navegador
          this.router.navigate(['/'])
        },
        err => {console.log(err)}
      )
    }

    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)
  }

}
