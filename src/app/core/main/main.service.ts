import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Apionequery, Apitwoquery, Liquidlabs } from 'src/app/interface/interface.index';
import { LwlService } from 'src/app/service/lwl/lwl.service';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private _currentOneResponse: Liquidlabs;
    private _currentTwoResponse: Liquidlabs;

    constructor(private _lwlService: LwlService) {

    }

    public get currentOneResponse(): Observable<Liquidlabs> { return this._lwlService.currentOneResponse }
    public get currentTwoResponse(): Observable<Liquidlabs> { return this._lwlService.currentTwoResponse }

    public loadApiOne(apiQuery: Apionequery): Observable<Liquidlabs> {
        return this._lwlService.loadApiOne(apiQuery)
            .pipe(
                tap((resp) => this._currentOneResponse = resp),
            );
    }

    public loadApiTwo(apiQuery: Apitwoquery): Observable<Liquidlabs> {
        return this._lwlService.loadApiTwo(apiQuery)
            .pipe(
                tap((resp) => this._currentTwoResponse = resp),
            );
    }

}
