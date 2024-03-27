import { User, AnnouncementStandard, AnnouncementVehicle, AnnouncementMoto, AnnouncementProperty, AnnouncementServiceJob} from "../bbdd/dbModels.js"
import * as fs from 'fs'

//************ FUNCIONES POST/UPDATE ****************

//Funcion para postear/editar un anuncioStandard
export function postAnnounceStandard(req, res){
    // * VARIABLES *
    let {title, email, phone, category, subcategory, sex, status, price, description, ubication, type, editNum, itsEdit, _idEdit, _idUser} = req.body //Obtenemos los datos del frontEnd mediante req.body
    //Creamos las variables que almacenaran los datos obtenidos del frontEnd
    _idUser = _idUser.trim()
    _idEdit = _idEdit.trim()
    itsEdit = itsEdit.trim()
    editNum = editNum.trim()
    type = type.trim()
    title = title.trim()
    email = email.trim()
    phone = phone.trim()
    category = category.trim()
    subcategory = subcategory.trim()
    sex = sex.trim()
    status = status.trim()
    price = price.trim()
    description = description.trim()
    ubication = ubication.trim()
    //Obtengo las variables con el path de las imagenes en caso de ser una edicion
    //Obtenemos los array del frontend
    let photosEdit = req.body.photosEdit
    let photosEditDelete = req.body.photosEditDelete
    //Fecha creacion de anuncio
    const currentDate = new Date()

    //Obtengo el path de las imagenes
    let arrayPhotos = [] //Array en el que voy a almacenar las fotos
    for(let i = 0; i<=req.files.length-1; i++){
        //Uso slice para acortar el path de manera que pueda acceder a las imagenes desde el frontEnd
        arrayPhotos.push((req.files[i].path).slice(16)) //Almaceno en el array los archivos(fotos) pasadas por el frontEnd
    }

    //Comprobamos que los campos se han rellenado correctamente
    if (title == "" || price == "" || phone == ""){ //Compruebo que los campos no estan vacios
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err);
            }              
        }
        
        res.json({
            status:"FAILED",
            message:"You need to fill the required fields"
        })
    }else if(!/^(0)?[5-7][0-9]{8}$/.test(phone)){ //Compruebo que realmente se ingresa un formato de tipo telefono
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }
        
        res.json({
            status:"FAILED",
            message:"Phone Incorrect"
        })
    }else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(price)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Price field filled incorrectly "
        })
    }else if(ubication == "Select the ubication"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field ubication not filled"
        })
    }else{ //Tras comprobar que los campos se han rellenado correctamente creamos o editamos el anuncio
        if(itsEdit == "true"){//Compruebo si es una edicion para proceder con los pasos de edicion

            if(photosEdit !== undefined){ //Verifico si las imagenes del anuncio a editar siguen vigentes
                for(let i = 0; i<=photosEdit.length-1; i++){//Formateo los path del arrayEdicion para poder acceder a ellos desde el backend y los añado al arrayFinal de fotos
                    arrayPhotos.push(photosEdit[i]) //Los path de las imagenes que se mantienen despues de la edicion las almaceno en el array final de imagenes
                }
            }
        
            if(photosEditDelete !== undefined){ //Verifico si hay imagenes a eliminar del anuncio a editar
                //Elimino las fotos que se quieren elimnar de la edicion de manera local
                for(let i = 0; i<=photosEditDelete.length-1; i++){
                    try {
                        //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                        fs.unlinkSync("..\\frontend\\src\\"+ photosEditDelete[i]) //Mediante fs.unlinkSync elimino los archivos de las imagenes
                    } catch (err) {
                        console.error(err)
                    }              
                }
            }   
            
            let filter = {_id:_idEdit} //Creo el filtro con el _id del anuncio a editar
            let updateAnnounce = { //Creo el objeto anuncio para actualizar los campos que sean necesarios
                title:title,
                email:email,
                phone:phone,
                category:category,
                subcategory:subcategory,
                sex:sex,
                status:status,
                price:price,
                description:description,
                ubication:ubication,
                photosPaths:arrayPhotos
            }

            AnnouncementStandard.findOneAndUpdate(filter, updateAnnounce).then(result =>{ //Mediante mongoose y el objeto creado (updateAnnounce) actualizo el anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post edited succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while editing the announce"
                })
            })
        }else{ //En caso de que no sea una edicion, quiere decir que es una publicacion y tenemos que crear un documento nuevo dentro de la coleccion AnnouncementStandard
            let announceStandard = new AnnouncementStandard({ //Creo el objeto anuncio mediante el Schema de mongoose
                _idUser:_idUser,
                date:currentDate,
                title:title,
                email:email,
                phone:phone,
                category:category,
                subcategory:subcategory,
                sex:sex,
                status:status,
                price:price,
                description:description,
                ubication:ubication,
                type:type,
                editNum:editNum,
                photosPaths:arrayPhotos
            })
    
            announceStandard.save().then(result =>{ //Mediante la funcion de mongoose, guardo el objeto anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post saved succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while saving announce"
                })
            })
        }
    }
}

