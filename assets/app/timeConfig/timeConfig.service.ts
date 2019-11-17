import {TimeConfig} from "./timeConfig.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {ErrorService} from "../errors/error.service";
import {Error} from "../errors/error.model";
import {Boost} from "./boost.model";
import {BoostConfig} from "./boostConfig.model";

// Use your own link
// const urlLink = 'http://localhost:3000/';
const urlLink = 'https://bojler-controller.herokuapp.com/';

@Injectable()
export class TimeConfigService {
    timeConfigs: TimeConfig[] = [];
    currentBoost: Boost = null;

    timeConfigIsEdit = new EventEmitter<TimeConfig>();
    boostConfigIsEdit = new EventEmitter<BoostConfig>();

    constructor(private httpClient: HttpClient, private errorService: ErrorService) {
    }


    sortTimeConfigs() {
        this.timeConfigs.sort((a, b) => {
            if (a.time <= b.time)
                return -1;
            else return 1;
        });
    }

    currentTime() {
        const date = new Date();
        let hours = date.getHours().toString();
        if (Number(hours) <= 9) {
            hours = '0' + hours;
        }
        let minutes = date.getMinutes().toString();
        if (Number(minutes) <= 9) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes;
    }

    desiredTemperature() {
        if (this.currentBoost)
            return this.currentBoost.temperature;
        const length = this.timeConfigs.length;
        if (length == 0)
            return -1;
        let counter = 0;
        for (const timeConfig of this.timeConfigs) {
            if (this.currentTime() < timeConfig.time) {
                break;
            }
            counter++;

        }
        if (counter == 0)
            return this.timeConfigs[length - 1].temperature;
        return this.timeConfigs[counter - 1].temperature;

    }

    addTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig> {
        // if not already in array add new timeConfig else throw error
        const indexNum = this.timeConfigs.findIndex(x => x.time == timeConfig.time);
        if (indexNum == -1) {
            // create
            const token = localStorage.getItem('token')
                ? '?token=' + localStorage.getItem('token')
                : '';
            return this.httpClient.post<TimeConfig>(urlLink + 'timeConfig/' + token, timeConfig)
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

    editConfig(timeConfig: TimeConfig) {
        this.timeConfigIsEdit.emit(timeConfig);
    }

    editBoostConfig(boostConfig: BoostConfig) {
        this.boostConfigIsEdit.emit(boostConfig);
        localStorage.setItem('boostConfigDuration', boostConfig.duration.toString());
        localStorage.setItem('boostConfigTemperature', boostConfig.temperature.toString());
    }

    updateTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.patch<TimeConfig>(urlLink + 'timeConfig/' + timeConfig.timeConfigId + token, timeConfig)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    deleteTimeConfig(timeConfig: TimeConfig): Observable<TimeConfig> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        this.timeConfigs.splice(this.timeConfigs.indexOf(timeConfig), 1);
        return this.httpClient.delete<TimeConfig>(urlLink + 'timeConfig/' + timeConfig.timeConfigId + token)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    getTimeConfigs() {
        return this.httpClient.get<TimeConfig[]>(urlLink + 'timeConfig')
            .map((data: any) => {
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
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    getCurrentTimeConfig(): Observable<TimeConfig> {
        return this.httpClient.get<TimeConfig>(urlLink + 'currentTimeConfig')
            .map((data: any) => {
                return new TimeConfig(data.obj.time, data.obj.temperature);
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    getCurrentBoost(): Observable<Boost> {
        return this.httpClient.get<Boost>(urlLink + 'boost')
            .map((data: any) => {
                if (!data.obj) {
                    this.currentBoost = null;
                    return null;
                }
                // console.log('getCurrentBoost ', data);
                this.currentBoost = new Boost(data.obj.time, data.obj.duration, data.obj.temperature, data.obj.author, data.obj._id);
                return this.currentBoost;
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    addBoost(boost: Boost): Observable<Boost> {

        if (!this.currentBoost || boost.time - this.currentBoost.time > 100000) {
            // create
            const token = localStorage.getItem('token')
                ? '?token=' + localStorage.getItem('token')
                : '';
            return this.httpClient.post<Boost>(urlLink + 'boost/' + token, boost)
                .map((data: any) => {
                    this.currentBoost = new Boost(data.obj.time, data.obj.duration, data.obj.temperature, data.obj.author, data.obj._id);
                    // console.log('boost added', this.currentBoost);
                    return this.currentBoost;
                })
                .catch((error: HttpErrorResponse) => {
                    this.errorService.handleError(error.error);
                    return Observable.throw(error);
                });
        } else {
            const error = new Error('Boost', 'Boost is already created');
            return Observable.throw(error);
        }
    }

    deleteCurrentBoost(boost: Boost): Observable<Boost> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.delete<Boost>(urlLink + 'boost/' + boost.boostId + token)
            .map((data: any) => {
                if (!data.obj) {
                    this.currentBoost = null;
                    return null;
                }
                this.currentBoost = new Boost(data.obj.time, data.obj.duration, data.obj.temperature, data.obj.author, data.obj._id);
                // console.log('boost added', this.currentBoost);
                return this.currentBoost;
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    getBoostConfig(): Observable<Boost> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.get<Boost>(urlLink + 'boostConfig/api/' + token)
            .map((data: any) => {
                // console.log('boostConfig ', data);
                const boostConfig = new BoostConfig(data.obj.duration, data.obj.temperature, data.obj._id);
                this.editBoostConfig(boostConfig);
                return boostConfig;
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }

    updateBoostConfig(boostConfig: BoostConfig): Observable<BoostConfig> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        // console.log('updateBoostConfigService', boostConfig);
        return this.httpClient.patch<BoostConfig>(urlLink + 'boostConfig/api/' + boostConfig.boostConfigId + token, boostConfig)
            .map((data: any) => {
                // console.log('boostConfig ', data);
                const boostConfig = new BoostConfig(data.obj.duration, data.obj.temperature, data.obj._id);
                this.editBoostConfig(boostConfig);
                return boostConfig;
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error.error);
                return Observable.throw(error);
            });
    }
}
