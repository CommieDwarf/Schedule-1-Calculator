import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';
import {
  RecipeBuilderComponent
} from '@features/calculator/recipe-builder/recipe-builder.component';

@Component({
  selector: 'app-calculator',
  imports: [
    RecipeBuilderComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [CalculatorService],
})
export class CalculatorComponent {}
