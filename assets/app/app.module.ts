import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { TimeConfigComponent } from "./timeConfig/timeConfig.component";
import { TimeConfigsComponent } from "./timeConfig/timeConfigs.component";
import { TimeConfigListComponent } from "./timeConfig/timeConfig-list.component";
import { TimeConfigInputComponent } from "./timeConfig/timeConfig-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        TimeConfigComponent,
        TimeConfigsComponent,
        TimeConfigListComponent,
        TimeConfigInputComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}