import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authComponents/loginComponent/login.component';
import { SignupComponent } from './components/authComponents/signupComponent/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostannounceComponent } from './components/general/postannounceComponent/postannounce.component';
import { GetannouncesComponent } from './components/general/getannouncesComponent/getannounces.component';
import { NavbarComponent } from './components/structureComponents/navbarComponent/navbar.component';
import { WelcomeComponent } from './components/structureComponents/welcomeComponent/welcome.component';
import { AnnouncevehiculoComponent } from './components/announceComponents/announcevehiculo/announcevehiculo.component';
import { AnnouncestandardComponent } from './components/announceComponents/announcestandard/announcestandard.component';
import { GetannounceComponent } from './components/general/getannounceComponent/getannounce.component';
import { AnnouncepropiedadComponent } from './components/announceComponents/announcepropiedad/announcepropiedad.component';
import { AnnounceservicioComponent } from './components/announceComponents/announceservicio/announceservicio.component';
import { AnnounceempleoComponent } from './components/announceComponents/announceempleo/announceempleo.component';
import { AnnouncemotoComponent } from './components/announceComponents/announcemoto/announcemoto.component';
import { MotorComponentComponent } from './components/specific/motorComponent/motor-component.component';
import { PropertiesComponentComponent } from './components/specific/propertiesComponent/properties-component.component';
import { FashionComponentComponent } from './components/specific/fashionComponent/fashion-component.component';
import { TvaudiophotoComponentComponent } from './components/specific/tvAudioPhotoComponent/tvaudiophoto-component.component';
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
import { MotosComponentComponent } from './components/specific/motosComponent/motos-component.component';
import { MypostsComponent } from './components/profileComponents/myPostsComponent/myposts.component';
import { ProfileconfigComponent } from './components/profileComponents/profileconfigComponent/profileconfig.component';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesCarouselComponent } from './components/structureComponents/categories-carousel/categories-carousel.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostannounceComponent,
    GetannouncesComponent,
    NavbarComponent,
    WelcomeComponent,
    AnnouncevehiculoComponent,
    AnnouncestandardComponent,
    GetannounceComponent,
    AnnouncepropiedadComponent,
    AnnounceservicioComponent,
    AnnounceempleoComponent,
    AnnouncemotoComponent,
    MotorComponentComponent,
    PropertiesComponentComponent,
    FashionComponentComponent,
    TvaudiophotoComponentComponent,
    ComputingelectronicsComponentComponent,
    SmartphonestelephonyComponentComponent,
    SportleisureComponentComponent,
    BicyclesComponentComponent,
    ConsolesvideogamesComponentComponent,
    HomegardenComponentComponent,
    HomeappliancesComponentComponent,
    CinemabooksmusicComponentComponent,
    ChildrenComponentComponent,
    JobComponentComponent,
    ServicesComponentComponent,
    ConstructionComponentComponent,
    IndustryagricultureComponentComponent,
    OthersComponentComponent,
    MotosComponentComponent,
    MypostsComponent,
    ProfileconfigComponent,
    CategoriesCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    NgbModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
