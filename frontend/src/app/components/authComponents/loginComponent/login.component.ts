import { Component } from '@angular/core'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthservicesService, private router:Router){
  }

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.router.navigate(['/'])
    }else{
      console.log("NO ESTA LOGEADO")
    }
  }

  //Funcion que obtiene los datos del submit y los gestiona para realizar la peticion post al servidor mediante el servicio
  uploadData(email:HTMLInputElement, password:HTMLInputElement): boolean{
    this.authService.loginService(email.value, password.value).subscribe(
      res=>{
        let objToken: any = {} //Inicializamos el objeto como any para que no de error ya que puede ser que no devuelva token y este vacio
        objToken = res
        localStorage.setItem('token', objToken.token) //Almaceno el token en localStorage del navegador
        this.router.navigate(['/'])
      })
  
    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)
  }

}
