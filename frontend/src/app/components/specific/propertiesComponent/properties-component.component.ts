import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-properties-component',
  templateUrl: './properties-component.component.html',
  styleUrls: ['./properties-component.component.css']
})
export class PropertiesComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
    brand?:string
  } = {
    brand:"Todas las marcas",
  }

  constructor(private getServices:GetservicesService){}

  ngOnInit() {
    this.getServices.getProperties().subscribe(
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
