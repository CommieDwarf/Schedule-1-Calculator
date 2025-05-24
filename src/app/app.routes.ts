import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CalculatorComponent } from './features/calculator/calculator.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
    },
    {
        path: "logIn",
        component: LoginComponent
    },
    {
        path: "mix",
        component: CalculatorComponent
    },


];
