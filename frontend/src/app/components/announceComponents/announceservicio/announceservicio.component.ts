// *** IMPORTS *** 
import { Component} from '@angular/core'
import { PostupdateservicesService } from 'src/app/services/postUpdateServices/postupdateservices.service'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'
import { Router } from '@angular/router'
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'
import { ComponentservicesService } from 'src/app/services/componentServices/componentservices.service'
import { onPhotoSelectedC, deletePhotoC, deletePhotoEditC, changePhotoC, changePhotoEditC, resetVars} from 'src/app/functions/componentFunctions'
import { DeleteservicesService } from 'src/app/services/deleteServices/deleteservices.service'


// INFO:
// Utilizo el mismo componente para publicar y para editar un anuncio, dependiendo de donde vengas (publicar/editar), el .ts tiene variables que se comportaran de manera diferente
// Por ejemplo en caso de que venga de una edicion, el Array "arrayPhotosEdicion" estara lleno (si el auncio tiene fotos) y en caso contrario (es una publicacion), el array esatara vacio

@Component({
  selector: 'app-announceservicio',
  templateUrl: './announceservicio.component.html',
  styleUrls: ['./announceservicio.component.css']
})

export class AnnounceservicioComponent {
  // ********** VARIABLES ********** (Todas las variables que tiene en el nombre la palabra 'edit' es porque son variables que se utilizaran cuando es un edit)

  // *** VARIABLES PROVENIENTES DE OTRO COMPONENTE ***
  itsEditRecibido: boolean
  announceRecibido:any

  // *** VARIABLES PARA APLICAR ESTILOS A LOS SELECT ***
  selectedOptionStyle:string = ''
  selectedOptionStyle2:string = '' 

  // *** VARIABLES PARA MENSAJES ***
  showDeleteMSG:boolean = false
  showUpdateOk:boolean = false
  errorMSG:string = ''

  // *** VARIABLES PARA ALMACENAR RESULTADOS ***
  objectResult:any
  //User Variables
  _idUser = "Anonymous" //Variable que almacena el ID de usuario en caso de estar logeado
  resUserLogged:any //Array que almacenara el objeto usuario obtenido mediante el token (datos del usuario loggeado)
  objectAuxEdit = { //Mediante este objeto auxiliar, obtenemos todos los datos del anuncio a editar. En caso de ser una publicacion, se inicializa con datos vacios para no provocar un error por "undefined" en el HTML, ya que lo uso para rellenar los inputs con "value"
    _id:"",
    title:"",
    category:"Select Category",
    price:"",
    email:"",
    phone:"",
    description:"",
    ubication:"Select Ubication"
  }

  // *** VARIABLES PARA EVITAR UNDEFINED ***
  objectAuxPhotos = { //Objeto auxiliar que me va a permitir darle un valor al objeto photos y asi no generar errores por undefined
    arrayPreview:[],
    arrayUpload:[]
  }
  objectAuxPhotosEdit = { //Objeto auxiliar que me va a permitir darle un valor al objeto photosEdit y asi no generar errores por undefined
    arrayPhotosEditDelete:[""],
    arrayPhotosEdit:[""]
  }

  // *** VARIABLES PARA FOTOS ***
  objectPhotos : { //Objeto que va almacenar las fotos en formato preview y en el formato necesario para subirlas
    arrayPreview?:Array<any>
    arrayUpload?:Array<any>
  }
  objectPhotosEdit : { //Objeto que va almacenar las fotos de una edicion (fotos a eliminar de un anuncio ya subido o fotos a mantener)
    arrayPhotosEditDelete?:Array<string>
    arrayPhotosEdit?:Array<string>
  }

  constructor(private postUpdateServices:PostupdateservicesService, private getServices:GetservicesService, private router:Router, public authService:AuthservicesService, private compService: ComponentservicesService, private deleteServices:DeleteservicesService){ //Instancio el servicio
    //Instanciamos las variables mediante el uso de los objetos auxiliares
    this.objectPhotosEdit = this.objectAuxPhotosEdit
    this.objectPhotos = this.objectAuxPhotos
  }

