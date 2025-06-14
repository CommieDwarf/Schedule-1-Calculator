import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-group',
  imports: [],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
})
export class InputGroupComponent {
  label = input<string>();
  errors = input<string[]>([]);

  hasError() {
    return this.errors().length > 0;
  }
}
