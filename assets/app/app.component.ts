import { Component, OnInit } from '@angular/core';
import { TimeConfigService } from "./timeConfig/timeConfig.service";
import { TimeConfig } from "./timeConfig/timeConfig.model";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TimeConfigService]
})
export class AppComponent{
}