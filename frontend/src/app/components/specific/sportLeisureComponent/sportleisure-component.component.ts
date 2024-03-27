import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-sportleisure-component',
  templateUrl: './sportleisure-component.component.html',
  styleUrls: ['./sportleisure-component.component.css']
})
export class SportleisureComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
    brand?:string
  } = {
    brand:"Todas las marcas",
  }

  constructor(private getServices:GetservicesService){}

  ngOnInit() {
    this.getServices.getSportLeisure().subscribe(
      res => {this.announcesArray = res},
      err => {console.log(err)}
    )
  }

  showFilters(){
    this.showFiltres = true
  }

  aplicarFiltros(){

  }
}
