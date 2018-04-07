import { Component, Input, OnInit } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig-current',
    templateUrl: './timeConfig-current.component.html',
    styles: [`
        #tempBox {
            border-radius: 7px;
            background: rgba(145, 0, 0, 0.74);
            padding: 20px;
            width: 200px;
            height: 75px;
            display: block;
            margin: 15px 0 0 0;
        }
        #temp {
            color: white;
        }

    `]

})
export class TimeConfigCurrentComponent implements OnInit{
    @Input() timeConfigCurrent: TimeConfig;

    constructor(private timeConfigService: TimeConfigService){}

    checkCurrentTemp(){
        this.timeConfigService.getCurrentTimeConfig()
            .subscribe((timeConfig: TimeConfig) => {
                this.timeConfigCurrent = timeConfig;
                console.log(timeConfig);
            });
    }

    ngOnInit(){
        this.checkCurrentTemp();
        setInterval(() => {this.checkCurrentTemp()}, 60000);
    }
}
