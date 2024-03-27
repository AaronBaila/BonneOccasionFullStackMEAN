import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentservicesService {

  private itsEdit = new BehaviorSubject<boolean>(false);
  private announce = new BehaviorSubject<any>({});
  itsEditActual = this.itsEdit.asObservable();
  announceActual = this.announce.asObservable();

  cambiarDatos(itsEditNuevo: boolean, announceNuevo:any) {
    console.log("DENTRO DE CAMBIAR DATO SERVICIO")
    this.itsEdit.next(itsEditNuevo);
    this.announce.next(announceNuevo);
  }
}
