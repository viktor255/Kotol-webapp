import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient) {
    }

    signup(user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:3000/user', user)
            .catch((error: HttpErrorResponse) => {
                return Observable.throw(error);
            });
    }

    signin(user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:3000/user/signin', user)
            .catch((error: HttpErrorResponse) => {
                return Observable.throw(error);
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }
}