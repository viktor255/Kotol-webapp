import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            
            <nav class="col-md-8 col-md-offset-2">
                <div style="float: right"><app-logout></app-logout></div>
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/timeConfigs']">Time configuration</a></li>
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signin']">Sign in</a></li>
                    <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/auth/signup']">Sign up</a></li>
                </ul>                
            </nav>
            
        </header>
        
    `
})
export class HeaderComponent {
    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }
}