// *************************************************************************************************************

//Funcion para postear/editar un anuncio de una propiedad
export function postAnnounceProperty(req, res){
    // * VARIABLES *
    let {_idUser, title, sellerType, rentOrSell, typeOfSpace, price, area, status, email, phone, description, ubication, type, editNum, itsEdit, _idEdit} = req.body
    _idUser = _idUser.trim()
    _idEdit = _idEdit.trim()
    itsEdit = itsEdit.trim()
    editNum = editNum.trim()
    type = type.trim()
    sellerType = sellerType.trim()
    rentOrSell = rentOrSell.trim()
    typeOfSpace = typeOfSpace.trim()
    price = price.trim()
    area = area.trim()
    status = status.trim()
    email = email.trim()
    phone = phone.trim()
    title = title.trim()
    description = description.trim()
    ubication = ubication.trim()
    //Obtengo las variables con el path de las imagenes en caso de ser una edicion
    let photosEdit = req.body.photosEdit
    let photosEditDelete = req.body.photosEditDelete
    //Fecha
    const currentDate = new Date()

    //Obtengo el path de las imagenes nuevas
    let arrayPhotos = [] //Array en el que voy a almacenar las fotos
    for(let i = 0; i<=req.files.length-1; i++){
        //Uso slice para acortar el path de manera que pueda acceder a las imagenes desde el frontEnd
        arrayPhotos.push((req.files[i].path).slice(16)) //Almaceno en el array las archivos(fotos) pasadas por el frontEnd
    }

    //Compruebo que los campos se han rellenado correctamente
    if(price == "" || area == "" || title == "" || phone == ""){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"You need to fill the required fields"
        })
    }else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(price)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field price incorrectly filled"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
         //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
         for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field email incorrectly filled"
        })
    }else if(!/^(0)?[5-7][0-9]{8}$/.test(phone)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field phone incorrectly filled"
        })
    }else if(!/^[0-9]+$/.test(area)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field area incorrectly filled"
        })
    }else if(rentOrSell == "Rent or Sell ?"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Select type offer"
        })
    }else if(typeOfSpace == "Type of space ?"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Select type of space"
        })
    }else if(status == "Select a status"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Select a state"
        })
    }else if(ubication == "Select the ubication"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Select an ubication"
        })
    }else{//Tras comprobar que los campos se han rellenado correctamente creamos o editamos el anuncio
        if(itsEdit == "true"){//Compruebo si es una edicion para proceder con los pasos de edicion

            if(photosEdit !== undefined){ //Verifico si las imagenes del anuncio a editar siguen vigentes
                for(let i = 0; i<=photosEdit.length-1; i++){//Formateo los path del arrayEdicion para poder acceder a ellos desde el backend y los añado al arrayFinal de fotos
                    arrayPhotos.push(photosEdit[i]) //Los path de las imagenes que se mantienen despues de la edicion las almaceno en el array final de imagenes
                }
            }
        
            if(photosEditDelete !== undefined){ //Verifico si hay imagenes a eliminar del anuncio a editar
                //Elimino las fotos que se quieren elimnar de la edicion de manera local
                for(let i = 0; i<=photosEditDelete.length-1; i++){
                    try {
                        //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                        fs.unlinkSync("..\\frontend\\src\\"+ photosEditDelete[i]) //Mediante fs.unlinkSync elimino los archivos de las imagenes
                    } catch (err) {
                        console.error(err)
                    }              
                }
            }   
            
            let filter = {_id:_idEdit} //Creo el filtro con el _id del anuncio a editar
            let updateAnnounce = { //Creo el objeto anuncio para actualizar los campos que sean necesarios
                title:title,
                sellerType:sellerType,
                rentOrSell:rentOrSell,
                typeOfSpace:typeOfSpace,
                area:area,
                status:status,
                price:price,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                photosPaths:arrayPhotos
            }

            AnnouncementProperty.findOneAndUpdate(filter, updateAnnounce).then(result =>{ //Actualizo el anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post edited succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while editing announce"
                })
            })
        }else{
            let announceProperty = new AnnouncementProperty({ //Creo el objeto anuncio mediante el Schema de mongoose
                _idUser:_idUser,
                date:currentDate,
                title:title,
                sellerType:sellerType,
                rentOrSell:rentOrSell,
                typeOfSpace:typeOfSpace,
                price:price,
                area:area,
                status:status,
                phone:phone,
                email:email,
                description:description,
                editNum:editNum,
                type:type,
                ubication:ubication,
                photosPaths:arrayPhotos
            })
    
            announceProperty.save().then(result =>{ //Mediante la funcion de mongoose, guardo el objeto anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post saved succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while saving announce"
                })
            })
        }
    }
}

