// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';

export const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'edit-expense/:id', component: EditExpenseComponent },
];
