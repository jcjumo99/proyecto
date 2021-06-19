import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(config: NgbCarouselConfig) { 
    config.interval = 3000;  
    config.showNavigationArrows = true;
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false; 
  }

  ngOnInit(): void {
  }

}
