import { Component, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-styled-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './styled-form.component.html',
  styleUrl: './styled-form.component.scss',
})
export class StyledFormComponent {
  readonly formGroup = input.required<FormGroup>();
  readonly submitText = input('Submit');
  readonly isLoading = input(false);
  readonly title = output<string>();
  readonly formSubmitted = output<void>();

  onSubmit() {
    this.formSubmitted.emit();
  }
}
