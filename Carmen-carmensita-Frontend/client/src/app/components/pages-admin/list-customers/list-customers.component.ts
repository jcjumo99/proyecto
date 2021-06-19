import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { GLOBAL } from '../../../services/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [HttpService]
})
export class ListCustomersComponent implements OnInit {

  public listUsers = [];
  public listUsersBack = [];
  p: number = 1;
  public user = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  };

  public userss = {
    userId : 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  };
  constructor(private http: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.http.getUsers().subscribe(
      data => {
        this.listUsers = data.data;
        this.listUsersBack = data.data;
      }
    );
  }

  editUser(i){
    this.http.getUser(i).subscribe(
      data => {
        const result = data.data[0];
        this.userss.userId = result.userId;
        this.userss.first_name = result.first_name;
        this.userss.last_name = result.last_name;
        this.userss.email = result.email;
        this.userss.phone = result.phone;
      }
    );
  }

  updateUser(){
    this.http.updateUser(this.userss).subscribe(
      data => {
        this.toastr.success('Usuario actualizado');
        this.getUsers();
      }
    );
  }

  deleteUser(i){
    this.http.deleteUser(i).subscribe(
      data => {
        this.toastr.success('Usuario eliminado');
        this.getUsers();
      }
    );
  }
  
  saveUser(){
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const email = this.user.email;
    const phone = this.user.phone;
    const password = this.user.password;
    const confirm_password = this.user.confirm_password;
    if(first_name === "" || last_name === "" || email === "" || phone === "" || password === "" || confirm_password === ""){
      this.toastr.info('Completa los campos');
    }else{
      if(password === confirm_password){
        this.http.saveUser(this.user).subscribe(
          data => {
            this.clean();
            this.toastr.success('Cliente creado');
            this.getUsers();
          },
          error => {
            this.toastr.error('Hubo un error');
          }
        );
      }else{
        this.toastr.info('Las contraseñas no coinciden');
      }
    }
  }

  clean(){
    this.user.first_name = "";
    this.user.last_name = "";
    this.user.email = "";
    this.user.phone = "";
    this.user.password = "";
    this.user.confirm_password = "";
  }


  search(term: string) {
    if (term) {
        this.listUsers = this.listUsers.filter(x =>
            this.evaluate(x, term)
        );
    } else {
        this.listUsers = this.listUsersBack;
    }
}

evaluate(x, term) {
    if (!x.first_name) {
        x.first_name = "";
    }
    return (
        x.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) 
    )
}
}
