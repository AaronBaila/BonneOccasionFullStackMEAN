import { Component } from '@angular/core'
import { ActivatedRoute } from "@angular/router"
import { GetservicesService } from 'src/app/services/getServices/getservices.service'
import { Router } from '@angular/router'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'
import { ComponentservicesService } from 'src/app/services/componentServices/componentservices.service'

@Component({
  selector: 'app-getannounce',
  templateUrl: './getannounce.component.html',
  styleUrls: ['./getannounce.component.css']
})
export class GetannounceComponent {

  id:string
  announce:any
  ArrayMyPosts:any
  itsLogged:boolean = false
  showEditNum:boolean = false
  showPhoneMSG:boolean = false

  showJobServiceInformation:boolean = false
  showStandardInformation:boolean = false
  showVehicleInformation:boolean = false
  showPropertyInformation:boolean = false
  showMotoInformation:boolean = false
  showValidErrorMSG:boolean = false

  constructor(private route: ActivatedRoute, private router:Router, private getServices:GetservicesService, private compService:ComponentservicesService, private authService:AuthservicesService) {
    this.id = ""
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id = params['id']
      this.id = this.id.slice(1)
    })

    this.getServices.getAnnounce(this.id).subscribe(
      res =>{
        this.announce = res

        if(this.announce.type == "job" || this.announce.type == "service"){
          this.showJobServiceInformation = true
        }else if(this.announce.type == "standard"){
          this.showStandardInformation = true
        }else if(this.announce.type == "vehicle"){
          this.showVehicleInformation = true
        }else if(this.announce.type == "property"){
          this.showPropertyInformation = true
        }else if(this.announce.type == "moto"){
          this.showMotoInformation = true
        }

      },
      err =>{console.log(err)}
    )

    if(this.authService.isLoggedService()){
      let token = localStorage.getItem('token') //Obtenemos el token del localStorage para asi pasarlo al backend mediante el servicio y verificar que el usuario esta logeado

      this.getServices.getMyPosts(token).subscribe( //Usamos el servicio
        res=>{
          this.ArrayMyPosts = res

          if(this.announce._idUser !== "Anonymous"){
            for(let i=0; i<=this.ArrayMyPosts.length-1;i++){
              if(this.announce._idUser == this.ArrayMyPosts[i]._idUser){
                this.itsLogged = true
                console.log("EL ANUNCIO ES DEL USUARIO")
              }
            }
          }
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

  editAnnounce(){
    if(this.itsLogged){
      if(this.announce.type == "job"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postJobs'])
      }
    }else{
      console.log(this.announce.editNum)
      this.showEditNum = true
    }
  }

  showPhone(){
    this.showPhoneMSG = true
  }

  hiddePhone(){
    this.showPhoneMSG = false
  }

  postAnother(){
    this.router.navigate(['/postannounce'])
  }

  validarNumEdicion(editNum:HTMLInputElement){
    if(editNum.value == this.announce.editNum){
      if(this.announce.type == "job"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postJobs'])
      }else if(this.announce.type == "service"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postServices'])
      }
      else if(this.announce.type == "standard"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postStandard'])
      }else if(this.announce.type == "vehicle"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postVehicle'])
      }else if(this.announce.type == "property"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postProperties'])
      }else if(this.announce.type == "moto"){
        this.compService.cambiarDatos(true, this.announce)
        this.router.navigate(['/postMotos'])
      }
    }else{
      this.showValidErrorMSG = true
      console.log("El numero de edicion es incorrecto")
    }
  }

 /* idAnnounce:string
  announce:any

  _idUser = "Anonymous"
  resUserLogged:any
  ArrayMyPosts:any
  itsLogged:boolean = false

  itsEdit = true
  showEditNum = false
  showService = false
  showJob = false
  showProperty = false
  showStandard = false
  showVehicle = false
  showMoto = false
  showDeleteBtn = false

  constructor(private route: ActivatedRoute, private getServices:GetservicesService,private deleteServices:DeleteservicesService, private router:Router, public authService:AuthservicesService) {
    this.idAnnounce = ""
    this.announce = {
      type:""
    }
  }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      this.idAnnounce = params['id']
      this.idAnnounce = this.idAnnounce.slice(1)
    })

    if(this.authService.isLoggedService()){
      let token = localStorage.getItem('token') //Obtenemos el token del localStorage para asi pasarlo al backend mediante el servicio y verificar que el usuario esta logeado

      this.getServices.getMyPosts(token).subscribe( //Usamos el servicio
        res=>{
          this.ArrayMyPosts = res

          this.getServices.getAnnounce(this.idAnnounce).subscribe(
            res =>{
              this.announce = res

              if(this.announce._idUser !== "Anonymous"){
                for(let i=0; i<=this.ArrayMyPosts.length-1;i++){
                  if(this.announce._idUser == this.ArrayMyPosts[i]._idUser){
                    this.itsLogged = true
                    console.log("EL ANUNCIO ES DEL USUARIO")
                  }
                }
              }
            },
            err =>{console.log(err)}
          )
        },
        err =>{
          if(err.status == 401){
            this.authService.logOutService()
            this.router.navigate(['/login'])
          }
        }
      )
    }

    this.getServices.getAnnounce(this.idAnnounce).subscribe(
      res =>{
        this.announce = res
      },
      err =>{console.log(err)}
    )

  }

  deleteAnnounce(){
    this.deleteServices.deleteAnnounce(this.idAnnounce)
    .subscribe(
      res=>{
        console.log(res)
        this.router.navigate(["/"])
      },
      err => console.log(err)
    )
  }

  editAnnounce(){
    
    if(this.itsLogged){
      this.showDeleteBtn = true
      if(this.announce.type == "service"){
        this.showService = true
      }else if(this.announce.type == "job"){
        this.showJob = true
      }else if(this.announce.type == "property"){
        this.showProperty = true
      }else if (this.announce.type == "standard"){
        this.showStandard = true
      }else if(this.announce.type == "vehicle"){
        this.showVehicle = true
      }else if(this.announce.type == "moto"){
        this.showMoto = true
      }
    }

    this.showEditNum = true
    console.log("Numero de edicion:")
    console.log(this.announce.editNum)
  }

  validarNumEdicion(editNum:HTMLInputElement){

    if(editNum.value == this.announce.editNum){
      this.showDeleteBtn = true
      if(this.announce.type == "service"){
        this.showService = true
      }else if(this.announce.type == "job"){
        this.showJob = true
      }else if(this.announce.type == "property"){
        this.showProperty = true
      }else if (this.announce.type == "standard"){
        this.showStandard = true
      }else if(this.announce.type == "vehicle"){
        this.showVehicle = true
      }else if(this.announce.type == "moto"){
        this.showMoto = true
      }
    }else{
      console.log("El numero de edicion es incorrecto")
    }
  }*/
}
