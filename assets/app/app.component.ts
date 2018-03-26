import { Component } from '@angular/core';
import { TimeConfigService } from "./timeConfig/timeConfig.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TimeConfigService]
})
export class AppComponent {




}