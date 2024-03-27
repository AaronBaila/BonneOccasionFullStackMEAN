// ************************** VARIABLES ******************************

let files:any
let photoSelected:any

let arrayPhotosPreview :Array<any>
let arrayPhotosUpload : Array<File>
let objectPhotos:object

//Instanciamos las Variables
arrayPhotosPreview = []
arrayPhotosUpload = []
objectPhotos = {}

// *** VARIABLES pertenecientes a la edicion ***
let objectPhotosEdit:object
let arrayPhotosEditDelete = [""] //Array que va almacenar las fotos a eliminar de la edicion (fotos que el anuncio almacenaba anteriormente y que ahora van a ser eliminadas o cambiadas por otras)
let arrayPhotosEdit = [""]

//Instancio variable
objectPhotosEdit = {}

// ************************** FUNCTIONS ******************************

// *** OBTENER LAS FOTOS ***  
export function onPhotoSelectedC(event:any): object{
  if(event.target.files && event.target.files[0]){ //Compruebo si hay archivos subidos (si event esta lleno)
    files = event.target.files //Inserto todos los archivos subidos a la variable files / files = FileList
        
    for(let i = 0; i<=files.length-1;i++){ //Utilizo bucle for para obtener los archivos de manera individual de la lista de archivos
      //Utilizo FileReader() para poder leer los datos de los archivos de la variable files (leer las imagenes subidas)
      const reader = new FileReader()
      reader.readAsDataURL(files[i]) //Leo uno los archivos de uno en uno
  
      reader.onload = function() { //Una vez se ha cargado el archivo haz lo de dentro de la funcion
        photoSelected = reader.result //Obtenemos la lectura del archivo y lo almacenamos en la variable photoSelected (foto final)
        arrayPhotosPreview.push(photoSelected) //Almaceno el archivo ya leido en el array para la preview
        arrayPhotosUpload.push(files[i]) //Almaceno la foto en si (el archivo sin leer) en el array que finalmente se va a utilizar para subir las fotos al backend
      }
    }

    objectPhotos = {
      arrayPreview : arrayPhotosPreview,
      arrayUpload : arrayPhotosUpload
    }
  }

  return objectPhotos
}

// *** ELIMINAR FOTO ***
export function deletePhotoC(imageData:any){ //Pasamos los datos de la imagen (imageData) para saber cual eliminar
  // *** PUBLICACION ***
  for(let i = 0; i<=arrayPhotosPreview.length-1;i++){ //Recorro el arrayPhotos para encontrar la foto a eliminar
    if(imageData.src === arrayPhotosPreview[i]){ //Comparo la foto a eliminar con las del array para saber cual eliminar
      arrayPhotosPreview.splice(i, 1)
      arrayPhotosUpload.splice(i, 1) //Elimino la foto del array
    }
  } 

  objectPhotos = {
    arrayPreview : arrayPhotosPreview,
    arrayUpload : arrayPhotosUpload
  }
    
  return objectPhotos
}

// *** ELIMINAR FOTO EDIT ***
export function deletePhotoEditC(imageData:any, arrayPhotosEditA:Array<string>){ //Pasamos los datos de la imagen (imageData) para saber cual eliminar
arrayPhotosEdit = arrayPhotosEditA

  for(let x = 0; x<=arrayPhotosEdit.length;x++){ //Recorro el arrayPhotos para encontrar la foto a eliminar
    //Utilizo replacen + expresion regex y slice para formatear el string y que la direccion se adapte a el backend y de esta manera pueda encontrar las fotos desde el backend
    if(imageData.src.replace(/\//g, '\\').slice(22) == arrayPhotosEdit[x]){ //Comparo la foto a eliminar con las del array para saber cual eliminar
    arrayPhotosEditDelete.push(imageData.src.replace(/\//g, '\\').slice(22)) //Inserto en este array los path de las fotos a eliminar despues de la edicion
    arrayPhotosEdit.splice(x, 1) //Elimino del array fotosEdicion la foto a eliminar
    }
  }

  objectPhotosEdit = {
    arrayPhotosEditDelete : arrayPhotosEditDelete,
    arrayPhotosEdit: arrayPhotosEdit
  }

  return objectPhotosEdit
}

// *** CAMBIAR FOTO EN PREVIEW *** 
export function changePhotoC(imageData:any, event:any){ //Obtenemos los datos de la imagen a cambiar (imageData) y obtenemos el archivo a cambiar mediante event
  if(event.target.files && event.target.files[0]){ //Compruebo si hay archivos subidos (si event esta lleno)
    files = event.target.files //Inserto todos los archivos subidos a la variable files / files = FileList

    // *** PUBLICACION ***
    for(let i = 0; i<=arrayPhotosPreview.length-1;i++){ //Recorro el arrayPhotos para encontrar la foto a cambiar
      if(imageData.src === arrayPhotosPreview[i]){ //Comparo la foto a eliminar con las del array para saber cual cambiar
        arrayPhotosPreview.splice(i, 1)
        arrayPhotosUpload.splice(i, 1) //Elimino la foto del array

        //Utilizo FileReader() para poder leer los datos de los archivos de la variable files (leer las imagenes subidas)
        const reader = new FileReader()
        reader.readAsDataURL(files[0])

        reader.onload = function() { //Tras leer el archivo, lo almacena en el array mediante push
          let photoSelected = reader.result
          arrayPhotosPreview.push(photoSelected)
          arrayPhotosUpload.push(files[0])
        }
      }
    }
  }

  objectPhotos = {
    arrayPreview : arrayPhotosPreview,
    arrayUpload : arrayPhotosUpload
  }

  return objectPhotos
}

export function changePhotoEditC(imageData:any, arrayPhotosEditA:Array<string>){
  arrayPhotosEdit = arrayPhotosEditA

  for(let i = 0; i<=arrayPhotosEdit.length;i++){ //Recorro el arrayPhotos para encontrar la foto a cambiar
    //Utilizo replacen + expresion regex y slice para formatear el string y que la direccion se adapte a el backend y de esta manera pueda encontrar las fotos desde el backend
    if(imageData.src.replace(/\//g, '\\').slice(22) === arrayPhotosEdit[i]){ //Comparo la foto a eliminar con las del array para saber cual cambiar
      arrayPhotosEdit.splice(i, 1)
      arrayPhotosEditDelete.push(imageData.src.replace(/\//g, '\\').slice(22))
    }
  }

  objectPhotosEdit = {
    arrayPhotosEditDelete : arrayPhotosEditDelete,
    arrayPhotosEdit: arrayPhotosEdit
  }

  return objectPhotosEdit
}

export function resetVars(){
  arrayPhotosPreview = []
  arrayPhotosUpload = []
  objectPhotos = {}
  arrayPhotosEditDelete = [""]
  arrayPhotosEdit = [""]
}