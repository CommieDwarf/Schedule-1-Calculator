import {Component} from '@angular/core';
import {SubstanceList} from './substance-list/substance-list.component';
import {Calculator} from './calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [SubstanceList],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})

export class CalculatorComponent {

  constructor() {

  }

  click() {
  }

}
