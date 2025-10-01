import { Component, OnInit } from '@angular/core';
import data from './data.json';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class ProjectsComponent implements OnInit {

  hoveredProject: string = "";
  projectData = data.projectData;
  faGithubAlt = faGithubAlt;
  faLink = faLink;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    const videos = document.getElementsByTagName('video');
    Array.prototype.slice.call(videos).forEach(video => {
      video.muted = true;
      video.play();
    });
  }

  mouseEnter(projectName: string){
    this.hoveredProject = projectName;
  }

  mouseLeave(_: string){
    this.hoveredProject = "";
  }

  flipProjectCard(projectName: string){
    this.hoveredProject = this.hoveredProject.length ? "" : projectName;
  }

  isImage(fname: string): boolean {
    return !!['PNG', 'JPG'].filter((x: string) => fname?.toUpperCase().includes(x)).length;
  }

  isVideo(fname: string): boolean {
    return !!['MP4'].filter((x: string) => fname?.toUpperCase().includes(x)).length;
  }
}
