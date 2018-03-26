import { TimeConfig } from "./timeConfig.model";
import { Component, OnInit } from "@angular/core";
import { TimeConfigService } from "./timeConfig.service";

@Component ({
    selector: 'app-timeConfig-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-timeConfig
                    [timeConfig]="timeConfig"
                    *ngFor="let timeConfig of timeConfigs" ></app-timeConfig>
        
        </div>
    `
})
export class TimeConfigListComponent implements OnInit{
    timeConfigs: TimeConfig[] = [];

    constructor(private timeConfigService: TimeConfigService){}

    ngOnInit(){
        this.timeConfigService.getTimeConfigs()
            .subscribe((timeConfigs: TimeConfig[]) => {
                this.timeConfigs = timeConfigs;
                this.timeConfigs.sort((a,b) => {
                    if(a.time <= b.time)
                        return -1;
                    else return 1;
                });
                console.log(this.timeConfigs);
            });
        // this.timeConfigs = this.timeConfigService.getTimeConfigs();

    }

}