  // *** FUNCIONES *** 
  ngOnInit() { //Funcion que se va a ejecutar nada mas cargar el componente
    //Obtenemos los datos que se pasan de un componente a otro mediante el servicio
    this.compService.itsEditActual.subscribe(dato => this.itsEditRecibido = dato)
    this.compService.announceActual.subscribe(dato => this.announceRecibido = dato)

    if(this.itsEditRecibido){ //En caso de que sea una edicion, rellenamos las variables con los datos del anuncio a editar
      this.objectAuxEdit = this.announceRecibido //Rellenamos el objeto auxiliar que permite mostrar los datos de el anuncio en el HTML
      this.objectPhotosEdit.arrayPhotosEdit = this.announceRecibido.photosPaths //Obtenemos el path de las fotos de el objeto a editar
    }
    //Compruebo si hay un usuario loggeado a la hora de publicar un anuncio
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token') //Variable que almacena el token del usuario loggeado
      this.getServices.getUser(token).subscribe( //Usamos el servicio que obtiene los datos del usuario mediante el token
      res=>{
        this.resUserLogged = res //Almaceno los datos del usuario en la variable
        this._idUser = this.resUserLogged[0]._id //Almacena el ID en la variable _idUser
        this.objectAuxEdit.email = this.resUserLogged[0].email
        this.objectAuxEdit.phone = this.resUserLogged[0].phone
      },
      err =>{
        if(err.status == 401){
          this.authService.logOutService()
          this.router.navigate(['/login'])
        }
      }
    )
    }else{
      console.log("NO ESTA LOGEADO")
    }
  }

  //Funcion para obtener los archivos(fotos) y mostrarlos en preview
  onPhotoSelected(event: any): void{ //Usamos event para saber cuando se da click en el input y abre la pestaña del sistema operativo para insertar archivos
    this.objectPhotos = onPhotoSelectedC(event) //Funcion que permite seleccionar una foto y subirla en una publicacion
  }

  onSelectedCategory(event:any){
    this.selectedOptionStyle = event.target.value
  }

  onSelectedUbication(event:any){
    this.selectedOptionStyle2 = event.target.value
  }

  reloadEdit(){
    this.router.navigate(['/getannounce/:'+ this.announceRecibido._id])
  }

  //Funcion para eliminar foto en pulicacion y en edicion
  deletePhoto(imageData:any){ //Pasamos los datos de la imagen (imageData) para saber cual eliminar
    if(this.itsEditRecibido){ //Compruebo si es una edicion o un publicacion
      this.objectPhotos = deletePhotoC(imageData) //Funcion que permite eliminar una foto en una publicacion
      this.objectPhotosEdit = deletePhotoEditC(imageData, this.announceRecibido.photosPaths) //Funcion que permite eliminar una foto en una edicion
    }else{
      this.objectPhotos = deletePhotoC(imageData)
    }
  }

  //Funcion para cambiar foto en pulicacion y en edicion
  changePhoto(imageData:any, event:any){ //Obtenemos los datos de la imagen a cambiar (imageData) y obtenemos el archivo a cambiar mediante event
    if(this.itsEditRecibido){
      //Permite cambiar fotos que aun no se hayan subido (las fotos del preview)
      if(this.objectPhotos.arrayPreview != undefined && this.objectPhotos.arrayUpload != undefined ){
        for(let i = 0 ; i <= this.objectPhotos.arrayPreview.length; i++ ){
          if(imageData.src == this.objectPhotos.arrayPreview[i]){
            this.objectPhotos.arrayPreview.splice(i, 1)
            this.objectPhotos.arrayUpload.splice(i, 1)
          }
        }
      }
      this.objectPhotos = onPhotoSelectedC(event) //Funcion que permite seleccionar una foto y subirla en una publicacion
      this.objectPhotosEdit = changePhotoEditC(imageData, this.announceRecibido.photosPaths) //Funcion que permite seleccionar una foto y cambiarla en una edicion
    }else{
      this.objectPhotos = changePhotoC(imageData, event) //Funcion que permite seleccionar una foto y cambiarla en una publicacion
    }
  }

  deleteAnnounce(){
    this.deleteServices.deleteAnnounce(this.announceRecibido._id)
    .subscribe(
      res=>{
        this.showDeleteMSG = true
      },
      err => console.log(err)
    )
  }

  //Funcion para subir los datos del anuncio al backend (Incluido las fotos)
  //Funcion que mediante el uso de nuestro servicio nos permitira hacer la peticion POST con los datos aportados en los inputs
  uploadData(title:HTMLInputElement, category:HTMLSelectElement, price:HTMLInputElement, email:HTMLInputElement, phone:HTMLInputElement, description:HTMLTextAreaElement, ubication:HTMLSelectElement): boolean{//La funcion tiene que retornar un Boolean para poder recoger los inputs (No se porque)
    //VARIABLES
    let objtID:any //Objeto auxiliar que almacena el ID del anuncio creado (para pasarselo al componente que muestra el anuncio una vez creado) Es necesario para que no de error con el res
    let type = "service" //Variable que almacena el tipo de anuncio 
    let editNum = Math.random().toString(36).slice(-8) //Variable que almacena el numero de edicion (numero que tendra que insertar el usuario para poder editar un anuncio)
    let _idEdit = this.objectAuxEdit._id //Variable que pasa el id del anuncio a editar al backend

    //USO DEL SERVICIO
    if(this.objectPhotosEdit.arrayPhotosEdit != undefined && this.objectPhotosEdit.arrayPhotosEditDelete != undefined && this.objectPhotos.arrayUpload != undefined){ //Compruebo que los arrays no sean undefined para no generar errores
      this.postUpdateServices.uploadAnnounceServiceJob(title.value, category.value, price.value, email.value, phone.value, description.value, ubication.value, type, editNum, this.itsEditRecibido, _idEdit, this.objectPhotosEdit.arrayPhotosEditDelete, this.objectPhotosEdit.arrayPhotosEdit, this.objectPhotos.arrayUpload, this._idUser)
      .subscribe(
        res => {
          this.objectResult = res
          this.errorMSG = this.objectResult.message
            objtID = res
            if(this.itsEditRecibido){ //En este caso compruebo si es una edicion, en caso de ser una edicion, refresco la pagina y en caso contrario (es una publicacion), redirijo al usuario a la pagina del anuncio creado
              this.showUpdateOk = true
            }else{
              resetVars()
              this.router.navigate(['/getannounce/:'+ objtID.data._id]) //Redirecciono el frontEnd a la pagina que indica que el anuncio se ha subido
            }
        }, 
        err => console.log(err))
    }else{
      console.log("ERROR : IS UNDEFINED !! ")
    }
      
    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)
  }

}
