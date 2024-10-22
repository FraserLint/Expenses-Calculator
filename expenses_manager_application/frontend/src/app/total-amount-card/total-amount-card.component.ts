import { Component } from '@angular/core';

@Component({
  selector: 'app-total-amount-card',
  templateUrl: './total-amount-card.component.html',
  styleUrls: ['./total-amount-card.component.scss']
})
export class TotalAmountCardComponent {

  selectedYear = "";
  dummyYearTotal = 234.23;
  dummyMonthTotal = 104.96;
  dummyWeekTotal = 32.43;
}