// *************************************************************************************************************

//Funcion para postear/editar un anuncio de servicio/job
export function postAnnounceServicesJob(req, res){
    // * VARIABLES *
    //Obtengo los datos del req.body
    let {_idUser, title, category, price, email, phone, description, ubication, type, editNum, itsEdit, _idEdit} = req.body
    _idUser = _idUser.trim()
    _idEdit = _idEdit.trim()
    title = title.trim()
    category = category.trim()
    price = price.trim()
    email = email.trim()
    phone = phone.trim()
    description = description.trim()
    ubication = ubication.trim()
    type = type.trim()
    editNum = editNum.trim()
    itsEdit = itsEdit.trim()
    //Obtengo las variables con el path de las imagenes en caso de ser una edicion
    let photosEdit = req.body.photosEdit
    let photosEditDelete = req.body.photosEditDelete
    //Fecha
    const currentDate = new Date()

    //Obtengo el path de las imagenes nuevas
    let arrayPhotos = [] //Array en el que voy a almacenar las fotos
    for(let i = 0; i<=req.files.length-1; i++){
        //Uso slice para acortar el path de manera que pueda acceder a las imagenes desde el frontEnd
        arrayPhotos.push((req.files[i].path).slice(16)) //Almaceno en el array las archivos(fotos) pasadas por el frontEnd
    }

    //Compruebo que los campos se han rellenado correctamente
    if(title == "" || price == "" || phone == ""){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }
        
        res.json({
            status:"FAILED",
            message:"You need to fill the required fields"
        })
    }else if(!/^(0)?[5-7][0-9]{8}$/.test(phone)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field phone incorrectly filled"
        })
    }else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(price)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field price incorrectly filled"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field email incorrectly filled"
        })
    }else if(category == "Job Offer or Job Seeking ?" || category == "Select Category"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field category not filled"
        })
    }else if(ubication == "Select the ubication"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field ubication not filled"
        })
    }else{ //Tras comprobar que los campos se han rellenado correctamente creamos o editamos el anuncio
        if(itsEdit == "true"){//Compruebo si es una edicion para proceder con los pasos de edicion

            if(photosEdit !== undefined){ //Verifico si las imagenes del anuncio a editar siguen vigentes
                for(let i = 0; i<=photosEdit.length-1; i++){//Formateo los path del arrayEdicion para poder acceder a ellos desde el backend y los añado al arrayFinal de fotos
                    arrayPhotos.push(photosEdit[i]) //Los path de las imagenes que se mantienen despues de la edicion las almaceno en el array final de imagenes
                }
            }
        
            if(photosEditDelete !== undefined){ //Verifico si hay imagenes a eliminar del anuncio a editar
                //Elimino las fotos que se quieren elimnar de la edicion de manera local
                for(let i = 0; i<=photosEditDelete.length-1; i++){
                    try {
                        //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                        fs.unlinkSync("..\\frontend\\src\\"+ photosEditDelete[i]) //Mediante fs.unlinkSync elimino los archivos de las imagenes
                    } catch (err) {
                        console.error(err)
                    }              
                }
            }   
            
            let filter = {_id:_idEdit} //Creo el filtro con el _id del anuncio a editar
            let updateAnnounce = { //Creo el objeto anuncio para actualizar los campos que sean necesarios
                title:title,
                category:category,
                price:price,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                photosPaths:arrayPhotos
            }

            AnnouncementServiceJob.findOneAndUpdate(filter, updateAnnounce).then(result =>{ //Actualizo el anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post edited succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while editing the post"
                })
            })
        }else{//En el caso de que sea una publicacion, realizamos los pasos necesario para publicar el anuncio
            let announceServiceJob = new AnnouncementServiceJob({ //Creo el objeto anuncio mediante el Schema de mongoose
                _idUser:_idUser,
                date:currentDate,
                title:title,
                category:category,
                price:price,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                type:type,
                editNum:editNum,
                photosPaths:arrayPhotos
            })
    
            announceServiceJob.save().then(result =>{ //Mediante la funcion de mongoose, guardo el objeto anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post saved succesfully",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while saving announce"
                })
            })
        }  
    }
}

