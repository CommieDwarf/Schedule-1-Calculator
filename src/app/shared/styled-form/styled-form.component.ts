import { Component, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-styled-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './styled-form.component.html',
  styleUrl: './styled-form.component.scss'
})
export class StyledFormComponent {
  formGroup = input.required<FormGroup>();
  submitText = input('Submit');
  isLoading = input(false);
  title = output<string>();
  formSubmitted = output<void>();

  onSubmit() {
    this.formSubmitted.emit();
  
  }
}
