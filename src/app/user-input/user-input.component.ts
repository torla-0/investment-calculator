import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type UserInput, InvestmentResults } from './user-input.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  userInput: UserInput = {
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  };

  @Output() InvestmentResults = new EventEmitter<InvestmentResults>();
  @Output() isNegative = new EventEmitter<boolean>();

  calculateInvestmentResults() {
    const annualData = [];
    let investmentValue = +this.userInput.initialInvestment;

    for (let i = 0; i < this.userInput.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (+this.userInput.expectedReturn / 100);
      investmentValue +=
        interestEarnedInYear + +this.userInput.annualInvestment;
      const totalInterest =
        investmentValue -
        +this.userInput.annualInvestment * year -
        +this.userInput.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: +this.userInput.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          +this.userInput.initialInvestment +
          +this.userInput.annualInvestment * year,
      });
    }
    this.checkForNegativeValues();
    this.restart();

    this.InvestmentResults.emit({
      annualData,
    });
  }

  restart() {
    this.userInput = {
      initialInvestment: 0,
      annualInvestment: 0,
      expectedReturn: 0,
      duration: 0,
    };
  }

  checkForNegativeValues() {
    if (
      this.userInput.annualInvestment <= 0 ||
      this.userInput.expectedReturn <= 0 ||
      this.userInput.duration <= 0 ||
      this.userInput.initialInvestment <= 0
    ) {
      this.isNegative.emit(true);
    } else this.isNegative.emit(false);
  }
}
