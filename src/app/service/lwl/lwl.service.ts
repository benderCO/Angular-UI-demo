import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Apionequery, Apitwoquery, Liquidlabs } from 'src/app/interface/interface.index';

@Injectable({
    providedIn: 'root'
})
export class LwlService {

    private _currentOneResponse: Liquidlabs;
    private _currentOneResponseSubject: ReplaySubject<Liquidlabs> = new ReplaySubject(1);

    private _currentTwoResponse: Liquidlabs;
    private _currentTwoResponseSubject: ReplaySubject<Liquidlabs> = new ReplaySubject(1);

    constructor(
        private http: HttpClient
    ) { }

    public get currentOneResponse(): Observable<Liquidlabs> { return this._currentOneResponseSubject.asObservable() }
    public get currentTwoResponse(): Observable<Liquidlabs> { return this._currentTwoResponseSubject.asObservable() }

    public loadApiOne(apiQuery: Apionequery): Observable<Liquidlabs> {
        return this.http.get<Liquidlabs>(environment.baseUrl + 'lwl/api?json=' + JSON.stringify(apiQuery))
            .pipe(
                tap((resp) => this._currentOneResponse = resp),
                tap(() => this._currentOneResponseSubject.next(this._currentOneResponse))
            );
    }

    public loadApiTwo(apiQuery: Apitwoquery): Observable<Liquidlabs> {
        return this.http.get<Liquidlabs>(environment.baseUrl + 'lwl/api?json=' + JSON.stringify(apiQuery))
            .pipe(
                tap((resp) => this._currentTwoResponse = resp),
                tap(() => this._currentTwoResponseSubject.next(this._currentTwoResponse))
            );
    }
}
