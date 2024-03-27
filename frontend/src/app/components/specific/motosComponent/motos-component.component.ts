import { Component } from '@angular/core'
import { GetfiltersservicesService } from 'src/app/services/getFiltersServices/getfiltersservices.service'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-motos-component',
  templateUrl: './motos-component.component.html',
  styleUrls: ['./motos-component.component.css']
})
export class MotosComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
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
  } = {
    brand:"All Brands",
    model:"",
    minPrice:"",
    maxPrice:"",
    minYear:"",
    maxYear:"",
    motoType:"All Moto Types",
    minKilometres:"",
    maxKilometres:"",
    minHorsepower:"",
    maxHorsepower:"",
    ubication:"All Ubications",
    sellerType:"All seller types",
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

  aplicarFiltros(brand:HTMLSelectElement, model:HTMLInputElement, minPrice:HTMLInputElement, maxPrice:HTMLInputElement, minYear:HTMLInputElement, maxYear:HTMLInputElement, motoType:HTMLSelectElement, minHorsepower:HTMLInputElement, maxHorsepower:HTMLInputElement, minKilometres:HTMLInputElement, maxKilometres:HTMLInputElement, sellerType:HTMLSelectElement, ubication:HTMLSelectElement){
    this.filters.brand = brand.value
    this.filters.model = model.value
    this.filters.minPrice = minPrice.value
    this.filters.maxPrice = maxPrice.value
    this.filters.minYear = minYear.value
    this.filters.maxYear = maxYear.value
    this.filters.motoType = motoType.value
    this.filters.minKilometres = minKilometres.value
    this.filters.maxKilometres = maxKilometres.value
    this.filters.minHorsepower = minHorsepower.value
    this.filters.maxHorsepower = maxHorsepower.value
    this.filters.ubication = ubication.value
    this.filters.sellerType = sellerType.value

    if(this.filters.brand == "All Brands"){
      delete this.filters.brand
    }
    if(this.filters.model == ""){
      delete this.filters.model
    }
    if(this.filters.minPrice == ""){
      delete this.filters.minPrice
    }
    if(this.filters.maxPrice == ""){
      delete this.filters.maxPrice
    }
    if(this.filters.minYear == ""){
      delete this.filters.minYear
    }
    if(this.filters.maxYear == ""){
      delete this.filters.maxYear
    }
    if(this.filters.motoType == "All Moto Types"){
      delete this.filters.motoType
    }
    if(this.filters.minKilometres == ""){
      delete this.filters.minKilometres
    }
    if(this.filters.maxKilometres == ""){
      delete this.filters.maxKilometres
    }
    if(this.filters.minHorsepower == ""){
      delete this.filters.minHorsepower
    }
    if(this.filters.maxHorsepower == ""){
      delete this.filters.maxHorsepower
    }
    if(this.filters.sellerType == "All Seller Types"){
      delete this.filters.sellerType
    }
    if(this.filters.ubication == "All Ubications"){
      delete this.filters.ubication
    }

    this.getFiltersServices.getMotorAccesoriesFilters(this.filters).subscribe(
      res => {this.announcesArray = res},
      err => {console.log(err)}
    )

  }

}
