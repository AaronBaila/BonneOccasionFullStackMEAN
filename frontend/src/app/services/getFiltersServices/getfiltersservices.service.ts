// * IMPORTS * 
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetfiltersservicesService {

  constructor(private http:HttpClient) { } //Inicializamos las clases a utilizar (HttpClient para peticiones al servidor / router para redireccionar la pagina a otros componentes)

  // ******************************** GET FILTERS SERVICES ********************************

  // **** Servicio para aplicar filtros a el componente de motor y accesorios **** 
  getMotorAccesoriesFilters(filters:{
      brand?:string,
      ubication?:string,
      minPrice?:string,
      maxPrice?:string,
      minYear?:string,
      maxYear?:string,
      minKilometres?:string,
      maxKilometres?:string,
      minHorsepower?:string,
      maxHorsepower?:string,
      sellerType?:string,
      minMatricu?:string,
      maxMatricu?:string,
      numberSeats?:string,
      numberDoors?:string,
      carType?:string,
      engine?:string,
      gearShift?:string,
    }
  ){
    let getMotorAccesoriesURI = "http://localhost:3000/motoraccesories" //URL peticiones Backend
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()
    //You can now use the non-null assertion operator that is here exactly for your use case. It tells TypeScript that even though something looks like it could be null, it can trust you that it's not
    fd.append("itsFilter", "true")
    fd.append("brand", filters.brand!)
    fd.append("ubication", filters.ubication!)
    fd.append("minPrice", filters.minPrice!)
    fd.append("maxPrice", filters.maxPrice!)
    fd.append("minYear", filters.minYear!)
    fd.append("maxYear", filters.maxYear!)
    fd.append("minKilometres", filters.minKilometres!)
    fd.append("maxKilometres", filters.maxKilometres!)
    fd.append("sellerType", filters.sellerType!)

    fd.append("minMatricu", filters.minMatricu!)
    fd.append("maxMatricu", filters.maxMatricu!)
    fd.append("minHorsepower", filters.minHorsepower!)
    fd.append("maxHorsepower", filters.maxHorsepower!)
    fd.append("numberSeats", filters.numberSeats!)
    fd.append("numberDoors", filters.numberDoors!)
    fd.append("carType", filters.carType!)
    fd.append("engine", filters.engine!)
    fd.append("gearShift", filters.gearShift!)
  
    return this.http.post(getMotorAccesoriesURI, fd)
  }

  // **** Servicio para aplicar filtros a el componente de motos **** 
  getMotosFilters(filters:{
      brand?:string,
      model?:string,
      minPrice?:string,
      maxPrice?:string,
      minYear?:string,
      maxYear?:string,
      motoType?:string,
      minKilometres?:string,
      maxKilometres?:string,
      minHorsepower?:string,
      maxHorsepower?:string,
      ubication?:string,
      sellerType?:string,
    }
  ){
    let getMotosURI = "http://localhost:3000/motos" //URL peticiones Backend
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()
    //You can now use the non-null assertion operator that is here exactly for your use case. It tells TypeScript that even though something looks like it could be null, it can trust you that it's not
    fd.append("itsFilter", "true")
    fd.append("brand", filters.brand!)
    fd.append("model", filters.model!)
    fd.append("minPrice", filters.minPrice!)
    fd.append("maxPrice", filters.maxPrice!)
    fd.append("minYear", filters.minYear!)
    fd.append("maxYear", filters.maxYear!)
    fd.append("motoType", filters.motoType!)
    fd.append("minKilometres", filters.minKilometres!)
    fd.append("maxKilometres", filters.maxKilometres!)
    fd.append("minHorsepower", filters.minHorsepower!)
    fd.append("maxHorsepower", filters.maxHorsepower!)
    fd.append("ubication", filters.ubication!)
    fd.append("sellerType", filters.sellerType!)

    return this.http.post(getMotosURI, fd)
  }

}
