import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-fashion-component',
  templateUrl: './fashion-component.component.html',
  styleUrls: ['./fashion-component.component.css']
})
export class FashionComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
    brand?:string
  } = {
    brand:"Todas las marcas",
  }

  constructor(private getServices:GetservicesService){}

  ngOnInit() {
    this.getServices.getFashion().subscribe(
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
