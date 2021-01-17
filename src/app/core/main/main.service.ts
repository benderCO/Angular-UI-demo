import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LwlQuery, LwlResponse } from 'src/app/interface/interface.index';
import { LwlService } from 'src/app/service/lwl/lwl.service';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private _latestYesterdayResponse: LwlResponse;
    private _latestYesterdayHourResponse: LwlResponse;

    constructor(private _lwlService: LwlService) {

    }

    public get currentYesterdayResponse(): Observable<LwlResponse> { return this._lwlService.currentOneResponse }
    public get currentYesterdayHourResponse(): Observable<LwlResponse> { return this._lwlService.currentTwoResponse }

    public get latestYesterdayResponse(): LwlResponse { return this._latestYesterdayResponse }
    public get latestYesterdayHourResponse(): LwlResponse { return this._latestYesterdayHourResponse }

    public loadYesterdayResponse(lwlQuery: LwlQuery): Observable<LwlResponse> {
        return this._lwlService.loadYesterdayResponse(lwlQuery)
            .pipe(
                tap((resp: LwlResponse) => this._latestYesterdayResponse = resp),
            );
    }

    public loadYesterdayHourResponse(lwlQuery: LwlQuery): Observable<LwlResponse> {
        return this._lwlService.loadYesterdayHourResponse(lwlQuery)
            .pipe(
                tap((resp: LwlResponse) => this._latestYesterdayHourResponse = resp),
            );
    }

}
