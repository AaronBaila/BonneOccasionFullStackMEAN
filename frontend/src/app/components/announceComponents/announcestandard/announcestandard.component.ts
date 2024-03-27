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
// Por ejemplo en caso de que venga de una edicion, el Array "arrayPhotosEdit" estara lleno (si el auncio tiene fotos) y en caso contrario (es una publicacion), el array esatara vacio

@Component({
  selector: 'app-announcestandard',
  templateUrl: './announcestandard.component.html',
  styleUrls: ['./announcestandard.component.css']
})
export class AnnouncestandardComponent {
  // ********** VARIABLES ********** (Todas las variables que tiene en el nombre la palabra 'edit' es porque son variables que se utilizaran cuando es un edit)

  // *** VARIABLES UNICAS DEL COMPONENTE STANDARD ***
  arraySubcategorias:Array<string>
  showSex:boolean = false
  subCatDisabled:boolean = true
  isCardVisible:boolean = false

  // *** VARIABLES PROVENIENTES DE OTRO COMPONENTE ***
  itsEditRecibido: boolean
  announceRecibido:any

  // *** VARIABLES PARA APLICAR ESTILOS A LOS SELECT ***
  sexControlOnSub:boolean = false
  selectedOptionStyle: string = '' 
  selectedOptionStyle2: string =''
  selectedOptionStyle3: string =''
  selectedOptionStyle4: string =''
  selectedOptionStyle5: string ='' 

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
    subcategory:"Select Subcategory",
    status:"Select the status",
    sex:"Select sex",
    width:"",
    height:"",
    phone:"",
    email:"",
    description:"",
    price:"",
    ubication:"Select the ubication"
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

