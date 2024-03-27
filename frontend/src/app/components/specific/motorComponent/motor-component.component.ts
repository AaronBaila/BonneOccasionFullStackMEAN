import { Component } from '@angular/core'
import { GetfiltersservicesService } from 'src/app/services/getFiltersServices/getfiltersservices.service'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-motor-component',
  templateUrl: './motor-component.component.html',
  styleUrls: ['./motor-component.component.css']
})
export class MotorComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
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
    numberSeats?:string,
    numberDoors?:string,
    carType?:string,
    engine?:string,
    gearShift?:string,
  } = {
    brand:"Todas las marcas",
    ubication:"Todas las ubicaciones",
    minPrice:"",
    maxPrice:"",
    minYear:"",
    maxYear:"",
    minKilometres:"",
    maxKilometres:"",
    minHorsepower:"",
    maxHorsepower:"",
    sellerType:"Select a seller type",
    numberSeats:"",
    numberDoors:"",
    carType:"Select a Car Type",
    engine:"Select engine type",
    gearShift:"Select the gear shift"
  }

  constructor(private getServices:GetservicesService, private getFiltersServices:GetfiltersservicesService){}

  ngOnInit() {
    this.getServices.getMotorAccesories().subscribe(
      res => {this.announcesArray = res},
      err => {console.log(err)}
    )
  }

  showFilters(){
    this.showFiltres = true
  }

  hiddeFilters(){
    this.showFiltres = false
  }

  resetFilters(){
    window.location.reload()
  }

  aplicarFiltros(brand:HTMLSelectElement, ubication:HTMLSelectElement, minPrice:HTMLInputElement, maxPrice:HTMLInputElement, minYear:HTMLInputElement, maxYear:HTMLInputElement, minKilometres:HTMLInputElement, maxKilometres:HTMLInputElement, minHorsepower:HTMLInputElement, maxHorsepower:HTMLInputElement, sellerType:HTMLSelectElement, numberSeats:HTMLInputElement, numberDoors:HTMLInputElement, carType:HTMLSelectElement, engine:HTMLSelectElement, gearShift:HTMLSelectElement){
    this.filters.brand = brand.value
    this.filters.ubication = ubication.value
    this.filters.minPrice = minPrice.value
    this.filters.maxPrice = maxPrice.value
    this.filters.minYear = minYear.value
    this.filters.maxYear = maxYear.value
    this.filters.minKilometres = minKilometres.value
    this.filters.maxKilometres = maxKilometres.value
    this.filters.minHorsepower = minHorsepower.value
    this.filters.maxHorsepower = maxHorsepower.value
    this.filters.sellerType = sellerType.value

    this.filters.numberSeats = numberSeats.value
    this.filters.numberDoors = numberDoors.value
    this.filters.carType = carType.value
    this.filters.engine = engine.value
    this.filters.gearShift = gearShift.value

    if(this.filters.brand == "Todas las marcas"){
      delete this.filters.brand
    }
    if(this.filters.ubication == "Todas las ubicaciones"){
      delete this.filters.ubication
    }
    if(this.filters.minPrice == "" && this.filters.maxPrice == ""){
      delete this.filters.minPrice
      delete this.filters.maxPrice
    }
    if(this.filters.minYear == "" && this.filters.maxYear == ""){
      delete this.filters.minYear
      delete this.filters.maxYear
    }
    if(this.filters.minKilometres == "" && this.filters.maxKilometres == ""){
      delete this.filters.minKilometres
      delete this.filters.maxKilometres
    }
    if(this.filters.sellerType == "Todos los vendedores"){
      delete this.filters.sellerType
    }

    if(this.filters.numberSeats == ""){
      delete this.filters.numberSeats
    }
    if(this.filters.numberDoors == ""){
      delete this.filters.numberDoors
    }
    if(this.filters.carType == "Select a Car Type"){
      delete this.filters.carType
    }
    if(this.filters.engine == "Select engine type"){
      delete this.filters.engine
    }
    if(this.filters.gearShift == "Select the gear shift"){
      delete this.filters.gearShift
    }

    this.getFiltersServices.getMotorAccesoriesFilters(this.filters).subscribe(
      res => {this.announcesArray = res},
      err => {console.log(err)}
    )

  }
}
