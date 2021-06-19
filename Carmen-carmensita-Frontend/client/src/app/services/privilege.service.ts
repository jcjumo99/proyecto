import { Injectable } from '@angular/core';
import { Router, RouterModule, CanActivate } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { GLOBAL } from './global';

@Injectable()
export class Privilege {

  public url : string;
  public routing = [];
  public sidebar = localStorage.getItem('sidebar');

  constructor( private _router: Router, private _route: RouterModule, private http: Http )
  { this.url = GLOBAL.url; this.routing = JSON.parse(localStorage.getItem('sidebar')); }

  canActivate() {
    const token = JSON.parse(localStorage.getItem('access_token'));
    if(token){
      return true;
    }else{
      this._router.navigate(['/login']);
      return true;
    }
  }

  decoded(){
    const token = JSON.parse(localStorage.getItem('access_token'));
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token });
    return this.http.get(this.url + '/token', { headers: headers }).map(res => res.json());
  }

}