// *************************************************************************************************************

//Funcion para postear/editar un anuncio de vehiculo
export function postAnnounceVehicle(req, res){
    // * VARIABLES *
    let {_idUser, brand, model, price, year, title, sellerType, version, numberSeats, numberDoors, horsepower, carType, kilometres, engine, gearShift, email, phone, description, ubication, type, editNum, itsEdit, _idEdit} = req.body //Obtenemos los datos del frontEnd mediante req.body
    //Creamos las variables que almacenaran los datos obtenidos del frontEnd
    _idUser = _idUser.trim()
    brand = brand.trim()
    model = model.trim()
    price = price.trim()
    let priceInt = parseInt(price)
    year = year.trim()
    let yearInt = parseInt(year)
    title = title.trim()
    sellerType = sellerType.trim()
    version = version.trim()
    numberSeats = numberSeats.trim()
    numberDoors = numberDoors.trim()
    horsepower = horsepower.trim()
    let horsePowerInt = parseInt(horsepower)
    carType = carType.trim()
    kilometres = kilometres.trim()
    let kilometresInt = parseInt(kilometres)
    engine = engine.trim()
    gearShift = gearShift.trim()
    email = email.trim()
    phone = phone.trim()
    description = description.trim()
    ubication = ubication.trim()
    _idEdit = _idEdit.trim()
    type = type.trim()
    editNum = editNum.trim()
    itsEdit = itsEdit.trim()
    //Obtengo las variables con el path de las imagenes en caso de ser una edicion
    let photosEdit = req.body.photosEdit
    let photosEditDelete = req.body.photosEditDelete
    //Fecha
    const currentDate = new Date()

    //Obtengo el path de las imagenes
    let arrayPhotos = [] //Array en el que voy a almacenar las fotos
    for(let i = 0; i<=req.files.length-1; i++){
        //Uso slice para acortar el path de manera que pueda acceder a las imagenes desde el frontEnd
        arrayPhotos.push((req.files[i].path).slice(16)) //Almaceno en el array las archivos(fotos) pasadas por el frontEnd
    }

    //Compruebo que los campos se han rellenado correctamente
    if (title == "" || phone == "" || brand == "" || model =="" || price =="" || year == "" || numberSeats =="" ||numberDoors ==""|| horsepower =="" || kilometres ==""){    
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"You need to fill in the required fields"
        })
    }else if(!/^[A-Za-z0-9 -_]*$/.test(brand)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Brand field filled in incorrectly"
        })
    }else if(!/^(0)?[5-7][0-9]{8}$/.test(phone)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Telephone field filled in incorrectly"
        })
    }else if(!/^[A-Za-z0-9 -_]*$/.test(model)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Model field filled in incorrectly"
        })
    }else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(price)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Price field filled in incorrectly"
        })
    }else if (!/^(19[1-9]\d|20[0-2]\d|2030)$/.test(year)){ //Valido del año 1919 al 2030
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Year field filled in incorrectly"
        })
    }else if(!/^(?:[1-9]|[1-2]\d|3[0-5])$/.test(numberSeats)){//Valida un rango de numeros del 1 al 35
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Number of seats field filled in incorrectly"
        })
    }else if(!/^(?:[1-9]|10)$/.test(numberDoors)){ //Valida un rango de numeros del 1 al 10
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Number of doors field filled in incorrectly"
        })
    }else if(carType == "Select a Car Type"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Car type field not filled in"
        })
    }else if(!/^[0-9]+$/.test(horsepower)){ //Valida que solo se ingresen numeros
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Horse field filled in incorrectly"
        })
    }else if(!/^[0-9]+$/.test(kilometres)){ //Valida que solo se ingresen numeros
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Kilometer field filled in incorrectly"
        })
    }else if(engine == "Select engine type"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Motor field not filled"
        })
    }else if(gearShift == "Select the gear shift"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Field gearshift brand not filled"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Email field filled in incorrectly"
        })
    }else if(ubication == "Select the ubication"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Location field not filled in"
        })
    }else{//Tras comprobar que los campos se han rellenado correctamente creamos o editamos el anuncio
        
        if(itsEdit == "true"){//Compruebo si es una edicion para proceder con los pasos de edicion

            if(photosEdit !== undefined){ //Verifico si las imagenes del anuncio a editar siguen vigentes
                for(let i = 0; i<=photosEdit.length-1; i++){//Formateo los path del arrayEdicion para poder acceder a ellos desde el backend y los añado al arrayFinal de fotos
                    arrayPhotos.push(photosEdit[i]) //Los path de las imagenes que se mantienen despues de la edicion las almaceno en el array final de imagenes
                }
            }
        
            if(photosEditDelete !== undefined){ //Verifico si hay imagenes a eliminar del anuncio a editar
                //Elimino las fotos que se quieren elimnar de la edicion de manera local
                for(let i = 0; i<=photosEditDelete.length-1; i++){
                    try {
                        //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                        fs.unlinkSync("..\\frontend\\src\\"+ photosEditDelete[i]) //Mediante fs.unlinkSync elimino los archivos de las imagenes
                    } catch (err) {
                        console.error(err)
                    }              
                }
            }
            
            let filter = {_id:_idEdit} //Creo el filtro con el _id del anuncio a editar
            let updateAnnounce = { //Creo el objeto anuncio para actualizar los campos que sean necesarios
                brand:brand,
                model:model,
                price:priceInt,
                year:yearInt,
                title:title,
                sellerType:sellerType,
                version:version,
                numberSeats:numberSeats,
                numberDoors:numberDoors,
                horsepower:horsePowerInt,
                carType:carType,
                kilometres:kilometresInt,
                engine:engine,
                gearShift:gearShift,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                photosPaths:arrayPhotos
            }

            AnnouncementVehicle.findOneAndUpdate(filter, updateAnnounce).then(result =>{ //Actualizo el anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post correctly edited",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while editing announce"
                })
            })
        }else{//En el caso de que sea una publicacion, realizamos los pasos necesario para publicar el anuncio
            let announceVehicle = new AnnouncementVehicle({ //Creo el objeto anuncio mediante el Schema de mongoose
                _idUser:_idUser,
                date:currentDate,
                brand:brand,
                model:model,
                price:priceInt,
                year:yearInt,
                title:title,
                sellerType:sellerType,
                version:version,
                numberSeats:numberSeats,
                numberDoors:numberDoors,
                horsepower:horsePowerInt,
                carType:carType,
                kilometres:kilometresInt,
                engine:engine,
                gearShift:gearShift,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                editNum:editNum,
                type:type,
                photosPaths:arrayPhotos
            })
    
            announceVehicle.save().then(result =>{ //Mediante la funcion de mongoose, guardo el objeto anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post saved",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while saving announce"
                })
            })
        }
    }
}

