import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  width: number = window.innerWidth;
  who_text: string = "Hi, my name is Arnav Mehra and I \
  am a CS major at Purdue University, class of 2024.\
  My interest in CS started back in high school when\
  I identified a problem in my school and decided to\
  learn and apply software to solve it, resulting in an\
  application called HSE Courses.\
  Since then, the potential impacts of CS \
  has fascinated me, driving me to explore as much \
  about this field as possible.";
  updateWidth() {
    this.width = window.innerWidth;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
