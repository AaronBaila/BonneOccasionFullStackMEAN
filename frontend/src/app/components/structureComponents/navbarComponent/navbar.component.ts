import { Component} from '@angular/core';
import { AuthservicesService } from 'src/app/services/authServices/authservices.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService:AuthservicesService){} //Inicializo el servicio para usarlo en el HTML y asi cambiar los botones dependiendo si esta loggeado o no

}
