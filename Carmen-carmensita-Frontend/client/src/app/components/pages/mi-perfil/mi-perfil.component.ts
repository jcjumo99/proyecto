import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  providers: [HttpService]
})
export class MiPerfilComponent implements OnInit {

  public users = {
    userId : 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  };
  public userId = 0;
  public listOrden = [];
  constructor( private http: HttpService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.validateSession();
    setTimeout(() => {
      this.getOrdenes();
    }, 300);
  }

  validateSession() {
    const users = JSON.parse(localStorage.getItem('users'));
    if(users != null){
      const userId = users.userId;
      this.userId = parseInt(userId);
      this.http.getUser(userId).subscribe(
        data => {
          const data_user = data.data[0];
          this.users.userId = data_user.userId;
          this.users.first_name = data_user.first_name;
          this.users.last_name = data_user.last_name;
          this.users.email = data_user.email;
          this.users.phone = data_user.phone;
        }
      );
    }
  }

  updateUser(){
    this.http.updateUser(this.users).subscribe(
      data => {
        this.toastr.success('Usuario actualizado');
      }
    );
  }

  getOrdenes(){
    this.http.getOrdenes(this.userId).subscribe(
      data => {
        console.log(data.data);
        this.listOrden = data.data;
      }
    );
  }

}
