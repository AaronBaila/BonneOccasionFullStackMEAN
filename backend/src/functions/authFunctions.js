//IMPORTACIONES
import {User} from "../bbdd/dbModels.js" //Importo el modelo/schema user de mongoose
import jwt from "jsonwebtoken" //Libreria que nos permite usar JWT para las autenticaciones con token
import bcrypt from "bcrypt" //Libreria para encriptar

//FUNCIONES PARA LAS RUTAS DE LOGIN/SIGNUP
export function signup(req, res){ //Funcion que permite registrate en el sistema
    // * VARIABLES *
    //Obtengo la info del req.body
    let {name, password, email, phone} = req.body
    name = name.trim()
    email = email.trim()
    phone = phone.trim()
    password = password.trim()
    //Fecha
    const currentDate = new Date()

    //VALIDACION DE CAMPOS
    if(name == "" || email == "" || password == "" || phone == ""){ //Compruebo si los campos estan vacios
        res.json({
            status:"FAILED",
            message:"Empty Input Fields"
        })
    }else if(!/^[a-zA-Z ]*$/.test(name)){ //Compruebo que el nombre solo contiene letras mayus o minus
        res.json({
            status:"FAILED",
            message:"Invalid Name Input"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){ //Compruebo que el email sea en formato email, a@a.com
        res.json({
            status:"FAILED",
            message:"Invalid Email Input"
        })
    }else if(password.length < 8){ //Compruebo que la contraseña sea mayor a 8 digitos
        res.json({
            status:"FAILED",
            message:"Password is to short"
        })
    }else{ //SI TODOS LOS CAMPOS ESTAN CORRECTOS, CREAMOS EL USUARIO
        //CREACION DE USUARIO
        User.find({email}).then(result =>{ //Mediante mongoose busco si hay un usuario con el email ya registrado
            if(result.length){ //En caso de que resultado tengo longitud, es que ha encontrado un usuario ya registrado con el email
                res.json({
                    status:"FAILED",
                    message:"The user with email: " + email + " already exists"
                })
            }else{ //En caso de que no exista dicho usuario, lo creamos
                //Password Handling
                const saltRounds = 10 //Para el encriptado (saltos a realizar a el momento de encriptar)
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{ //Creamos el hash encriptando la contraseña
                    const newUser = new User ({ //Creamos el objeto usuario definido en el schema creado con mongoose
                        name,
                        email,
                        phone,
                        password : hashedPassword, //Guardamos la contraseña encriptada
                        date:currentDate,
                        token: "empty" //Guardamos el token como vacio, para posteriormente crearlo y guardarlo
                    })

                    //Creo el Token
                    const token = jwt.sign(
                        {user_id: newUser._id, email}, //Creamos el Token con el ID y el Email (El ID lo genera solo mongoose al crear un nuevo objeto del schema definido)
                        process.env.TOKEN_KEY, //Tambien se utiliza el token key que puede ser cualquier string (caracteres que ayudan a crear el token)
                        {expiresIn:"2h"} //El token dejara de ser valido tras 2 horas
                    )
                    newUser.token = token //Guardamos el token generado en el campo token del objeto user
                    
                    //Guardamos el usuario creado en la BBDD, mediante una funcion de mongoose (save)
                    newUser.save().then(result =>{
                        console.log(result)
                        res.status(200).json({token}) //Una vez guardado el usuario, enviamos el token al frontEnd para asi poder usarlo (guardarlo en el navegaro (en memoria local o en cookies))
                    }).catch(err => {
                        console.log(error)
                        res.json({
                            status:"FAILED",
                            message:"An error ocurred while trying to save the user"
                        })
                    })

                }).catch(err =>{ //Gestionamos los posibles errores al tratar de crear el hash
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"An error ocurred while trying to create the password hash"
                    })
                })
            }
        }).catch(err =>{ //Gestionamos los posibles errores al intentar verificar si el usuario existe buscando en la BBDD
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error ocurred while trying to verify if the user exists"
            })
        })
        
    }
}

