import { Component } from '@angular/core'

@Component({
  selector: 'app-postannounce',
  templateUrl: './postannounce.component.html',
  styleUrls: ['./postannounce.component.css']
})
export class PostannounceComponent {
  //Variables para mostrar componentes
  showVehiculo = false
  showMoto = false
  showStandard = false
  showProperty = false
  showService = false
  showJob = false

  showVehiculoCompo(){
    this.showVehiculo = true
    this.showStandard = false
    this.showProperty = false
    this.showService = false
    this.showJob = false
    this.showMoto = false
  }

  showMotoCompo(){
    this.showMoto = true
    this.showVehiculo = false
    this.showStandard = false
    this.showProperty = false
    this.showService = false
    this.showJob = false
  }

  showStandardCompo(){
    this.showStandard = true
    this.showVehiculo = false
    this.showProperty = false
    this.showService = false
    this.showJob = false
    this.showMoto = false
  }

  showPropertyCompo(){
    this.showProperty = true
    this.showStandard = false
    this.showVehiculo = false
    this.showService = false
    this.showJob = false
    this.showMoto = false
  }

  showServiceCompo(){
    this.showService = true
    this.showProperty = false
    this.showStandard = false
    this.showVehiculo = false
    this.showJob = false
    this.showMoto = false
  }

  showJobCompo(){
    this.showJob = true
    this.showService = false
    this.showProperty = false
    this.showStandard = false
    this.showVehiculo = false
    this.showMoto = false
  }
  
}
