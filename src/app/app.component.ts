import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { type InvestmentResults } from './user-input/user-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  results: InvestmentResults | null = null;
  isNegative = false;
  onInvestmentResults(investmentResults: InvestmentResults) {
    this.results = investmentResults;
  }

  checkNegative(isNegative: boolean) {
    this.isNegative = isNegative;
  }
}
