import { Component, ViewEncapsulation, HostListener} from '@angular/core'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  //encapsulation: ViewEncapsulation.None,
  encapsulation: ViewEncapsulation.Emulated, // Este es el valor por defecto, pero asegúrate de no cambiarlo
})
export class WelcomeComponent {

  //Codigo para mostrar el navbar cuando haces scroll
  isNavbarVisible = false

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.isNavbarVisible=true
    console.log(this.isNavbarVisible)
  }


}
