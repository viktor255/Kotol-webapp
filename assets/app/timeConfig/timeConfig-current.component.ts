import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig-current',
    templateUrl: './timeConfig-current.component.html',
    styles: [`
        #tempBox {
            border-radius: 7px;
            background: rgba(73, 145, 85, 0.74);
            padding: 20px;
            width: 450px;
            height: 90px;
            display: block;
            margin: 15px 0 0 0;
        }

        .temp {
            color: white;
        }

    `]

})
export class TimeConfigCurrentComponent implements OnInit, OnDestroy {
    @Input() timeConfigCurrent: TimeConfig;
    @Input() desiredTemperature: number;

    intervalId;

    constructor(private timeConfigService: TimeConfigService) {
    }

    checkCurrentTemp() {
        this.timeConfigService.getCurrentTimeConfig()
            .subscribe((timeConfig: TimeConfig) => {
                this.timeConfigCurrent = timeConfig;
                const currentTime = new Date().getTime();
                const lastConfigTime = Number(timeConfig.time);
                this.timeConfigCurrent.time = (new Date(lastConfigTime)).toString();
                this.desiredTemperature = this.timeConfigService.desiredTemperature();
                let box = document.getElementById("tempBox");
                if (((currentTime - lastConfigTime) > 120000) || this.desiredTemperature != this.timeConfigCurrent.temperature)
                    box.style.background = 'red';
                else
                    box.style.background = 'rgba(73, 145, 85, 0.74)';
            });
    }

    ngOnInit() {
        setTimeout(() => {
            this.checkCurrentTemp()
        }, 2000);
        // this.checkCurrentTemp();
        this.intervalId = setInterval(() => {
            this.checkCurrentTemp()
        }, 30000);
    }

    ngOnDestroy(){
        clearInterval(this.intervalId);
    }
}
