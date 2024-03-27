//UTILIZO ESTE DOCUMENTO PARA COMPROBAR SI ESTA LOGGEADO EL USUARIO Y PODERLO USAR EN APP-ROUTING.MODULE.TS
import {inject} from '@angular/core'
import { Router } from '@angular/router'
import { AuthservicesService } from './services/authServices/authservices.service'

//Funcion que se va a utilizar en app-routing.module.ts y asi comprobar si el usuario esta loggeado
export const authGuard = () => {
  //Inicializamos las variables (Router para redireccionar y AuthService para usar mis servicios)
  const authService = inject(AuthservicesService);
  const router = inject(Router);

  if (authService.isLoggedService()) { //Comprobamos si el usuario esta loggeado haciendo uso del servicio
    return true;
  }

  // En caso de no estar loggeado, redireccionamas a la pagina de login
  return router.parseUrl('/login');
};