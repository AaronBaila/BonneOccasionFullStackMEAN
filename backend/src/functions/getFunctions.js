import { User, AnnouncementStandard, AnnouncementVehicle, AnnouncementMoto, AnnouncementProperty, AnnouncementServiceJob} from "../bbdd/dbModels.js"

//************ GET FUNCTIONS ****************

//Funcion que retorna el usuario loggeado actual
export function getUser(req, res){
    //Se crea el objeto busqueda con el token para buscar al usuario loggeado
    let objectSearch = {
        "token": req.headers.token
    }

    User.find(objectSearch).then(result=>{ //Busco el usuario actual mediante mongoose
        res.send(result)
    })
}

//Funcion que retorna los anuncios de el usuario actual loggeado
export async function getMyPosts(req, res){

    // * VARIABLES *
    //Se crea el objeto busqueda con el token para buscar al usuario.
    let userSearch = {
        "token": req.headers.token
    }

    User.find(userSearch).then(async result=>{ //Busco el usuario actual mediante mongoose
        // * VARIABLES *
        let arrayPosts = [] //Variable que almacena los posts encontrados pertenecientes al usuario actual loggeado
        let _idUser = result[0]._id.toString() //Almacenlo el ID del usuario actual
        let objectSearch = { //Objeto busqueda que permitira buscar todos los anuncios que compartan el mismo id de usuario (de el usuario actual)
            "_idUser": _idUser
        }

        //Mediante el uso de mongoose, hago la busqueda en todas las colecciones. Utilizo el objectSearch para buscar por id de usuario
        //Almaceno el resultado de la busqueda en las variables
        let resultAnnounceVehiculo = await AnnouncementVehicle.find(objectSearch)
        let resultAnnounceServiceJob = await AnnouncementServiceJob.find(objectSearch)
        let resultAnnounceMoto = await AnnouncementMoto.find(objectSearch)
        let resultAnnounceProperty = await AnnouncementProperty.find(objectSearch)
        let resultAnnounceStandard = await AnnouncementStandard.find(objectSearch)

        //Mediante los for de abajo, almaceno todos los resultados encontrados en el arrayPosts. De esta manera, la variable arrayPosts tendra todos los posts que sean del usuario actual
        for(let i = 0; i<= resultAnnounceVehiculo.length-1; i++){
            arrayPosts.push(resultAnnounceVehiculo[i])
        }
        for(let i = 0; i<= resultAnnounceServiceJob.length-1; i++){
            arrayPosts.push(resultAnnounceServiceJob[i])
        }
        for(let i = 0; i<= resultAnnounceMoto.length-1; i++){
            arrayPosts.push(resultAnnounceMoto[i])
        }
        for(let i = 0; i<= resultAnnounceProperty.length-1; i++){
            arrayPosts.push(resultAnnounceProperty[i])
        }
        for(let i = 0; i<= resultAnnounceStandard.length-1; i++){
            arrayPosts.push(resultAnnounceStandard[i])
        }

        res.send(arrayPosts)
    })
}

//Funcion para obtener un solo anuncio
export async function getAnnounce(req, res){

    //Mediante el uso de mongoose busco en todas las colecciones por id de anuncio
    //De req.params.id obtengo el id del anuncio a buscar que llega del frontEnd y el cual ha generado mongoose cuando se creo el anuncio
    let resultAnnounceStandard = await AnnouncementStandard.findById(req.params.id.slice(1))
    let resultAnnounceVehiculo = await AnnouncementVehicle.findById(req.params.id.slice(1))
    let resultAnnounceMoto = await AnnouncementMoto.findById(req.params.id.slice(1))
    let resultAnnounceProperty = await AnnouncementProperty.findById(req.params.id.slice(1))
    let resultAnnounceServiceJob = await AnnouncementServiceJob.findById(req.params.id.slice(1))

    //Mediante la sucesion de if, comprubo en cual de las colecciones se ha encontrado el anuncio. En caso de que el resultado de la busqueda sea diferente a null significa que se ha encontrado el anuncio y pertenece a esa coleccion.
    //En caso de encontrar el anuncio, se envia al frontEnd
    if(resultAnnounceStandard != null ){
        res.send(resultAnnounceStandard)
    }else if(resultAnnounceVehiculo != null){
        res.send(resultAnnounceVehiculo)
    }else if(resultAnnounceProperty != null){   
        res.send(resultAnnounceProperty)
    }else if(resultAnnounceServiceJob != null){
        res.send(resultAnnounceServiceJob)
    }else {
        res.send(resultAnnounceMoto)
    }
}

