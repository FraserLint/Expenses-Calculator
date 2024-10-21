import { Injectable } from '@angular/core';
import {Expense} from '../models/expense.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) { }

  // Get all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}`);
  }

  // Add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}`, expense);
  }

  // Update an existing expense
  updateExpense(expense: Expense, id: number): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  // Delete an expense
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get expenses for a specific week
  getExpensesForWeek(startDate: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/week?start=${startDate}`);
  }

  // Get expenses for a specific month
  getExpensesForMonth(startDate: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/month?start=${startDate}`);
  }

  // Get expenses for the current tax year
  getExpensesForTaxYear(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/taxyear`);
  }
}
