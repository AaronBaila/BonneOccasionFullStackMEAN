import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-consolesvideogames-component',
  templateUrl: './consolesvideogames-component.component.html',
  styleUrls: ['./consolesvideogames-component.component.css']
})
export class ConsolesvideogamesComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
    brand?:string
  } = {
    brand:"Todas las marcas",
  }

  constructor(private getServices:GetservicesService){}

  ngOnInit() {
    this.getServices.getConsolesVideogames().subscribe(
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