function shuffle(array) { //Funcion que me permite mezclar/barajar un array (vamos a usarla en la funcion getAnnounces)
    array.sort(() => Math.random() - 0.5)
}

//Funcion para obtener muchos anuncios de diferente tipo (se utiliza sobretodo en la pagina inicial/principal de la web)
export async function getAnnounces(req, res){
    // * VARIABLES *
    let postsAlreadyShown = req.body.announcesArray //Obtengo el array de anuncios obtenidos al principio(al abrir la web por primera vez) para no repetir en caso de utilizar el boton "mostrar mas"
    let arrayFinal = [] //Array que almacenara el resultado final. Todos los anuncios a mostrar en el frontend

    if(postsAlreadyShown !== undefined){ //En caso de que la variable postsAlreadyShown este llena, quiere decir que es la segunda vez que se entra en esta funcion y por lo tanto has apretado el boton "mostrar mas"
        //Mediante mongoose hago una busqueda la cual se limita a 5 resultados y lo ordena por fecha descendente (es decir los ultimos anuncios en ser creados se mostraran primero)
        //Al venir de apretar el boton "mostrar mas" no queremos se repitan los anuncios del principio por lo tanto mediante _id:{$nin:postsAlreadyShown} le indicamos que omita todos los anuncios cuyo _id este en el array postsAlreadyShown
        let arrayAnnounceStandard5 = await AnnouncementStandard.find({_id:{$nin:postsAlreadyShown}}).sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayAnnounceStandard5.length-1; i++){ //Mediante el siguiente for almaceno los resultados en el arrayFinal (array que se enviara al frontend con todos los anuncios).
            arrayFinal.push(arrayAnnounceStandard5[i])
        }
       let arrayJobsServices5 = await AnnouncementServiceJob.find({_id:{$nin:postsAlreadyShown}}).sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayJobsServices5.length-1; i++){
            arrayFinal.push(arrayJobsServices5[i])
        } 
        let arrayPropertys5 = await AnnouncementProperty.find({_id:{$nin:postsAlreadyShown}}).sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayPropertys5.length-1; i++){
            arrayFinal.push(arrayPropertys5[i])
        }
        let arrayVehicles5 = await AnnouncementVehicle.find({_id:{$nin:postsAlreadyShown}}).sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayVehicles5.length-1; i++){
            arrayFinal.push(arrayVehicles5[i])
        } 
        let arrayMotos5 = await AnnouncementMoto.find({_id:{$nin:postsAlreadyShown}}).sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayMotos5.length-1; i++){
            arrayFinal.push(arrayMotos5[i])
        }

        shuffle(arrayFinal) //Con esto barajas el array para mostrarlos en orden aleatorio
        res.send(arrayFinal)

    }else{ //En el caso de entrar en else, quiere decir que es la primera vez que se cargan los anuncios (primera vez que se entra en la web). Todavia no se ha dado a el boton de "mostrar mas"
       //Aqui realizamos lo mismo que arriba pero sin preocuparnos del array postsAlreadyShown ya que es la primera vez que se muetran anuncios y no hay que evitar que se repitan
        let arrayAnnounceStandard5 = await AnnouncementStandard.find().sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayAnnounceStandard5.length-1; i++){
            arrayFinal.push(arrayAnnounceStandard5[i])
        }
        let arrayJobsServices5 = await AnnouncementServiceJob.find().sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayJobsServices5.length-1; i++){
            arrayFinal.push(arrayJobsServices5[i])
        } 
        let arrayPropertys5 = await AnnouncementProperty.find().sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayPropertys5.length-1; i++){
            arrayFinal.push(arrayPropertys5[i])
        }
        let arrayVehicles5 = await AnnouncementVehicle.find().sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayVehicles5.length-1; i++){
            arrayFinal.push(arrayVehicles5[i])
        } 
        let arrayMotos5 = await AnnouncementMoto.find().sort({date: 'desc'}).limit(5)
        for(let i = 0; i<= arrayMotos5.length-1; i++){
            arrayFinal.push(arrayMotos5[i])
        }

        shuffle(arrayFinal) //Con esto barajas el array para mostrarlos en orden aleatorio
        res.send(arrayFinal)
    }      
}

