import { Component } from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-cinemabooksmusic-component',
  templateUrl: './cinemabooksmusic-component.component.html',
  styleUrls: ['./cinemabooksmusic-component.component.css']
})
export class CinemabooksmusicComponentComponent {
  announcesArray:any
  showFiltres = false
  filters : {
    brand?:string
  } = {
    brand:"Todas las marcas",
  }

  constructor(private getServices:GetservicesService){}

  ngOnInit() {
    this.getServices.getCinemaBooksMusic().subscribe(
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