  ngOnInit() { //Funcion que se va a ejecutar nada mas cargar el componente
    //Obtenemos los datos que se pasan de un componente a otro mediante el servicio
    this.compService.itsEditActual.subscribe(dato => this.itsEditRecibido = dato)
    this.compService.announceActual.subscribe(dato => this.announceRecibido = dato)

    if(this.itsEditRecibido){ //En caso de que sea una edicion, rellenamos las variables con los datos del anuncio a editar
      this.objectAuxEdit = this.announceRecibido //Rellenamos el objeto auxiliar que permite mostrar los datos de el anuncio en el HTML
      this.objectPhotosEdit.arrayPhotosEdit = this.announceRecibido.photosPaths //Obtenemos el path de las fotos de el objeto a editar

      //INICIALIZO TODOS LOS ARRAYS POSIBLES EN CASO DE SER UNA EDICION
      //Mediante esta sucesion de IF permito cambiar las posibilidades de eleccion segun lo que vayas a vender, tambien permite mostrar otros campos como el sexo segun lo que vayas a vender
      //Dependiendo de la categoria que se selecciona cambian las subcategorias
      if(this.objectAuxEdit.category == "Accesorios Vehiculos/Motor"){
        this.arraySubcategorias = [
          "Piezas Vehiculo",
          "Piezas Moto",
          "Accesorios Vehiculo",
          "Accesorios Moto",
          "Herramientas",
          "GPS y electrónica",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Bicicletas"){
        this.arraySubcategorias = [
          "Accesorios",
          "Bicicletas",
          "Piezas y recambios de bici",
          "Protección y Vestimenta",
          "Otros"
        ]
        if(this.objectAuxEdit.subcategory == "Protección y Vestimenta"){
          this.showSex = true //En caso de que la subcategoria sea proteccion y vestimenta te deja elegir sexo (Mujer - Hombre / Niño - Niña / Unisex)
        }
      }else if(this.objectAuxEdit.category == "Moviles y Telefonia"){
        this.arraySubcategorias = [
          "Telefonos (Smartphones)",
          "Smartwatches",
          "Tablets",
          "Telefonos antiguos",
          "Accesorios",
          "Cables",
          "Piezas y recambios",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Moda y Accesorios"){
        this.arraySubcategorias = [
          "Ropa",
          "Calzado",
          "Accesorios",
          "Joyeria",
          "Belleza",
          "Otros"
        ]
        this.showSex = true
      }else if(this.objectAuxEdit.category == "TV, Audio y Foto"){
        this.arraySubcategorias = [
          "Auriculares y Cascos",
          "Televisores y accesorios",
          "Proyectores y accesorios",
          "Camaras y Fotografia",
          "Camaras de Vigilancia",
          "Pilas y Cargadores",
          "Reproductores",
          "Drones",
          "Video y accesorios",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Informatica y Electronica"){
        this.arraySubcategorias = [
          "Ordenadores y accesorios",
          "Monitores",
          "Impresoras y accesorios",
          "Cables",
          "Cargadores y baterías",
          "Software",
          "Realidad virtual y aumentada",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Consolas y Videojuegos"){
        this.arraySubcategorias = [
          "Consolas",
          "Videojuegos",
          "Accesorios de consolas",
          "Recambios de consolas/Piezas",
          "Manuales y guias",
          "Merchandising de videojuegos",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Niños y Bebes"){
        this.arraySubcategorias = [
          "Accesorios de Baño",
          "Alimentación del bebe",
          "Articulos de maternidad",
          "Articulos escolares",
          "Cunas y Camas",
          "Disfraces infantiles",
          "Juguetes, juegos y peluches",
          "Mobiliario infantil",
          "Ropa Infantil",
          "Seguridad y cuidado",
          "Transporte del bebe",
          "Tronas y andadores",
          "Otros"
        ]
        if (this.objectAuxEdit.subcategory == "Disfraces infantiles" || this.objectAuxEdit.subcategory == "Juguetes, juegos y peluches" || this.objectAuxEdit.subcategory == "Ropa Infantil"){
          this.showSex = true
        }
      }else if(this.objectAuxEdit.category == "Deporte y Ocio"){
        this.arraySubcategorias = [
          "Baloncesto",
          "Balonmano",
          "Estaticas y elipticas",
          "Fitness, running y yoga",
          "Futbol",
          "Golf",
          "Manualidades",
          "Montaña y esqui",
          "Natacion y accesorios piscina",
          "Patinaje",
          "Rugby",
          "Tenis y padel",
          "Voley",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Hogar y Jardin"){
        this.arraySubcategorias = [
          "Almacenaje",
          "Articulos para mascotas",
          "Baño",
          "Cocina, comedor y bar",
          "Colchones y ropa de cama",
          "Decoracion",
          "Iluminacion Interior",
          "Jardin y exteriores",
          "Mobiliario para la casa",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Electrodomesticos"){
        this.arraySubcategorias = [
          "Climatizacion",
          "Electrodomesticos de cocina",
          "Lavanderia y plancha",
          "Pequeños electrodomesticos",
          "Piezas y recambios",
          "Viocerámica",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Cine, Libros y Musica"){
        this.arraySubcategorias = [
          "CDs y Vinilos",
          "Comics y novelas graficas",
          "Equipo profesional de sonido",
          "Instrumentos Musicales",
          "Libros",
          "Partituras y libretos",
          "Peliculas y series",
          "Posters y merchandising",
          "Revistas",
          "Tocadiscos",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Construccion y Reformas"){
        this.arraySubcategorias = [
          "Balcones",
          "Baños",
          "Cocinas",
          "Electricidad e Iluminacion",
          "Escaleras y andamios",
          "Ferretería",
          "Herramientas y maquinaria",
          "Madera y otros materiales",
          "Pavimentos y revestimentos",
          "Pinturas y barnices",
          "Puertas y ventanas",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Agricultura"){
        this.arraySubcategorias = [
          "Herramientas agricolas",
          "Insumos agricolas",
          "Maquinaria",
          "Repuestos",
          "Tractores",
          "Vehiculos",
          "Otros"
        ]
      }else if(this.objectAuxEdit.category == "Industria"){
        this.arraySubcategorias = [
          "Equipamiento industrial",
          "Herramientas",
          "Insumos industriales",
          "Repuestos de herramientas",
          "Repuestos de maquinaria",
          "Otros"
        ]
      }
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

  //Mediante esta sucesion de IF permito cambiar las posibilidades de eleccion segun lo que vayas a vender, tambien permite mostrar otros campos como el sexo segun lo que vayas a vender
  //Dependiendo de la categoria que se selecciona cambian las subcategorias
  onSelected(event: any){
    if(event.target.value !== "Moda y Accesorios"){
      this.showSex = false
      this.sexControlOnSub = true
    }
    //Mediante esta variable consigo cambiar el estilo de el texto de los elementos select una vez seleccionada la opcion
    this.selectedOptionStyle = event.target.value

    this.subCatDisabled = false
    if(event.target.value == "Accesorios Vehiculos/Motor"){
      this.arraySubcategorias = [
        "Piezas Vehiculo",
        "Piezas Moto",
        "Accesorios Vehiculo",
        "Accesorios Moto",
        "Herramientas",
        "GPS y electrónica",
        "Otros"
      ]
    }else if(event.target.value == "Bicicletas"){
      this.arraySubcategorias = [
        "Accesorios",
        "Bicicletas",
        "Piezas y recambios de bici",
        "Protección y Vestimenta",
        "Otros"
      ]
    }else if(event.target.value == "Moviles y Telefonia"){
      this.arraySubcategorias = [
        "Telefonos (Smartphones)",
        "Smartwatches",
        "Tablets",
        "Telefonos antiguos",
        "Accesorios",
        "Cables",
        "Piezas y recambios",
        "Otros"
      ]
    }else if(event.target.value == "Moda y Accesorios"){
      this.arraySubcategorias = [
        "Ropa",
        "Calzado",
        "Accesorios",
        "Joyeria",
        "Belleza",
        "Otros"
      ]
      this.showSex = true
    }else if(event.target.value == "TV, Audio y Foto"){
      this.arraySubcategorias = [
        "Auriculares y Cascos",
        "Televisores y accesorios",
        "Proyectores y accesorios",
        "Camaras y Fotografia",
        "Camaras de Vigilancia",
        "Pilas y Cargadores",
        "Reproductores",
        "Drones",
        "Video y accesorios",
        "Otros"
      ]
    }else if(event.target.value == "Informatica y Electronica"){
      this.arraySubcategorias = [
        "Ordenadores y accesorios",
        "Monitores",
        "Impresoras y accesorios",
        "Cables",
        "Cargadores y baterías",
        "Software",
        "Realidad virtual y aumentada",
        "Otros"
      ]
    }else if(event.target.value == "Consolas y Videojuegos"){
      this.arraySubcategorias = [
        "Consolas",
        "Videojuegos",
        "Accesorios de consolas",
        "Recambios de consolas/Piezas",
        "Manuales y guias",
        "Merchandising de videojuegos",
        "Otros"
      ]
    }else if(event.target.value == "Niños y Bebes"){
      this.arraySubcategorias = [
        "Accesorios de Baño",
        "Alimentación del bebe",
        "Articulos de maternidad",
        "Articulos escolares",
        "Cunas y Camas",
        "Disfraces infantiles",
        "Juguetes, juegos y peluches",
        "Mobiliario infantil",
        "Ropa Infantil",
        "Seguridad y cuidado",
        "Transporte del bebe",
        "Tronas y andadores",
        "Otros"
      ]
    }else if(event.target.value == "Deporte y Ocio"){
      this.arraySubcategorias = [
        "Baloncesto",
        "Balonmano",
        "Estaticas y elipticas",
        "Fitness, running y yoga",
        "Futbol",
        "Golf",
        "Manualidades",
        "Montaña y esqui",
        "Natacion y accesorios piscina",
        "Patinaje",
        "Rugby",
        "Tenis y padel",
        "Voley",
        "Otros"
      ]
    }else if(event.target.value == "Hogar y Jardin"){
      this.arraySubcategorias = [
        "Almacenaje",
        "Articulos para mascotas",
        "Baño",
        "Cocina, comedor y bar",
        "Colchones y ropa de cama",
        "Decoracion",
        "Iluminacion Interior",
        "Jardin y exteriores",
        "Mobiliario para la casa",
        "Otros"
      ]
    }else if(event.target.value == "Electrodomesticos"){
      this.arraySubcategorias = [
        "Climatizacion",
        "Electrodomesticos de cocina",
        "Lavanderia y plancha",
        "Pequeños electrodomesticos",
        "Piezas y recambios",
        "Viocerámica",
        "Otros"
      ]
    }else if(event.target.value == "Cine, Libros y Musica"){
      this.arraySubcategorias = [
        "CDs y Vinilos",
        "Comics y novelas graficas",
        "Equipo profesional de sonido",
        "Instrumentos Musicales",
        "Libros",
        "Partituras y libretos",
        "Peliculas y series",
        "Posters y merchandising",
        "Revistas",
        "Tocadiscos",
        "Otros"
      ]
    }else if(event.target.value == "Construccion y Reformas"){
      this.arraySubcategorias = [
        "Balcones",
        "Baños",
        "Cocinas",
        "Electricidad e Iluminacion",
        "Escaleras y andamios",
        "Ferretería",
        "Herramientas y maquinaria",
        "Madera y otros materiales",
        "Pavimentos y revestimentos",
        "Pinturas y barnices",
        "Puertas y ventanas",
        "Otros"
      ]
    }else if(event.target.value == "Agricultura"){
      this.arraySubcategorias = [
        "Herramientas agricolas",
        "Insumos agricolas",
        "Maquinaria",
        "Repuestos",
        "Tractores",
        "Vehiculos",
        "Otros"
      ]
    }else if(event.target.value == "Industria"){
      this.arraySubcategorias = [
        "Equipamiento industrial",
        "Herramientas",
        "Insumos industriales",
        "Repuestos de herramientas",
        "Repuestos de maquinaria",
        "Otros"
      ]
    }
	}

  onSelectedSubCate(event:any){
    if(this.sexControlOnSub){
      this.showSex = false
    }

    //Mediante esta variable consigo cambiar el estilo de el texto de los elementos select una vez seleccionada la opcion
    this.selectedOptionStyle2 = event.target.value

    if(event.target.value == "Protección y Vestimenta"){
      this.showSex = true //En caso de que la subcategoria sea proteccion y vestimenta te deja elegir sexo (Mujer - Hombre / Niño - Niña / Unisex)
    }
    if (event.target.value == "Disfraces infantiles" || this.objectAuxEdit.subcategory == "Juguetes, juegos y peluches" || this.objectAuxEdit.subcategory == "Ropa Infantil"){
      this.showSex = true
    }
  }

  onSelectedSex(event:any){
    //Mediante esta variable consigo cambiar el estilo de el texto de los elementos select una vez seleccionada la opcion
    this.selectedOptionStyle3 = event.target.value
  }

  onSelectedStatus(event:any){
    //Mediante esta variable consigo cambiar el estilo de el texto de los elementos select una vez seleccionada la opcion
    this.selectedOptionStyle4 = event.target.value
  }
  
  onSelectedUbication(event:any){
    //Mediante esta variable consigo cambiar el estilo de el texto de los elementos select una vez seleccionada la opcion
    this.selectedOptionStyle5 = event.target.value
  }


  //Funcion para obtener los archivos(fotos) y mostrarlos en preview
  onPhotoSelected(event: any): void{ //Usamos event para saber cuando se da click en el input y abre la pestaña del sistema operativo para insertar archivos
    this.isCardVisible = true
    this.objectPhotos = onPhotoSelectedC(event) //Funcion que permite seleccionar una foto y subirla en una publicacion
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
  uploadData(title:HTMLInputElement, email:HTMLInputElement, phone:HTMLInputElement, category:HTMLSelectElement, subcategory:HTMLSelectElement, sex:HTMLSelectElement, status:HTMLSelectElement, price:HTMLInputElement, description:HTMLTextAreaElement, ubication:HTMLSelectElement): boolean{//La funcion tiene que retornar un Boolean para poder recoger los inputs (No se porque)
    //VARIABLES
    let objtID:any //Objeto auxiliar que almacena el ID del anuncio creado (para pasarselo al componente que muestra el anuncio una vez creado) Es necesario para que no de error con el res
    let type = "standard"
    let editNum = Math.random().toString(36).slice(-8) //Variable que almacena el numero de edicion (numero que tendra que insertar el usuario para poder editar un anuncio)
    let _idEdit = this.objectAuxEdit._id //Variable que pasa el id del anuncio a editar al backend

    //USO DEL SERVICIO
    if(this.objectPhotosEdit.arrayPhotosEdit != undefined && this.objectPhotosEdit.arrayPhotosEditDelete != undefined && this.objectPhotos.arrayUpload != undefined){ //Compruebo que los arrays no sean undefined para no generar errores
      this.postUpdateServices.uploadAnnounceStandard(title.value, email.value, phone.value, category.value, subcategory.value, sex.value, status.value, price.value, description.value, ubication.value, type, editNum, this.itsEditRecibido, _idEdit, this.objectPhotosEdit.arrayPhotosEditDelete, this.objectPhotosEdit.arrayPhotosEdit, this.objectPhotos.arrayUpload, this._idUser)
      .subscribe(
        res => {
          this.objectResult = res
          this.errorMSG = this.objectResult.message
          objtID = res
          if(this.itsEditRecibido){ //En este caso compruebo si es una edicion, en caso de ser una edicion, refresco la pagina y en caso contrario (es una publicacion), redirijo al usuario a la pagina del anuncio creado
            this.showUpdateOk = true
          }else{
            resetVars()
            this.router.navigate(['/getannounce/:'+ objtID.data._id]) //Redirecciono el frontEnd a la pagina de visualizacion del anuncio ya creado
          }
        }, 
        err => console.log(err))
    }else{
      console.log("ERROR : IS UNDEFINED !! ")
    }
    
    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)
  }

}
