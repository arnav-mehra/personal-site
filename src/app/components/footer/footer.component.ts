import { Component, OnInit, Input } from '@angular/core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

declare var require: any

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})

export class FooterComponent implements OnInit {

  @Input() isOutside: boolean = true;

  footerItems = [
    {
      title: "Github", 
      link: "https://github.com/arnav-mehra",
      icon: faGithub
    },
    {
      title: "LinkedIn", 
      link: "https://www.linkedin.com/in/arnav-mehra-ab8975193", 
      icon: faLinkedinIn
    },
    {
      title: "Resume", 
      link: "javascript:void(0)", 
      icon: faDownload
    }
  ];

  FileSaver = require('file-saver');
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

  pointerDown() {
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
    this.grabHeight -= event.movementY;
  }

  getAction(itemTitle: string) {
    var item = this.footerItems.find(i => i.title == itemTitle);
    switch (itemTitle) {
      case 'Resume':
        console.log("yay")
        const pdfUrl = './assets/resume.pdf';
        const pdfName = 'amehra-resume';
        this.FileSaver.saveAs(pdfUrl, pdfName);
        break;
      default:
        window.open(item?.link, '_blank');
    }
  }
}
