import { Component } from '@angular/core';
import { StyledFormComponent } from '../../shared/styled-form/styled-form.component';
import { InputGroupComponent } from '../../shared/styled-form/input-group/input-group.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/styled-form/input/input.component';
import { SubmitComponent } from '../../shared/styled-form/submit/submit.component';

@Component({
  selector: 'app-login',
  imports: [StyledFormComponent, InputGroupComponent, InputComponent, SubmitComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
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

  getErrors(controlName: string) {
    const control = this.loginForm.get(controlName);
    console.log(control?.errors);
    console.log(control?.touched);
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
