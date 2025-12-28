import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { RolesComponent } from './components/roles.component';
import { UserRolesComponent } from './components/user-roles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    UsersComponent,
    RolesComponent,
    UserRolesComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentComponent = 'home';

  navigateTo(component: string) {
    this.currentComponent = component;
  }
}
