import { Component } from '@angular/core';
import { StyledFormComponent } from '@shared/components/styled-form/styled-form.component';
import { InputGroupComponent } from '@shared/components/styled-form/input-group/input-group.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/styled-form/input/input.component';
import { SubmitComponent } from '@shared/components/styled-form/submit/submit.component';

@Component({
  selector: 'app-login',
  imports: [
    StyledFormComponent,
    InputGroupComponent,
    InputComponent,
    SubmitComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.max(16),
      Validators.min(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.max(16),
      Validators.min(6),
    ]),
  });

  onSubmit() {}

  getErrors(controlName: string): string[] {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors || !control.touched) return [];
    return Object.keys(control.errors).map((errorKey) => {
      switch (errorKey) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimum length is ${control.errors?.['minlength'].requiredLength}.`;
        case 'maxLength':
          return `Maximum length is ${control.errors?.['minlength'].requiredLength}.`;
        default:
          return `Unknown error (${errorKey})`;
      }
    });
  }
}
