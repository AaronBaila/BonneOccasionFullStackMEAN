import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authComponents/loginComponent/login.component';
import { SignupComponent } from './components/authComponents/signupComponent/signup.component';
import { PostannounceComponent } from './components/general/postannounceComponent/postannounce.component';
import { GetannouncesComponent } from './components/general/getannouncesComponent/getannounces.component';
import { authGuard } from './auth.guard'; //Funcion que nos permite verificar si un usuario esta logeado y asi darle acceso a alguna ruta
import { WelcomeComponent } from './components/structureComponents/welcomeComponent/welcome.component';
import {MotorComponentComponent} from './components/specific/motorComponent/motor-component.component'
import {MotosComponentComponent} from './components/specific/motosComponent/motos-component.component'
import {PropertiesComponentComponent} from './components/specific/propertiesComponent/properties-component.component'
import { GetannounceComponent } from './components/general/getannounceComponent/getannounce.component';
import {TvaudiophotoComponentComponent} from './components/specific/tvAudioPhotoComponent/tvaudiophoto-component.component'
import { FashionComponentComponent } from './components/specific/fashionComponent/fashion-component.component';
import { ComputingelectronicsComponentComponent } from './components/specific/computingElectronicsComponent/computingelectronics-component.component';
import { SmartphonestelephonyComponentComponent } from './components/specific/smartphonesTelephonyComponent/smartphonestelephony-component.component';
import { SportleisureComponentComponent } from './components/specific/sportLeisureComponent/sportleisure-component.component';
import { BicyclesComponentComponent } from './components/specific/bicyclesComponent/bicycles-component.component';
import { ConsolesvideogamesComponentComponent } from './components/specific/consolesVideogamesComponent/consolesvideogames-component.component';
import { HomegardenComponentComponent } from './components/specific/homeGardenComponent/homegarden-component.component';
import { HomeappliancesComponentComponent } from './components/specific/homeAppliancesComponent/homeappliances-component.component';
import { CinemabooksmusicComponentComponent } from './components/specific/cinemaBooksMusicComponent/cinemabooksmusic-component.component';
import { ChildrenComponentComponent } from './components/specific/childrenComponent/children-component.component';
import { JobComponentComponent } from './components/specific/jobComponent/job-component.component';
import { ServicesComponentComponent } from './components/specific/servicesComponent/services-component.component';
import { ConstructionComponentComponent } from './components/specific/constructionComponent/construction-component.component';
import { IndustryagricultureComponentComponent } from './components/specific/industryAgricultureComponent/industryagriculture-component.component';
import { OthersComponentComponent } from './components/specific/othersComponent/others-component.component';
import { MypostsComponent } from './components/profileComponents/myPostsComponent/myposts.component';
import { ProfileconfigComponent } from './components/profileComponents/profileconfigComponent/profileconfig.component';
import { AnnounceempleoComponent } from './components/announceComponents/announceempleo/announceempleo.component';
import { AnnounceservicioComponent } from './components/announceComponents/announceservicio/announceservicio.component';
import { AnnouncemotoComponent } from './components/announceComponents/announcemoto/announcemoto.component';
import { AnnouncepropiedadComponent } from './components/announceComponents/announcepropiedad/announcepropiedad.component';
import { AnnouncestandardComponent } from './components/announceComponents/announcestandard/announcestandard.component';
import { AnnouncevehiculoComponent } from './components/announceComponents/announcevehiculo/announcevehiculo.component';

//Enrutador, nos permite poder acceder a los componentes mediante endpoints
const routes: Routes = [
  {
    path:"",
    redirectTo:"/welcome",
    pathMatch:"full",
    },
  {
    path:"welcome",
    component:WelcomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"myposts",
    component:MypostsComponent,
    canActivate:[authGuard] //Usamos la funcion creada en auth.guard.ts que nos permite comprobar si un usuario esta loggeado y asi ganar acceso a la ruta
  },
  {
    path:"editprofile",
    component:ProfileconfigComponent,
    canActivate:[authGuard] //Usamos la funcion creada en auth.guard.ts que nos permite comprobar si un usuario esta loggeado y asi ganar acceso a la ruta
  },
  {
    path:"postannounce",
    component:PostannounceComponent,
  },
  {
    path:"getannounces",
    component:GetannouncesComponent
  },
  {
    path:"getannounce/:id",
    component:GetannounceComponent
  },
  {
    path:"postJobs",
    component:AnnounceempleoComponent
  },
  {
    path:"postServices",
    component:AnnounceservicioComponent
  },
  {
    path:"postMotos",
    component:AnnouncemotoComponent
  },
  {
    path:"postProperties",
    component:AnnouncepropiedadComponent
  },
  {
    path:"postStandard",
    component:AnnouncestandardComponent
  },
  {
    path:"postVehicle",
    component:AnnouncevehiculoComponent
  },
  {
    path:"motoraccesories",
    component:MotorComponentComponent
  },
  {
    path:"motos",
    component:MotosComponentComponent
  },
  {
    path:"properties",
    component:PropertiesComponentComponent
  },
  {
    path:"fashion",
    component:FashionComponentComponent
  },
  {
    path:"tvaudiophoto",
    component:TvaudiophotoComponentComponent
  },
  {
    path:"computingelectronics",
    component:ComputingelectronicsComponentComponent
  },
  {
    path:"smartphonestelephony",
    component:SmartphonestelephonyComponentComponent
  },
  {
    path:"sportleisure",
    component:SportleisureComponentComponent
  },
  {
    path:"bicycles",
    component:BicyclesComponentComponent
  },
  {
    path:"consolesvideogames",
    component:ConsolesvideogamesComponentComponent
  },
  {
    path:"homegarden",
    component:HomegardenComponentComponent
  },
  {
    path:"homeappliances",
    component:HomeappliancesComponentComponent
  },
  {
    path:"cinemabooksmusic",
    component:CinemabooksmusicComponentComponent
  },
  {
    path:"children",
    component:ChildrenComponentComponent
  },
  {
    path:"jobs",
    component:JobComponentComponent
  },
  {
    path:"services",
    component:ServicesComponentComponent
  },
  {
    path:"construction",
    component:ConstructionComponentComponent
  },
  {
    path:"industryagriculture",
    component:IndustryagricultureComponentComponent
  },
  {
    path:"others",
    component:OthersComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
