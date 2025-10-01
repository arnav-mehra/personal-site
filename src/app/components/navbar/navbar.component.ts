import { Component, OnInit } from '@angular/core';
import { faBriefcase, faHome, faSchool, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.sass'],
  imports: [FooterComponent, CommonModule, FontAwesomeModule, RouterModule],
  standalone: true
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
  ngOnInit(): void {
    window.addEventListener('scroll', (event: any) => {
      this.handleScroll(event)
    });
  }

  handleScroll(event: any) {
    if (window.scrollY > 50) {
      this.drawer = false;
    }
  }
  
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
