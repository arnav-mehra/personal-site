import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkComponent } from './components/work/work.component';

import { ChessComponent } from './components/react-components/chess-embedded.component';
import { GameOfLifeComponent } from './components/react-components/game-of-life-embedded.component';
import { FooterComponent } from './components/footer/footer.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EducationComponent,
    ProjectsComponent,
    ChessComponent,
    GameOfLifeComponent,
    FooterComponent,
    WorkComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CommonModule,
    // DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
