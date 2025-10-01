import { Component, OnInit, Input, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
  standalone: true,
  imports: [FontAwesomeModule]
})
export class FooterComponent implements OnInit {

  isOutside = input<boolean>(true);

  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faFile = faFile;

  width: number = window.innerWidth;

  isLeft: boolean = true;
  isGrabbed: boolean = false;
  grabHeight: number = 48;

  constructor() {}
  ngOnInit(): void {
    const boundPointerUp = () => this.pointerUp();
    const boundPointerMove = (e: any) => this.pointerMove(e);

    window.addEventListener('pointerup', boundPointerUp);
    window.addEventListener('pointermove', boundPointerMove);
  }

  updateWidth() {
    this.width = window.innerWidth;
  }

  pointerDown(event: Event) {
    event.preventDefault();
    this.isGrabbed = true;
  }
  pointerUp() {
    this.isGrabbed = false;
  }
  pointerMove(event: any) {
    if (!this.isGrabbed) return;

    var thresold = (this.isLeft? 2/3 : 1/3) * window.innerWidth;
    const x = event.x || event.touches[0].clientX;
    this.isLeft = x < thresold;
    this.grabHeight = this.clampGrabHeight(this.grabHeight - event.movementY);
  }

  clampGrabHeight(x: number) {
    return Math.min(Math.max(x, 0), window.innerHeight - 176);
  }
}
