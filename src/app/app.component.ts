import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { BackgroundComponent } from './components/background/background.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.sass'],
  standalone: true,
  imports: [FooterComponent, BackgroundComponent, NavbarComponent, RouterModule]
})
export class AppComponent {
  title: string = 'personal-site';
}
