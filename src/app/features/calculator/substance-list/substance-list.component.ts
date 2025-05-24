import { Substance } from './substance/substance.component';
import { Component } from '@angular/core';
import { SUBSTANCES } from '@core/models/substance.model';

@Component({
  selector: 'app-substance-list',
  imports: [Substance],
  templateUrl: './substance-list.component.html',
  styleUrl: './substance-list-component.scss'
})
export class SubstanceList {
  substances = SUBSTANCES;
}
