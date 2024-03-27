import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent {
  
  ArrayMyPosts:any

  constructor(private getServices:GetservicesService, public authService:AuthservicesService, private router:Router){}

  ngOnInit() { //Funcion que se va a ejecutar nada mas cargar el componente
    let token = localStorage.getItem('token') //Obtenemos el token del localStorage para asi pasarlo al backend mediante el servicio y verificar que el usuario esta logeado

    this.getServices.getMyPosts(token).subscribe( //Usamos el servicio
      res=>{
        this.ArrayMyPosts = res
      },
      err =>{
        if(err.status == 401){
          this.authService.logOutService()
          this.router.navigate(['/login'])
        }
      }
    )
  }

}
