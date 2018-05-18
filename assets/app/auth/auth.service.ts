import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
// import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";
import { TimeConfig } from "../timeConfig/timeConfig.model";

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient, private errorService: ErrorService) {
    }

    signup(user: User): Observable<User> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const userId = localStorage.getItem('userId')
            ? '&userId=' + localStorage.getItem('userId')
            : '';
        return this.httpClient.post<User>('http://localhost:3000/user/signup' + token + userId, user)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((data: any) => data)
            .catch((error: HttpErrorResponse) => {
                    this.errorService.handleError(error.error);
                    return Observable.throw(error);
            });
        // return this.httpClient.post<User>('http://localhost:3000/user/signin', user)
        //     .map((data: any) => data.json())
        //     .catch((error: HttpErrorResponse) => {
        //         this.errorService.handleError(error.error);
        //         return Observable.throw(error);
        //     });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    isAdmin() {
        return localStorage.getItem('admin');
    }
}