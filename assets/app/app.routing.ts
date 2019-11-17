import { RouterModule, Routes } from "@angular/router";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { TimeConfigsComponent } from "./timeConfig/timeConfigs.component";
import {BoostConfigComponent} from "./timeConfig/boostConfig.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/timeConfigs', pathMatch: 'full' },
    { path: 'timeConfigs', component: TimeConfigsComponent },
    { path: 'boostConfig', component: BoostConfigComponent },
    { path: 'auth', children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
