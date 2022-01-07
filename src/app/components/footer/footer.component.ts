import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}
  ngOnInit(): void {}

  updateWidth() {
    this.width = window.innerWidth;
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
