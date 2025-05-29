import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from "@features/calculator/calculator.component";
import { MixListComponent } from '@features/mix-list/mix-list.component';
import { HeaderComponent } from "@core/components/header/header.component";
import { LoginComponent } from "@features/auth/pages/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'schedule-1-calculator';
}
