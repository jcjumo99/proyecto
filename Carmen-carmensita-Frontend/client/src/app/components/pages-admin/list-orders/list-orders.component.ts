import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  public listUserServices = [];
  public listUserBack = [];
  public code_complete = "";
  public state_service = "";
  public dataService = [];
  p: number = 1;
  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.getUserServices();
  }

  getUserServices(){
    this.http.getUserServices().subscribe(
      data => {
        this.listUserServices = data.data;
        this.listUserBack = data.data;
      }
    );
  }

  getServicesCode(code){
    const dataService = { code: code };
    this.http.getCodeService(dataService).subscribe(
      data => {
        console.log(data);
        this.dataService = data.data;
      }
    );
  }

  updateServices(){
    const data = {
      code: this.code_complete,
      state: this.state_service
    }
    this.http.updateStateUserServices(data).subscribe(
      data => {
        this.toastr.success('Estado actualizado');
        this.getUserServices();
      }
    )
  }

  codeId(i){
    console.log(i);
    this.code_complete = i;
  }

  search(term: string) {
    if (term) {
        this.listUserServices = this.listUserServices.filter(x =>
            this.evaluate(x, term)
        );
    } else {
        this.listUserServices = this.listUserBack;
    }
}

evaluate(x, term) {
    if (!x.code) {
        x.code = "";
    }
    return (
        x.code.trim().toLowerCase().includes(term.trim().toLowerCase()) 
    )
}

}
