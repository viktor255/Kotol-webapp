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
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { TimeConfigCurrentComponent } from "./timeConfig/timeConfig-current.component";

@NgModule({
    declarations: [
        AppComponent,
        TimeConfigComponent,
        TimeConfigsComponent,
        TimeConfigListComponent,
        TimeConfigInputComponent,
        TimeConfigsComponent,
        TimeConfigCurrentComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    providers:[
        AuthService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}