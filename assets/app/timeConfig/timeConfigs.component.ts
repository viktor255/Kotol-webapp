import { Component } from "@angular/core";

@Component({
    selector: 'app-timeConfigs',
    template: `
        <div class="row">
            <app-timeConfig-input></app-timeConfig-input>
        </div>
        <hr>
        <div class="row">
            <app-timeConfig-list></app-timeConfig-list>
        </div>
    `
})

export class TimeConfigsComponent{

}