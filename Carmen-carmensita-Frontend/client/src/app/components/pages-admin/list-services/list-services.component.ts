import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  providers: [HttpService]
})
export class ListServicesComponent implements OnInit {

  public filesToUplad: Array<File>;
  public filesToUpladEdit: Array<File>;
  public services = {
    title: '',
    description: '',
    price: '',
    clothingId: ''
  };
  public servicess = {
    servicesId: 0,
    title: '',
    description: '',
    price: '',
    clothingId: ''
  };
  public servicesId = 0;
  public listServices = [];
  public listServicesBack = [];
  public URL = "";
  p: number = 1;
  public URLimage = "";

  constructor(private http: HttpService, private toastr: ToastrService) { this.URL = GLOBAL.url; this.URLimage = GLOBAL.image; }

  ngOnInit(): void {
    this.getServices();
  }

  ChangeImage(fileInput: any) {
    this.filesToUplad = <Array<File>>fileInput.target.files;
  }
  ChangeImageEdit(fileInput: any) {
    this.filesToUpladEdit = <Array<File>>fileInput.target.files;
  }

  saveService(){
    this.http.newServices(this.URL, this.filesToUplad, 'image',this.services.title, this.services.description, this.services.price, this.services.clothingId).then(
      data => {
        this.toastr.success('Servicio creado satisfactoriamente');
        this.clean();
        this.getServices();
      }
    ).catch(
      error => {
        this.toastr.error('Hubo un error al momento de registrar');
      }
    );
  }

  editService(i){
    this.servicesId = i;
    this.http.getServiceById(i).subscribe(
      data => {
        //console.log(data.data);
        const result = data.data[0];
        this.servicess.servicesId = this.servicesId;
        this.servicess.title = result.title;
        this.servicess.description = result.description;
        this.servicess.price = result.price;
        this.servicess.clothingId = result.clothingId;
      }
    );
  }

  updateService(){
    console.log(this.filesToUpladEdit);
    if(this.filesToUpladEdit === undefined){
      this.http.updateServicess(this.servicess).subscribe(
        data => {
          this.toastr.success('Servicio actualizado satisfactoriamente');
          this.getServices();
        }
      )
    }else{
      this.http.updateServices(this.URL, this.filesToUpladEdit, 'image', this.servicesId, this.servicess.title, this.servicess.description, this.servicess.price, this.servicess.clothingId).then(
        data => {
          this.toastr.success('Servicio actualizado satisfactoriamente');
          //this.clean();
          this.getServices();
        }
      );
    }
  }

  delete(i){
    this.http.deleteService(i).subscribe(
      data => {
        this.toastr.success('Servicio eliminado');
        this.getServices();
      }
    );
  }

  getServices(){
    this.http.getService().subscribe(
      data => {
        this.listServices = data.data;
        this.listServicesBack = data.data;
      }
    );
  }

  clean(){
    this.services.title = "";
    this.services.description = "";
    this.services.price = "";
    this.services.clothingId = "";
  }

    search(term: string) {
      if (term) {
          this.listServices = this.listServices.filter(x =>
              this.evaluate(x, term)
          );
      } else {
          this.listServices = this.listServicesBack;
      }
  }

  evaluate(x, term) {
      if (!x.title) {
          x.title = "";
      }
      return (
          x.title.trim().toLowerCase().includes(term.trim().toLowerCase()) 
      )
  }

}
