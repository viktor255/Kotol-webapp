import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { TimeConfigsComponent } from "./timeConfig/timeConfigs.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/timeConfigs', pathMatch: 'full' },
    { path: 'timeConfigs', component: TimeConfigsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);