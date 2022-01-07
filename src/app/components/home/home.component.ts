import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  width: number = window.innerWidth;
  updateWidth() {
    this.width = window.innerWidth;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
