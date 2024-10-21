import {Component} from '@angular/core';
import {Expense} from '../../models/expense.model';
import {ExpenseService} from '../../services/expense.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    CurrencyPipe,
    DatePipe,
    MatRowDef,
    MatHeaderRowDef
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  expenses: Expense[] = []; // Array to store expenses

  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit(): void {
    this.loadExpenses(); // Load expenses on initialisation
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses; // Store fetched responses
    })
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(expense => {
      this.loadExpenses(); // Reload expenses after deletion
    })
  }

  editExpense(id: number): void {
    this.router.navigate(['/edit-expense', id]); // Navigate to edit page
  }
}
