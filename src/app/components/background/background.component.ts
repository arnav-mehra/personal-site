import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass'],
  standalone: true
})
export class BackgroundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const bgRef = document.getElementById("bg")!;

    let width: number, height: number;
    let cols: number, rows: number;

    let row_elems: HTMLElement[];
    let grid_elems: HTMLElement[][];

    let new_grid: number[][];
    let old_grid: number[][];

    let interval_num: any;
    let active = true;

    const getV = (i: number, j: number): number => {
        if (i < 0 || j < 0 || i >= rows || j >= cols) {
            return Math.round(Math.random());
        }
        return old_grid[i][j];
    };

    const iterate = () => {
        if (!active) return;

        old_grid = new_grid;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const sum = getV(i + 1, j - 1) + getV(i + 1, j + 0) + getV(i + 1, j + 1)
                          + getV(i + 0, j - 1)                      + getV(i + 0, j + 1)
                          + getV(i - 1, j - 1) + getV(i - 1, j + 0) + getV(i - 1, j + 1);
                const state = old_grid[i][j] ? (sum == 2 || sum == 3) : (sum == 3);
                new_grid[i][j] = state ? 1 : 0;
                grid_elems[i][j].style.transform = state ? "rotate(45deg) scale(2)" : "";
            }
        }
    };

    const initGrid = () => {
        bgRef.replaceChildren();

        grid_elems = new Array(rows).fill(null);
        new_grid = new Array(rows).fill(null);

        row_elems = new Array(rows).fill(null).map((_, i) => {
            const rowEl = document.createElement('div');

            grid_elems[i] = new Array(cols).fill(null).map(_ => {
                const colEl = document.createElement('div');
                colEl.className = "col-wrapper";
                colEl.textContent = "+";
                rowEl.appendChild(colEl);
                return colEl;
            })
            new_grid[i] = new Array(cols).fill(0).map(_ => Math.random() > 0.8 ? 1 : 0);

            rowEl.className = "row-wrapper";
            bgRef.appendChild(rowEl);
            return rowEl;
        });
    };

    const updateDims = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        cols = Math.ceil(width / 40);
        rows = Math.ceil(height / 40);

        initGrid();

        clearInterval(interval_num);
        interval_num = setInterval(iterate, 2000);
    };

    updateDims();
    window.addEventListener("resize", updateDims);
  }
}
