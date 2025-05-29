import { Routes } from '@angular/router';
import { LoginComponent } from '@features/auth/pages/login/login.component';
import { CalculatorComponent } from '@features/calculator/calculator.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'log-in', component: LoginComponent },
      { path: 'mix', component: CalculatorComponent },
    ],
  },
];
