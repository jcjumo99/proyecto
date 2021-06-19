import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss'],
  providers: [HttpService]
})
export class DetalleServicioComponent implements OnInit {

  public services = {
    servicesId: "",
    title: "",
    description: "",
    clothingId: "",
    price: "",
    image: ""
  };
  public URLimage = "";

  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router, private http: HttpService) {
    this.URLimage = GLOBAL.image;
  }

  ngOnInit(): void {
    const url = this._router.url;
    const split = url.split('/');
    const ID = split[2];
    this.getServiceById(ID);
  }

  getServiceById(ID){
    this.http.getServiceById(ID).subscribe(
      data => {
        // @ts-ignore
        const services_data = data.data[0];
        this.services.servicesId = services_data.servicesId;
        this.services.title = services_data.title;
        this.services.description = services_data.description;
        this.services.clothingId = services_data.clothingId;
        this.services.price = services_data.price;
        this.services.image = services_data.image;
      }
    );
  }

  requestService(i){
    const cesta = JSON.parse(localStorage.getItem('cesta'));
    if(cesta === null){
      const cesta_array = [{ cesta: i }];
      localStorage.setItem('cesta', JSON.stringify(cesta_array));
      this._router.navigate(['/cesta']);
    }else{
      cesta.push({ cesta : i });
      localStorage.setItem('cesta', JSON.stringify(cesta));
      this._router.navigate(['/cesta']);
    }
    this.toastr.success('Agregado a la cesta');
  }

}
