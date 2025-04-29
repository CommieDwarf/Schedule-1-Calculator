import { Component } from '@angular/core';
import { DUMMY_MIXES, Mix } from '../shared/mix.model';
import { MixComponent } from './mix/mix.component';

@Component({
  selector: 'app-mix-list',
  imports: [MixComponent],
  templateUrl: './mix-list.component.html',
  styleUrl: './mix-list.component.scss'
})
export class MixListComponent {

  mixes: Mix[] = DUMMY_MIXES;

}
