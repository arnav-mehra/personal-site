import { Component, OnInit } from '@angular/core';
import data from './data.json';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})

export class ProjectsComponent implements OnInit {

  projectData = data.projectData;
  faGithubAlt = faGithubAlt;
  faLink = faLink;

  constructor() {}
  ngOnInit(): void {}
}
