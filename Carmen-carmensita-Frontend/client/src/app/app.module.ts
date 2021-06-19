import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { DetalleServicioComponent } from './components/pages/detalle-servicio/detalle-servicio.component';
import { OrdenServicioComponent } from './components/pages/orden-servicio/orden-servicio.component';
import { MiPerfilComponent } from './components/pages/mi-perfil/mi-perfil.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';
import { ListServicesComponent } from './components/pages-admin/list-services/list-services.component';
import { ListCustomersComponent } from './components/pages-admin/list-customers/list-customers.component';
import { ListOrdersComponent } from './components/pages-admin/list-orders/list-orders.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarAdmComponent } from './components/shared/navbar-adm/navbar-adm.component';
import { ListDeliveryComponent } from './components/pages-admin/list-delivery/list-delivery.component';
import { CestaComponent } from './components/pages/cesta/cesta.component';


const routes: Routes = [
  { path: 'Landing', component: LandingComponent },
  { path: 'Servicios', component: ServiciosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'Landing' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    ServiciosComponent,
    DetalleServicioComponent,
    OrdenServicioComponent,
    MiPerfilComponent,
    FooterComponent,
    NosotrosComponent,
    ListServicesComponent,
    ListCustomersComponent,
    ListOrdersComponent,
    SidebarComponent,
    NavbarAdmComponent,
    ListDeliveryComponent,
    CestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