//Funcion para obtener los anuncios de bicicletas
export async function getBicycles(req, res){
    let result = await AnnouncementStandard.find({"category":"Bicicletas"})
    res.send(result)
}

//Funcion para obtener los anuncios de niños
export async function getChildren(req, res){
    let result = await AnnouncementStandard.find({"category":"Niños y Bebes"})
    res.send(result)
}

//Funcion para obtener los anuncios de cineLibrosMusica
export async function getCinemaBooksMusic(req, res){
    let result = await AnnouncementStandard.find({"category":"Cine, Libros y Musica"})
    res.send(result)
}

//Funcion para obtener los anuncios de consolasVideojuegos
export async function getConsolesVideogames(req, res){
    let result = await AnnouncementStandard.find({"category":"Consolas y Videojuegos"})
    res.send(result)
}

//Funcion para obtener los anuncios de construccionReformas
export async function getConstruction(req, res){
    let result = await AnnouncementStandard.find({"category":"Construccion y Reformas"})
    res.send(result)
}

//Funcion para obtener los anuncios de deporteOcio
export async function getSportLeisure(req, res){
    let result = await AnnouncementStandard.find({"category":"Deporte y Ocio"})
    res.send(result)
}

//Funcion para obtener los anuncios de electrodomesticos
export async function getHomeAppliances(req, res){
    let result = await AnnouncementStandard.find({"category":"Electrodomesticos"})
    res.send(result)
}

//Funcion para obtener los anuncios de hogarJardin
export async function getHomeGarden(req, res){
    let result = await AnnouncementStandard.find({"category":"Hogar y Jardin"})
    res.send(result)
}

//Funcion para obtener los anuncios de movilesTelefonia
export async function getSmartphonesTelephony(req, res){
    let result = await AnnouncementStandard.find({"category":"Moviles y Telefonia"})
    res.send(result)
}

//Funcion para obtener los anuncios de propiedades
export async function getProperties(req, res){
    let result = await AnnouncementProperty.find()
    res.send(result)
}

