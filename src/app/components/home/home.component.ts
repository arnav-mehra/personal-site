import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  width: number = window.innerWidth;
  who_text: string = `
    Hi, my name is Arnav Mehra and I
    am a Computer Science and Data Science major at Purdue
    University, class of 2025.

    My passion for CS started back in high school when
    I identified problems with our course registration
    system and decided to do something about it.

    The app I would build, HSE Courses, introduced new kinds of technical challenges
    and demonstrated the great impact software could carry at even the smallest
    of scales. I was hooked.
  `;

  updateWidth() {
    this.width = window.innerWidth;
  }

  constructor() {}

  ngOnInit(): void {}
}