import { AfterViewInit, Component } from '@angular/core';
import Chess from './Chess';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

@Component({
  selector: 'chess-embedded',
  template: '<div id="chessId"></div>'
})

export class ChessComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.render();
  }
  private render() {
    ReactDOM.render(
      React.createElement(Chess), document.getElementById("chessId")
    )
  }
}