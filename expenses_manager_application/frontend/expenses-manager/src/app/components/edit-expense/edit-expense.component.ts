import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ExpenseService} from '../../services/expense.service';
import {Expense} from '../../models/expense.model';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatError,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    NgIf
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent {
  expenseForm: FormGroup; // Reactive form for editing expenses
  expenseId!: number; // Store expense ID

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.expenseId = +this.route.snapshot.paramMap.get('id')!; // Getting the id from the route
    this.loadExpense(); // Load expense details
  }

  loadExpense(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      const expense = expenses.find(e => e.id === this.expenseId);
      if (expense) {
        this.expenseForm.patchValue(expense); // Set form values
      }
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const updatedExpense: Expense = {
        ...this.expenseForm.value // Spread operator to get form values
      };
      this.expenseService.updateExpense(updatedExpense, this.expenseId).subscribe(() => {
        this.router.navigate(['/']); // Redirect back to expense list after updating
      })
    }
  }
}

