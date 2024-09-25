import { Component, Input } from '@angular/core';
import { InvestmentResults } from '../user-input/user-input.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  @Input() results: InvestmentResults | null = null;
  @Input() isNegative = false;

  get annualData() {
    return this.results ? this.results.annualData : [];
  }
}
