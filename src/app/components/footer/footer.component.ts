import { Component, OnInit, Input, HostListener } from '@angular/core';
import { faGithub, faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
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
      link: "https://github.com/ArnavMeh",
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
  ]
  FileSaver = require('file-saver');
  width: number = window.innerWidth;

  isLeft: boolean = true;

  constructor() {}
  ngOnInit(): void {}

  updateWidth() {
    this.width = window.innerWidth;
  }
  onDrag(event: any) {
    var thresold = (this.isLeft? 2/3 : 1/3) * window.innerWidth;
    if (event.event.x) {
      this.isLeft = event.event.x < thresold;
    } else {
      this.isLeft = event.event.touches[0].clientX < thresold;
    }
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
