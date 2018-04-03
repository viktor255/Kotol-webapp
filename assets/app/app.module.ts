import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { TimeConfigComponent } from "./timeConfig/timeConfig.component";
import { TimeConfigsComponent } from "./timeConfig/timeConfigs.component";
import { TimeConfigListComponent } from "./timeConfig/timeConfig-list.component";
import { TimeConfigInputComponent } from "./timeConfig/timeConfig-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { routing } from "./app.routing";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [
        AppComponent,
        TimeConfigComponent,
        TimeConfigsComponent,
        TimeConfigListComponent,
        TimeConfigInputComponent,
        TimeConfigsComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    providers:[
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}