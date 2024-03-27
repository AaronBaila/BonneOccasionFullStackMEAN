import { Component} from '@angular/core'
import { GetservicesService } from 'src/app/services/getServices/getservices.service'

@Component({
  selector: 'app-getannounces',
  templateUrl: './getannounces.component.html',
  styleUrls: ['./getannounces.component.css']
})
export class GetannouncesComponent {

  //VARIABLES
  announcesArray:any //Variable que almacena los anuncios obtenidos y asi poder mostrarlos en el frontend
  arrayAuxShowMore:any
  token:any

  constructor(private getServices:GetservicesService){}

  //Funcion que se va a ejecutar nada mas cargar el componente
  ngOnInit() { //En este caso le indico que nada mas cargue el componente, ejecute la funcion getAnnounces()
    this.getServices.getAnnounces(this.announcesArray).subscribe(
      res =>{
        console.log(res)
        this.announcesArray = res
      },
      err =>{console.log(err)}
    )
  }

  showMore(){
    this.getServices.getAnnounces(this.announcesArray).subscribe(
      res =>{
        this.arrayAuxShowMore = res
        for(let i = 0 ; i<=this.arrayAuxShowMore.length-1; i++){
          this.announcesArray.push(this.arrayAuxShowMore[i])
        }
      },
      err =>{console.log(err)}
    )
  }
}
