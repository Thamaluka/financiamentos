import { HomeComponent } from "./pages/home/home.component";
import { CheckSalaryComponent } from "./pages/check-salary/check-salary.component";

export const appRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'salary',
        component: CheckSalaryComponent,
    },
];