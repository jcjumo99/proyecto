import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { DetalleServicioComponent } from './components/pages/detalle-servicio/detalle-servicio.component';
import { MiPerfilComponent } from './components/pages/mi-perfil/mi-perfil.component';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ListOrdersComponent } from './components/pages-admin/list-orders/list-orders.component';
import { ListServicesComponent } from './components/pages-admin/list-services/list-services.component';
import { ListDeliveryComponent } from './components/pages-admin/list-delivery/list-delivery.component';
import { ListCustomersComponent } from './components/pages-admin/list-customers/list-customers.component';
import { CestaComponent } from './components/pages/cesta/cesta.component';


// /* Privileges */
// import { Privilege } from './services/privilege.service';

// /* Guards */
// import { UserGuard } from './guards/user.guard';
// import { from } from 'rxjs';


const routes: Routes = [
  { 
    path: 'landing', 
    component: LandingComponent, 
    // canActivate:[Privilege],
    // canLoad: [ UserGuard ]
  
  },
  { path: 'servicios', component: ServiciosComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'mi-perfil', component: MiPerfilComponent},
  { path: 'login', component: LoginComponent},
  { path: 'listar-ordenes', component: ListOrdersComponent},
  { path: 'listar-delivery', component: ListDeliveryComponent},
  { path: 'listar-servicios', component: ListServicesComponent},
  { path: 'listar-clientes', component: ListCustomersComponent},
  { path: 'cesta', component: CestaComponent},
  { path: 'detalle-servicio/:id', component: DetalleServicioComponent},
  // { path: 'detalle-servicio/:id', component: DetalleServicioComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'landing' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
