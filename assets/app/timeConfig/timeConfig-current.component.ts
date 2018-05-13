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
            /*width: 450px;*/
            width: auto;
            height: auto;
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
    lastConfigTime;
    intervalId;

    constructor(private timeConfigService: TimeConfigService) {
    }

    checkCurrentTempDB() {
        this.timeConfigService.getCurrentTimeConfig()
            .subscribe((timeConfig: TimeConfig) => {
                this.lastConfigTime = Number(timeConfig.time);
                this.timeConfigCurrent = timeConfig;
                this.timeConfigCurrent.time = (new Date(Number(timeConfig.time))).toString();
            });
    }

    checkCurrentTempLocal() {
        if(this.timeConfigCurrent) {
            const currentTime = new Date().getTime();
            this.desiredTemperature = this.timeConfigService.desiredTemperature();
            let box = document.getElementById("tempBox");
            if (((currentTime - this.lastConfigTime) > 120000) || this.desiredTemperature != this.timeConfigCurrent.temperature)
                box.style.background = 'red';
            else
                box.style.background = 'rgba(73, 145, 85, 0.74)';
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.checkCurrentTempDB()
        }, 2000);
        // this.checkCurrentTempLocal();
        setInterval(() => {
            this.checkCurrentTempDB()
        }, 30000);
        this.intervalId = setInterval(() => {
            this.checkCurrentTempLocal()
        }, 3000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
