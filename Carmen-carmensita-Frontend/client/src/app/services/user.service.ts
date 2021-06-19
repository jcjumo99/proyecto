import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;
  public token:string = null;
  public user = {
    id: "",
    role: "",
    ip: "",
  }

  constructor( 
    private _router: Router, 
    private http: Http, 
  ) { 
    this.url = GLOBAL.url;
  } 
  
  
  async validateToken(): Promise<boolean>{
    const getToken = localStorage.getItem('access_token');
    if(!getToken){
      this.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('sidebar');
      this._router.navigate(['/login']);
      return Promise.resolve(false)
    }

    return new Promise<boolean>(async resolve => {
      const token = JSON.parse(localStorage.getItem('access_token'));
      const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token, 'Ages': 'testing' });
      this.http.get(this.url + '/token', { headers: headers })
        .subscribe(async resp =>{
            console.log(resp)
            if(resp['ok']){ 
              this.token = token;           
              const data = resp.json();
              this.user = data.token;
              resolve(true)
            }else{
              this.user = null;
              localStorage.removeItem('access_token');
              localStorage.removeItem('sidebar');
              this._router.navigate(['/login']);
              resolve(false)
            }
          },
          error => {
            console.log(error)
            this.user = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('sidebar');
            this._router.navigate(['/login']);
            resolve(false)
          }
        );
    })
  }

}
