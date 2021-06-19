import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = {
    email : "",
    password : ""
  };
  constructor(private http: HttpService, private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
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

}