//Funcion para obtener los anuncios de motos
export async function getMotos(req, res){
    if(req.body.itsFilter == "true"){ //Compruebo si se aplican filtros

        let objectSearch = {} //Objeto al cual se le añadiran los filtros aplicados para asi poder hacer la busqueda mediante mongoose
        
        //En el caso de aplicar filtros, compruebo cuales son los filtros que se estan aplicando para añadirlos a mi objectSearch
        if(req.body.brand !== "undefined"){ //En caso de que el filtro brand este lleno, se lo añadimos al objectSearch
            objectSearch.brand = req.body.brand
        }
        if(req.body.model !== "undefined"){
            objectSearch.model = req.body.model
        }
        if(req.body.minPrice !== "undefined" || req.body.maxPrice !== "undefined"){
            let minPriceInt = 0
            let maxPriceInt = 9999999999

            if(req.body.minPrice === ""){
                maxPriceInt = parseInt(req.body.maxPrice)
            }else if(req.body.maxPrice === ""){
                minPriceInt = parseInt(req.body.minPrice)
            }else{
                minPriceInt = parseInt(req.body.minPrice)
                maxPriceInt = parseInt(req.body.maxPrice)
            }
            objectSearch.price = {$gte: minPriceInt, $lte: maxPriceInt}
        }

        if(req.body.minKilometres !== "undefined" || req.body.maxKilometres !== "undefined"){
            let minKilometresInt = 0
            let maxKilometresInt = 9999999999

            if(req.body.minKilometres === ""){
                maxKilometresInt = parseInt(req.body.maxKilometres)
            }else if(req.body.maxKilometres === ""){
                minKilometresInt = parseInt(req.body.minKilometres)
            }else{
                minKilometresInt = parseInt(req.body.minKilometres)
                maxKilometresInt = parseInt(req.body.maxKilometres)
            }

            objectSearch.kilometres = {$gte: minKilometresInt, $lte: maxKilometresInt}
        }

        if(req.body.minYear !== "undefined" || req.body.maxYear !== "undefined"){
            let minYearInt = 0
            let maxYearInt = 9999999999

            if(req.body.minYear === ""){
                maxYearInt = parseInt(req.body.maxYear)
            }else if(req.body.maxYear === ""){
                minYearInt = parseInt(req.body.minYear)
            }else{
                minYearInt = parseInt(req.body.minYear)
                maxYearInt = parseInt(req.body.maxYear)
            }

            objectSearch.year = {$gte: minYearInt, $lte: maxYearInt}
        }

        if(req.body.motoType !== "undefined"){ //En caso de que el filtro brand este lleno, se lo añadimos al objectSearch
            objectSearch.motoType = req.body.motoType
        }

        if(req.body.minHorsepower !== "" || req.body.maxHorsepower !== ""){
            console.log("PRUEBAAAA:")
            console.log("HAY HORSEPOWER")
            console.log(req.body.minHorsepower)
            console.log(req.body.maxHorsepower)
            let minHorsepowerInt = 0
            let maxHorsepowerInt = 9999999999

            if(req.body.minHorsepower === ""){
                maxHorsepowerInt = parseInt(req.body.maxHorsepower)
            }else if(req.body.maxHorsepower === ""){
                minHorsepowerInt = parseInt(req.body.minHorsepower)
            }else{
                minHorsepowerInt = parseInt(req.body.minHorsepower)
                maxHorsepowerInt = parseInt(req.body.maxHorsepower)
            }

            objectSearch.horsepower = {$gte: minHorsepowerInt, $lte: maxHorsepowerInt}
        }
        if(req.body.ubication !== "undefined"){
            objectSearch.ubication = req.body.ubication
        }
        if(req.body.sellerType !== "undefined"){
            objectSearch.sellerType = req.body.sellerType
        }


        //Tras añadir todos los filtros, se hace la busqueda de los anuncios que reunan los requisitos de los filtros aplicados
        let result = await AnnouncementMoto.find(objectSearch)
        res.send(result)

    }else{ //En caso de no aplicar filtros, se hace una busqueda normal de todos los anuncios de vehiculos
        let result = await AnnouncementMoto.find()
        res.send(result)
    }
}

//Funcion para obtener los anuncios de informaticaElectronica
export async function getComputingElectronics(req, res){
    let result = await AnnouncementStandard.find({"category":"Informatica y Electronica"})
    res.send(result)
}

//Funcion para obtener los anuncios otros
export async function getOthers(req, res){
    let result = await AnnouncementStandard.find({"category":"Otros"})
    res.send(result)
}

//Funcion para obtener los anuncios de moda
export async function getFashion(req, res){
    let result = await AnnouncementStandard.find({"category":"Moda y Accesorios"})
    res.send(result)
}

//Funcion para obtener los anuncios de TvAudioFoto
export async function getTvAudioPhoto(req, res){
    let result = await AnnouncementStandard.find({"category":"TV, Audio y Foto"})
    res.send(result)
}

//Funcion para obtener los anuncios de IndustriaAgricultura
export async function getIndustryAgriculture(req, res){
    let result = await AnnouncementStandard.find({$or: [{"category":"Industria"}, {"category":"Agricultura"}]})
    res.send(result)
}

//Funcion para obtener los anuncios de empleos
export async function getJobs(req, res){
    let result = await AnnouncementServiceJob.find({"type":"job"})
    res.send(result)
}

//Funcion para obtener los anuncios de servicios
export async function getServices(req, res){
    let result = await AnnouncementServiceJob.find({"type":"service"})
    res.send(result)
}