// *************************************************************************************************************

//Funcion para postear/editar un anuncio de moto
export function postAnnounceMoto(req , res){
    // * VARIABLES *
    let {brand, model, price, year, title, sellerType, version, horsepower, motoType, kilometres, email, phone, description, ubication, type, editNum, itsEdit, _idEdit, _idUser} = req.body //Obtenemos los datos del frontEnd mediante req.body
    //Creamos las variables que almacenaran los datos obtenidos del frontEnd
    brand = brand.trim()
    _idUser = _idUser.trim()
    model = model.trim()
    price = price.trim()
    let priceInt = parseInt(price)
    year = year.trim()
    let yearInt = parseInt(year)
    title = title.trim()
    sellerType = sellerType.trim()
    version = version.trim()
    horsepower = horsepower.trim()
    let horsePowerInt = parseInt(horsepower)
    motoType = motoType.trim()
    kilometres = kilometres.trim()
    let kilometresInt = parseInt(kilometres)
    email = email.trim()
    phone = phone.trim()
    description = description.trim()
    ubication = ubication.trim()
    _idEdit = _idEdit.trim()
    type = type.trim()
    editNum = editNum.trim()
    itsEdit = itsEdit.trim()
    //Obtengo las variables con el path de las imagenes en caso de ser una edicion
    let photosEdit = req.body.photosEdit
    let photosEditDelete = req.body.photosEditDelete
    //Fecha
    const currentDate = new Date()

    //Obtengo el path de las imagenes
    let arrayPhotos = [] //Array en el que voy a almacenar las fotos
    for(let i = 0; i<=req.files.length-1; i++){
        //Uso slice para acortar el path de manera que pueda acceder a las imagenes desde el frontEnd
        arrayPhotos.push((req.files[i].path).slice(16)) //Almaceno en el array las archivos(fotos) pasadas por el frontEnd
    }

    //Compruebo que los campos se han rellenado correctamente
    if (title == "" || phone == "" || price =="" || kilometres ==""){    
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"You need to fill in the required fields"
        })
    }else if(!/^[A-Za-z0-9 -_]*$/.test(brand)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Brand field not filled properly"
        })
    }else if(!/^(0)?[5-7][0-9]{8}$/.test(phone)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Phone field not filled properly"
        })
    }else if(!/^[A-Za-z0-9 -_]*$/.test(model)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Model field not filled properly"
        })
    }else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(price)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Price field not filled properly"
        })
    }else if (!/^(19[1-9]\d|20[0-2]\d|2030)$/.test(year)){ //Valido del año 1919 al 2030
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Year field not filled properly"
        })
    }else if(motoType == "Select a Moto Type"){
        //Elimino las fotos almacenas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Type of car field not filled properly"
        })
    }else if(!/^[0-9]+$/.test(horsepower)){ //Valida que solo se ingresen numeros
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Horsepower field not filled properly"
        })
    }else if(!/^[0-9]+$/.test(kilometres)){ //Valida que solo se ingresen numeros
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Kilometres field not filled properly"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Email field not filled properly"
        })
    }else if(ubication == "Select the ubication"){
        //Elimino las fotos almacenadas ya que el anuncio no se ha guardado devido a un error
        for(let i = 0; i<=req.files.length-1; i++){
            try {
                fs.unlinkSync(req.files[i].path)
            } catch (err) {
                console.error(err)
            }              
        }

        res.json({
            status:"FAILED",
            message:"Ubication field not filled properly"
        })
    }else{//En caso de que los campos esten correctos, creo el anuncio y lo almaceno

        if(itsEdit == "true"){//Compruebo si es una edicion para proceder con los pasos de edicion

            if(photosEdit !== undefined){ //Verifico si las imagenes del anuncio a editar siguen vigentes
                for(let i = 0; i<=photosEdit.length-1; i++){//Formateo los path del arrayEdicion para poder acceder a ellos desde el backend y los añado al arrayFinal de fotos
                    arrayPhotos.push(photosEdit[i]) //Los path de las imagenes que se mantienen despues de la edicion las almaceno en el array final de imagenes
                }
            }
        
            if(photosEditDelete !== undefined){ //Verifico si hay imagenes a eliminar del anuncio a editar
                //Elimino las fotos que se quieren elimnar de la edicion de manera local
                for(let i = 0; i<=photosEditDelete.length-1; i++){
                    try {
                        //Formateo los path del arrayEdicionDelete para poder acceder a ellos desde el backend
                        fs.unlinkSync("..\\frontend\\src\\"+ photosEditDelete[i]) //Mediante fs.unlinkSync elimino los archivos de las imagenes
                    } catch (err) {
                        console.error(err)
                    }              
                }
            }   
            
            let filter = {_id:_idEdit} //Creo el filtro con el _id del anuncio a editar
            let updateAnnounce = { //Creo el objeto anuncio para actualizar los campos que sean necesarios
                brand:brand,
                model:model,
                price:priceInt,
                year:yearInt,
                title:title,
                sellerType:sellerType,
                version:version,
                horsepower:horsePowerInt,
                motoType:motoType,
                kilometres:kilometresInt,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                photosPaths:arrayPhotos
            }

            AnnouncementMoto.findOneAndUpdate(filter, updateAnnounce).then(result =>{ //Actualizo el anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post succesfully edited",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while editing announce"
                })
            })

        }else{
            let announceMoto = new AnnouncementMoto({ //Creo el objeto anuncio mediante el Schema de mongoose
                _idUser:_idUser,
                date:currentDate,
                brand:brand,
                model:model,
                price:priceInt,
                year:year,
                title:title,
                sellerType:sellerType,
                version:version,
                horsepower:horsepower,
                motoType:motoType,
                kilometres:kilometresInt,
                email:email,
                phone:phone,
                description:description,
                ubication:ubication,
                type:type,
                editNum:editNum,
                photosPaths:arrayPhotos
            })
    
            announceMoto.save().then(result =>{ //Mediante la funcion de mongoose, guardo el objeto anuncio en la BBDD
                res.json({
                    status:"SUCCESS",
                    message:"Post succesfully saved",
                    data:result
                })
            }).catch(err =>{
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"An error occurred while saving announce"
                })
            })
        }
    }    
}

// *************************************************************************************************************

//Funcion para editar un los datos de un perfil de usuario
export function editProfile(req, res){
    // * VARIABLES *
    let {name, email, phone} = req.body
    name = name.trim()
    email = email.trim()
    phone = phone.trim()

    //Se crea el objeto busqueda con el token para buscar al usuario.
    let objectSearch = {
        "token": req.headers.token
    }

    //Se crea el objeto update con los datos a editar.
    let objectUpdate = {
        name:name,
        email:email,
        phone:phone
    }

    //Mediante mongoose, actualizo los datos del usuario.
    User.findOneAndUpdate(objectSearch, objectUpdate).then(result =>{ //Actualizo el user
        res.json({
            status:"SUCCESS",
            message:"User succesfully edited",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"FAILED",
            message:"An error occurred while editing User"
        })
    })
}