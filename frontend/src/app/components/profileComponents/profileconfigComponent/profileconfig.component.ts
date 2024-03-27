import { Component } from '@angular/core'
import { PostupdateservicesService } from 'src/app/services/postUpdateServices/postupdateservices.service'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'
import { DeleteservicesService } from 'src/app/services/deleteServices/deleteservices.service'
import { Router } from '@angular/router'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'

@Component({
  selector: 'app-profileconfig',
  templateUrl: './profileconfig.component.html',
  styleUrls: ['./profileconfig.component.css']
})
export class ProfileconfigComponent {

  resUserLogged:any
  _idUser:any
  ArrayMyPosts:any

  token = localStorage.getItem('token') //Obtenemos el token del localStorage para asi pasarlo al backend mediante el servicio y verificar que el usuario esta logeado

  constructor(private postUpdateServices:PostupdateservicesService, private getServices:GetservicesService, private deleteServices:DeleteservicesService, private router:Router, public authService:AuthservicesService){}//Instancio el servicio

  ngOnInit() {
    this.getServices.getUser(this.token).subscribe( //Usamos el servicio
      res=>{
        this.resUserLogged = res
        console.log(this.resUserLogged[0]._id.toString())
        this._idUser = this.resUserLogged[0]._id.toString()
      },
      err =>{ 
        if(err.status == 401){
          this.authService.logOutService()
          this.router.navigate(['/login'])
        }
      }
    )
  }

  updateData(name:HTMLInputElement, email:HTMLInputElement, phone:HTMLInputElement){
    this.postUpdateServices.editProfile(name.value, email.value, phone.value, this.token)
      .subscribe(
        res => {
          console.log(res)
        }, 
        err => console.log(err)
      )
  }

  deleteUser(){
    this.getServices.getMyPosts(this.token).subscribe( //Usamos el servicio
      res=>{
        this.ArrayMyPosts = res

        this.deleteServices.deleteAnnouncesProfile(this.ArrayMyPosts).subscribe( //Usamos el servicio
          res=>{
            console.log(res)
          },
          err =>{console.log(err)}
        )

      },
      err =>{console.log(err)}
    )

    this.deleteServices.deleteUser(this._idUser).subscribe(
      res => {

        console.log(res)
        this.authService.logOutService()
        this.router.navigate(['/login'])

      }, 
      err => {console.log(err)}
    )
  }
}