//Funcion para obtener los anuncios de vehiculos
export async function getVehicles(req, res){
    if(req.body.itsFilter == "true"){ //Compruebo si se aplican filtros

        let objectSearch = {} //Objeto al cual se le añadiran los filtros aplicados para asi poder hacer la busqueda mediante mongoose
        
        //En el caso de aplicar filtros, compruebo cuales son los filtros que se estan aplicando para añadirlos a mi objectSearch
        if(req.body.brand !== "undefined"){ //En caso de que el filtro brand este lleno, se lo añadimos al objectSearch
            objectSearch.brand = req.body.brand
        }
        if(req.body.ubication !== "undefined"){
            objectSearch.ubication = req.body.ubication
        }

        console.log("PRUEBAAA:")
        console.log(objectSearch)
        
        if(req.body.minPrice !== "undefined" || req.body.maxPrice !== "undefined"){
            let minPriceInt = 0
            let maxPriceInt = 9999999999

            if(req.body.minPrice === ""){
                maxPriceInt = parseInt(req.body.maxPrice)
            }else if(req.body.maxPrice === ""){
                minPriceInt = parseInt(req.body.minPrice)
            }else{
                minPriceInt = parseInt(req.body.minPrice)
                maxPriceInt = parseInt(req.body.maxPrice)
            }
            objectSearch.price = {$gte: minPriceInt, $lte: maxPriceInt}
        }

        console.log("PRUEBAAA2:")
        console.log(objectSearch)

        if(req.body.minKilometres !== "undefined" || req.body.maxKilometres !== "undefined"){
            let minKilometresInt = 0
            let maxKilometresInt = 9999999999

            if(req.body.minKilometres === ""){
                maxKilometresInt = parseInt(req.body.maxKilometres)
            }else if(req.body.maxKilometres === ""){
                minKilometresInt = parseInt(req.body.minKilometres)
            }else{
                minKilometresInt = parseInt(req.body.minKilometres)
                maxKilometresInt = parseInt(req.body.maxKilometres)
            }

            objectSearch.kilometres = {$gte: minKilometresInt, $lte: maxKilometresInt}
        }

        if(req.body.minYear !== "undefined" || req.body.maxYear !== "undefined"){
            let minYearInt = 0
            let maxYearInt = 9999999999

            if(req.body.minYear === ""){
                maxYearInt = parseInt(req.body.maxYear)
            }else if(req.body.maxYear === ""){
                minYearInt = parseInt(req.body.minYear)
            }else{
                minYearInt = parseInt(req.body.minYear)
                maxYearInt = parseInt(req.body.maxYear)
            }

            objectSearch.year = {$gte: minYearInt, $lte: maxYearInt}
        }

        if(req.body.minHorsepower !== "" || req.body.maxHorsepower !== ""){
            console.log("PRUEBAAAA:")
            console.log("HAY HORSEPOWER")
            console.log(req.body.minHorsepower)
            console.log(req.body.maxHorsepower)
            let minHorsepowerInt = 0
            let maxHorsepowerInt = 9999999999

            if(req.body.minHorsepower === ""){
                maxHorsepowerInt = parseInt(req.body.maxHorsepower)
            }else if(req.body.maxHorsepower === ""){
                minHorsepowerInt = parseInt(req.body.minHorsepower)
            }else{
                minHorsepowerInt = parseInt(req.body.minHorsepower)
                maxHorsepowerInt = parseInt(req.body.maxHorsepower)
            }

            objectSearch.horsepower = {$gte: minHorsepowerInt, $lte: maxHorsepowerInt}
        }

        if(req.body.sellerType !== "undefined"){
            objectSearch.sellerType = req.body.sellerType
        }
        if(req.body.numberSeats !== "undefined"){
            objectSearch.numberSeats = req.body.numberSeats
        }
        if(req.body.numberDoors !== "undefined"){
            objectSearch.numberDoors = req.body.numberDoors
        }
        if(req.body.carType !== "undefined"){
            objectSearch.carType = req.body.carType
        }
        if(req.body.engine !== "undefined"){
            objectSearch.engine = req.body.engine
        }
        if(req.body.gearShift !== "undefined"){
            objectSearch.gearShift = req.body.gearShift
        }

        //Tras añadir todos los filtros, se hace la busqueda de los anuncios que reunan los requisitos de los filtros aplicados

        let result = await AnnouncementVehicle.find(objectSearch)
        res.send(result)

    }else{ //En caso de no aplicar filtros, se hace una busqueda normal de todos los anuncios de vehiculos
        let result = await AnnouncementVehicle.find()
        res.send(result)
    }
}