export function login(req,res){ //Funcion que permite iniciar sesion
    // * VARIABLES *
    let {email, password} = req.body
    email = email.trim()
    password = password.trim()

    //VALIDACION DE CAMPOS
    if(email == "" || password == ""){ //Compruebo que los campos no esten vacios
        res.json({
            status:"FAILED",
            message:"Empty Input Fields"
        })
    }else{
        //VALIDACION DE USUARIO (COMPARAMOS DATOS PROPORCIONADOS EN LOGIN CON BBDD)
        User.find({email}).then(data =>{ //Busco si el usuario con el email proporcionado existe
            if(data.length){ //Si data tiene longitud es que si existe ya que la busqueda arroja resultados  
                
                const hashedPassword = data[0].password //Obtengo la pass hasheada(encriptada) del usuario encontrado

                const newUser = new User({ //Creo el objeto newUser mediante el shcema de mongoose y los datos del usuario existente de la BBDD
                    name:data[0].name,
                    email:data[0].email,
                    password:data[0].password,
                    token:"empty"
                })

                bcrypt.compare(password, hashedPassword).then(result=>{ //Comparo la pass que nos pasa el usuario con la que esta almacenada
                    if(result){ // Si el resultado de la comparacion es "TRUE" la contraseña es correcta
                        
                        //CREATE TOKEN
                        const token = jwt.sign( //Creo el Token con el userID(creado automaticamente por mongoose con el schema) y el email
                            {user_id:newUser._id, email},
                            process.env.TOKEN_KEY,
                            {expiresIn: "2h"} //El token deja de ser valdio en 2 horas
                        )
                        newUser.token = token //Guardo el token en el objeto usuario

                        //Utilizo los objetos de abajo para actualizar el token a la hora de hacer login (cambiamos el token antiguo por el nuevo)
                        let objectSearch = {
                            email:data[0].email
                        }

                        let objectUpdate = {
                            token:token
                        }

                        //Actualizamos el token antiguo por el nuevo en la BBDD
                        User.findOneAndUpdate(objectSearch, objectUpdate).then(data =>{
                            console.log(data)
                            console.log("Token Updated Succesfully")
                        }).catch(err =>{
                            console.log(err)
                            res.json({
                                status:"FAILED",
                                message:"An error ocurred while trying to update the new token"
                            })
                        })
                        
                        res.status(200).json({token}) // Enviamos el token al frontEnd para asi poder usarlo
                    
                    }else{ // (Contraseña Incorrecta) En caso de que la contraseña no coincida y sea incorrecta
                        res.json({
                            status:"FAILED",
                            message:"Incorrect Password"
                        })
                    }

                }).catch(err =>{ //Gestionamos los posibles errores al comparar las contraseñas con bcrypt
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"An error ocurred while trying to compare the passwords"
                    })
                })

            }else{ //En el caso de que no existe un usuario con el email proporcionado
                res.json({
                    status:"FAILED",
                    message:"The email doesn't exists"
                })
            }

        }).catch(err =>{ //Gestionamos posibles errores al tratar de encontrar le usuario con mongoose en la BBDD
            console.log(err)
            res.json({
                status:"FAILED",
                message:"An error ocurred while trying to find an existing user "
            })
        })
    }
}


// *** AUTH ***

//VARIABLES
const config = process.env //Nos permite obtener las variables del .env

//FUNCION AUTH
export const verifyToken = (req, res, next) =>{ //Funcion que verifica si el token que llega del frontend es valido o no
    const token = req.body.token || req.query.token || req.headers["token" /*x-access-token*/] //Obtengo el token desde cualquiera de las fuentas que pongo

    if(!token){ //En caso de no encontrar un token
        
        return res.status(403).send("A token is required for making the authentication")
    
    }else{ //En caso de encontrar token, verificamos que el token es correcto con nuestra token_key
        
        try{ //Verificamos que el token es correcto con mi token_key

            const tokenDecoded = jwt.verify(token, config.TOKEN_KEY) //(Contenido que esta dentro del token) Descodificamos el token(y vemos si es correcto) y lo almacenamos en una variable
            req.user = tokenDecoded //Lo guardamos para que el resto de funciones puedan utilizar estos datos, todas las funciones tienen el objeto req, por lo tanto lo guardamos en el objeto req, creando la propiedad user (req.user)
        
        }catch(err){
            return res.status(401).send("Invalid Token")
        }
        return next() //Continuamos con la siguiente funcion de la ruta
    }
}