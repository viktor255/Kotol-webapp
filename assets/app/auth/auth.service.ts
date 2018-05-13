import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";

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

    signin(user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:3000/user/signin', user)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
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