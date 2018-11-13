import { Component } from "@angular/core";

@Component({
    selector: 'app-timeConfigs',
    template: `        
        <div class="row" *ngIf="isLoggedIn()">
            <app-timeConfig-input></app-timeConfig-input>
        </div>
        <div class="row">
            <app-timeConfig-current></app-timeConfig-current>
        </div>
        <hr>
        <div class="row">
            <app-timeConfig-list></app-timeConfig-list>
        </div>
    `
})

export class TimeConfigsComponent{
    isLoggedIn() {
        let loggedIn = localStorage.getItem('token') != null;
        if(loggedIn) {
            if(parseInt(localStorage.getItem('expiresAt')) < Date.now()){
                localStorage.clear();
                return false;
            }
        }
        return loggedIn;
    }
}