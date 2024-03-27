//IMPORTACIONES
import mongoose from "mongoose"

//VARIABLES
const Schema = mongoose.Schema

//MONGOOSE SCHEMAS

//Schema para usuarios
const userSchema = new Schema({
    name: {type: String, required: true},
    date: {type:Date, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: true}
})

//Esquema para anuncioStandard
const announceStandardSchema = new Schema({
    _idUser: {type:String, required: true},
    date: {type:Date, required: true},
    title : {type: String, required: true},
    email: String,
    phone: {type: String, required: true},
    category: {type:String, required: true},
    subcategory:String,
    sex:String,
    status: {type:String, required:true},
    price: {type:String, required:true},
    description : String,
    editNum: {type:String, required:true},
    type: {type:String, required:true},
    ubication: {type: String, required:true},
    photosPaths: Array,
})

//Esquema para anuncioVehiculo
const announceVehiculoSchema = new Schema({
    _idUser: {type: String, required: true},
    date: {type:Date, required: true},
    brand : {type: String, required: true},
    model: {type: String, required: true},
    price: {type: Number, required: true},
    year: Number,
    title : {type: String, required: true},
    sellerType : {type:String, required: true},
    version: String,
    numberSeats : {type:String, required:true},
    numberDoors: {type:String, required:true},
    horsepower : {type:Number, required:true},
    carType : {type:String, required:true},
    kilometres : {type:Number, required:true},
    engine : {type:String, required:true},
    gearShift: {type:String, required:true},
    email: String,
    phone: {type:String, required:true},
    description:String,
    ubication : {type:String, required:true},
    editNum: {type:String, required:true},
    type:{type:String, required:true},
    photosPaths: Array
})

//Esquema para anuncioMoto
const announceMotoSchema = new Schema({
    _idUser: {type: String, required: true},
    date: {type:Date, required: true},
    brand : {type: String, required: true},
    model: String,
    price: {type: Number, required: true},
    year: Number,
    title : {type: String, required: true},
    sellerType : {type:String, required: true},
    version: String,
    horsepower: Number,
    motoType : {type:String, required:true},
    kilometres : {type:Number, required:true},
    email: String,
    phone: {type:String, required:true},
    description:String,
    ubication : {type:String, required:true},
    editNum: {type:String, required:true},
    type:{type:String, required:true},
    photosPaths: Array,
})

//Esquema para anuncioPropiedad
const announcePropertySchema = new Schema({
    _idUser: {type:String, required: true},
    date: {type:Date, required: true},
    title: {type:String, required: true},
    sellerType: {type:String, required: true},
    rentOrSell : {type: String, required: true},
    typeOfSpace: {type: String, required: true},
    price : {type:String, required:true},
    area : {type:String, required:true},
    status : {type:String, required: true},
    phone: {type:String, required : true},
    email: String,
    description:String,
    editNum: {type:String, required:true},
    type: {type:String, required:true},
    ubication : {type:String, required:true},
    photosPaths: Array
})

//Esquema para anuncioEmpleo
const announceServiceJobSchema = new Schema({
    _idUser: {type: String, required: true},
    date: {type:Date, required: true},
    title: {type:String, required: true},
    category : {type:String, required:true},
    price : {type:String, required:true},
    phone: {type:String, required : true},
    email: String,
    description:String,
    ubication : {type:String, required:true},
    type: {type:String, required:true},
    editNum:{type:String, required:true},
    photosPaths: Array
})

//EXPORTACIONES
export const User = mongoose.model("User", userSchema)
export const AnnouncementStandard = mongoose.model("StandardAnnouncement", announceStandardSchema)
export const AnnouncementVehicle = mongoose.model("AnnouncementVehicle", announceVehiculoSchema)
export const AnnouncementMoto = mongoose.model("AnnouncementMoto", announceMotoSchema)
export const AnnouncementProperty = mongoose.model("AnnouncementProperty", announcePropertySchema)
export const AnnouncementServiceJob = mongoose.model("AnnouncementServiceJob", announceServiceJobSchema)