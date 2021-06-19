import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss']
})
export class NavbarAdmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('users');
    localStorage.removeItem('profile');
    window.location.href = "/landing";
  }

}
