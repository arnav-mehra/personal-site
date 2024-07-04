import { Component, OnInit } from '@angular/core';
import { faBriefcase, faHome, faSchool, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit {

  title: string = 'Arnav Mehra';
  menuItems = [
    { title: 'Home', link: '/home', icon: faHome }, 
    { title: 'Education', link: '/education', icon: faSchool }, 
    { title: 'Projects', link: '/projects', icon: faTasks },
    { title: 'Experience', link: '/experience', icon: faBriefcase }
  ];

  faBars = faBars;
  faTimes = faTimes;

  width: number = window.innerWidth;
  drawer: boolean = false;

  constructor() {}
  ngOnInit(): void {}
  
  updateWidth() {
    this.width = window.innerWidth;
  }

  toggleDrawer() {
    this.drawer = !this.drawer;
  }

  getWidth() {
    return (this.drawer? '' : '0');
  }

}
