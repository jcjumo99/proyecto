import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [HttpService]
})
export class ServiciosComponent implements OnInit {

  public listService = [];
  public URLimage = "";

  constructor(private http: HttpService) {
    this.URLimage = GLOBAL.image;
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.http.getService().subscribe(
      data => {
        this.listService = data.data;
      }
    );
  }

}
