import { AfterViewInit, Component } from '@angular/core';
import GameOfLife from './GameOfLife';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

@Component({
  selector: 'game-of-life-embedded',
  template: '<div id="golId"></div>'
})

export class GameOfLifeComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.render();
  }
  private render() {
    ReactDOM.render(
      React.createElement(GameOfLife), document.getElementById("golId")
    )
  }
}