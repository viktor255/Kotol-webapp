import { Component, Input } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig',
    templateUrl: './timeConfig.component.html',
    styles: [`
        .temperature {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
        }

        .config {
            display: inline-block;
            float: right;
            font-size: 12px;
        }
    `]
})
export class TimeConfigComponent {
    @Input() timeConfig: TimeConfig;

    constructor(private timeConfigService: TimeConfigService){}

    onEdit() {
        this.timeConfigService.editConfig(this.timeConfig);
        window.scrollTo(0,0);
    }

    onDelete() {
        this.timeConfigService.deleteTimeConfig(this.timeConfig)
            .subscribe(
                result => console.log(result)
            );
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

}