// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { routes } from './app.routes'; // Import your routes
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Include RouterModule and HttpClientModule here
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="/">Expense List</a>
      <a routerLink="/add-expense">Add Expense</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'expenses-manager';
}
