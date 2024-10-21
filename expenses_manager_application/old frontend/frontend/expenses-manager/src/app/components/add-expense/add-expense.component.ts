import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExpenseService} from '../../services/expense.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    NgIf
  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  expenseForm: FormGroup; // Reactive form for adding expenses

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router) {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      this.expenseService.addExpense(this.expenseForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
