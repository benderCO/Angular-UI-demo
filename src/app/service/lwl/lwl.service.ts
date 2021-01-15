import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Liquidlabs } from 'src/app/interface/interface.index';

@Injectable({
    providedIn: 'root'
})
export class LwlService {

    private _currentOneResponse: Liquidlabs[] = [];
    private _currentOneResponseSubject: ReplaySubject<Liquidlabs[]> = new ReplaySubject(1);

    private _currentTwoResponse: Liquidlabs[] = [];
    private _currentTwoResponseSubject: ReplaySubject<Liquidlabs[]> = new ReplaySubject(1);

    constructor(
        private http: HttpClient
    ) {
        this.loadApiOne().subscribe();
        this.loadApiTwo().subscribe();
    }

    public get currentOneResponse(): Observable<Liquidlabs[]> { return this._currentOneResponseSubject.asObservable() }
    public get currentTwoResponse(): Observable<Liquidlabs[]> { return this._currentTwoResponseSubject.asObservable() }

    private loadApiOne(): Observable<Liquidlabs[]> {
        return this.http.get<Liquidlabs[]>(environment.baseUrl + 'lwl/api?json=%7b"inspector":"0","basis":"users","date":"yesterday","limit":"0","columns":"record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds","sort_col":"rank_score","sort_order":"2"%7d')
            .pipe(
                tap((resp) => this._currentOneResponse = resp),
                tap(() => this._currentOneResponseSubject.next(this._currentOneResponse))
            );
    }

    private loadApiTwo(): Observable<Liquidlabs[]> {
        return this.http.get<Liquidlabs[]>(environment.baseUrl + 'lwl/api?json=%7b"inspector":"0","basis":"users","date":"yesterday","resolution":"hourly","limit":"0","columns":"record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds","user_name":"db"%7d')
            .pipe(
                tap((resp) => this._currentTwoResponse = resp),
                tap(() => this._currentTwoResponseSubject.next(this._currentTwoResponse))
            );
    }
}
