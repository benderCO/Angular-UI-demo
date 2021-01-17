import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LwlQuery, LwlResponse } from 'src/app/interface/interface.index';

@Injectable({
    providedIn: 'root'
})
export class LwlService {

    private _currentOneResponse: LwlResponse;
    private _currentOneResponseSubject: ReplaySubject<LwlResponse> = new ReplaySubject(1);

    private _currentTwoResponse: LwlResponse;
    private _currentTwoResponseSubject: ReplaySubject<LwlResponse> = new ReplaySubject(1);

    constructor(
        private http: HttpClient
    ) { }

    public get currentOneResponse(): Observable<LwlResponse> { return this._currentOneResponseSubject.asObservable() }
    public get currentTwoResponse(): Observable<LwlResponse> { return this._currentTwoResponseSubject.asObservable() }

    public loadYesterdayResponse(apiQuery: LwlQuery): Observable<LwlResponse> {
        return this.http.get<LwlResponse>(environment.baseUrl + 'lwl/api?json=' + JSON.stringify(apiQuery))
            .pipe(
                tap((resp) => this._currentOneResponse = resp),
                tap(() => this._currentOneResponseSubject.next(this._currentOneResponse))
            );
    }

    public loadYesterdayHourResponse(apiQuery: LwlQuery): Observable<LwlResponse> {
        return this.http.get<LwlResponse>(environment.baseUrl + 'lwl/api?json=' + JSON.stringify(apiQuery))
            .pipe(
                tap((resp) => this._currentTwoResponse = resp),
                tap(() => this._currentTwoResponseSubject.next(this._currentTwoResponse))
            );
    }
}
