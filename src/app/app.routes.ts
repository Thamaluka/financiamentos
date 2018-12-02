import { HomeComponent } from "./pages/home/home.component";
import { CheckSalaryComponent } from "./pages/check-salary/check-salary.component";
import { UserComponent } from "./pages/user/user.component";

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
    {
        path: 'user',
        component: UserComponent,
    },
];