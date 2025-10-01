import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { EducationComponent } from './app/components/education/education.component';
import { ProjectsComponent } from './app/components/projects/projects.component';
import { WorkComponent } from './app/components/work/work.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'experience', component: WorkComponent },
  { path: '**', redirectTo: 'home' }
];

export default routes;
