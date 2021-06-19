import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [HttpService]
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;

  public user = {
    email : "",
    password : ""
  };

  public userRegister = {
    email: "",
    password : "",
    confirm_password : ""
  };

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public session = false;
  
  constructor(private http: HttpService, private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.validateSession();
  }

  logout(){
    localStorage.removeItem('users');
    localStorage.removeItem('profile');
    window.location.reload();
  }

  validateSession(){
    const user = JSON.parse(localStorage.getItem('users'));
    if(user === null){
      this.session = false;
    }else{
      this.session = true;
    }
  }

  signin(){
    const email = this.user.email;
    const password = this.user.password;
    if(email === "" || password === "") {
      this.toastr.info('Complete los campos');
    }else{
      this.http.signin(this.user).subscribe(
        data =>{
          if(data.status === "success"){
            if(data.data.profileId === 1){
              localStorage.setItem('users', JSON.stringify(data.data));
              localStorage.setItem('profile', JSON.stringify('Administrador'));
              window.location.href = 'listar-ordenes';
            }else{
              localStorage.setItem('users', JSON.stringify(data.data));
              localStorage.setItem('profile', JSON.stringify('Usuario'));
              window.location.reload();
            }
          }else{
            this.toastr.error('Credenciales incorrectas');
          }
        }
      );
    }
  }

  signup(){
    const email = this.userRegister.email;
    const password = this.userRegister.password;
    const confirm_password = this.userRegister.confirm_password;
    if(email === "" || password === "" || confirm_password === "") {
      this.toastr.info('Complete los campos');
    }else{
      if( password === confirm_password ){
        this.http.signup(this.userRegister).subscribe(
          data =>{
            if(data.status === "success"){
              this.toastr.success('Registro exitoso');
              this.clean();
            }else{
              this.toastr.error('Hubo un error');
            }
          }
        );
      }else{
        this.toastr.info('Las contraseñas no coinciden');
      }
    }
  }

  clean(){
    this.userRegister.email = "";
    this.userRegister.password = "";
    this.userRegister.confirm_password = "";
  }

}
