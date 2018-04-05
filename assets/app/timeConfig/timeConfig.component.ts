import { Component, Input } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig',
    templateUrl: './timeConfig.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }

        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class TimeConfigComponent {
    @Input() timeConfig: TimeConfig;

    constructor(private timeConfigService: TimeConfigService){}

    onEdit() {
        this.timeConfigService.editConfig(this.timeConfig);
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