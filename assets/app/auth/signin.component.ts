import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component ({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit{
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router){}

    onSubmit(): void{
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('admin', data.admin);
                    SigninComponent.calculateExpire(data.expiresIn);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }

    static calculateExpire(expiresIn:number){
        let expiresAt:number;
        expiresAt = Date.now() + expiresIn * 1000;
        localStorage.setItem('expiresAt', expiresAt.toString());
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")
            ]),
            password: new FormControl(null, Validators.required),
        });
    }
}
