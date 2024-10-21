import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = '/api/expenses'

  constructor(private _http: HttpClient) { }

  addExpense(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, data);
  }

  deleteExpense(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }

  updateExpense(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getExpensesForTaxYear(): Observable<any> {
    return this._http.get(`${this.baseUrl}/taxyear`);
  }
}
