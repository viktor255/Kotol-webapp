import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { TimeConfigService } from "./timeConfig.service";
import {Boost} from "./boost.model";

@Component({
    selector: 'app-timeConfig-boost',
    templateUrl: './timeConfig-boost.component.html',
    styles: [`
        .boostBox {
            border-radius: 7px;
            background: #7ba9d0;
            color: white;
            padding: 20px;
            width: auto;
            height: auto;
            display: block;
            margin: 15px 0 0 0;
        }

        .boostButton {
            margin: 15px 0 0 0;
            border-radius: 70px;
            background: #7ba9d0;
            color: white;
            font-size: large;
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;
            cursor: pointer;
        }       

        .fireIcon {
            font-size: 40px;
        }

        .temp {
            color: white;
        }

        .deleteButton {
            display: inline-block;
            float: right;
            font-size: 20px;
            cursor: pointer;
        }

    `]

})
export class TimeConfigBoostComponent implements OnInit, OnDestroy {
    @Input() timeConfigCurrent: TimeConfig;
    @Input() desiredTemperature: number;
    @Input() currentBoost: Boost = null;
    lastConfigTime;
    intervalId;

    constructor(private timeConfigService: TimeConfigService) {
    }

    createNewBoost() {
        const currentBoost = new Boost(
            Date.now(),
            Number(localStorage.getItem('boostConfigDuration')),
            Number(localStorage.getItem('boostConfigTemperature')),
            localStorage.getItem('email'));
        this.timeConfigService.addBoost(currentBoost)
            .subscribe(
                boost => {
                    this.currentBoost = boost;
                    // console.log(boost);
                },
                error => {
                    console.error(error);
                },
            );
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
            let box = document.getElementById("boostBox");
            if (((currentTime - this.lastConfigTime) > 120000) || this.desiredTemperature != this.timeConfigCurrent.temperature)
                box.style.background = '#AD78A4';
            else
                box.style.background = '#7ba9d0';
        }
    }

    getBoostDB() {
        this.timeConfigService.getCurrentBoost()
            .subscribe((boost: Boost) => {
                this.currentBoost = boost;
                // console.log(boost);
            });
    }

    onDelete() {
        this.timeConfigService.deleteCurrentBoost(this.currentBoost)
            .subscribe((boost: Boost) => {
                this.currentBoost = boost;
                // console.log(boost);
            });
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    getTimeDuration() {
        return this.currentBoost.time + this.currentBoost.duration*60*1000;
    }

    ngOnInit() {
        // setTimeout(() => {
        //     this.checkCurrentTempDB()
        // }, 2000);
        this.getBoostDB()
        if (this.isLoggedIn()) {
            this.timeConfigService.getBoostConfig().subscribe();
        }
        // this.checkCurrentTempLocal();
        // setInterval(() => {
        //     this.checkCurrentTempDB()
        // }, 30000);
        // this.intervalId = setInterval(() => {
        //     this.checkCurrentTempLocal()
        // }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
