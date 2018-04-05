import { TimeConfig } from "./timeConfig.model";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
import { Error } from "../errors/error.model";

@Injectable()
export class TimeConfigService{
    timeConfigs: TimeConfig[] = [];

    timeConfigIsEdit = new EventEmitter<TimeConfig>();

    constructor(private httpClient: HttpClient, private errorService: ErrorService){}

    // checkTime(time:string){
    //     return
    // }

    sortTimeConfigs(){
        this.timeConfigs.sort((a,b) => {
            if(a.time <= b.time)
                return -1;
            else return 1;
        });
    }

    addTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig> {
        // if not already in array add new timeConfig else change temperature
        const indexNum = this.timeConfigs.findIndex(x => x.time == timeConfig.time);
        if(indexNum == -1){
            // create
            const token = localStorage.getItem('token')
                ? '?token=' + localStorage.getItem('token')
                : '';
            // this.timeConfigs.push(timeConfig);
            // this.sortTimeConfigs();
            return this.httpClient.post<TimeConfig>('http://localhost:3000/timeConfig' + token, timeConfig)
                .map((data: any) => {
                    const myTimeConfig = new TimeConfig(data.obj.time, data.obj.temperature, data.obj._id);
                    this.timeConfigs.push(myTimeConfig);
                    this.sortTimeConfigs();
                    return myTimeConfig;
                })
                .catch((error: HttpErrorResponse) => {
                    this.errorService.handleError(error.error);
                    return Observable.throw(error);
                });
        } else {
            // update
            const error = new Error('Time', 'Given time is already used');
            return Observable.throw(error);
        }
    }

    editConfig(timeConfig: TimeConfig){
        this.timeConfigIsEdit.emit(timeConfig);
    }

    updateTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig>{
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.patch<TimeConfig>('http://localhost:3000/timeConfig/' + timeConfig.timeConfigId + token, timeConfig)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    deleteTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        this.timeConfigs.splice(this.timeConfigs.indexOf(timeConfig),1);
        return this.httpClient.delete<TimeConfig>('http://localhost:3000/timeConfig/' + timeConfig.timeConfigId + token)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    getTimeConfigs() {
        return this.httpClient.get<TimeConfig[]>('http://localhost:3000/timeConfig')
            .map( (data: any) => {
                //console.log(messages);
                const transformedTimeConfigs: TimeConfig[] = [];
                for (const timeConfig of data.obj) {
                    transformedTimeConfigs.push(new TimeConfig(
                        timeConfig.time,
                        timeConfig.temperature,
                        timeConfig._id)
                    );
                }
                //console.log(transformedMessages);
                this.timeConfigs = transformedTimeConfigs;
                return transformedTimeConfigs;
            });
    }
}