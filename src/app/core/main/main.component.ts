import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MainService } from './main.service';
import { LwlQuery, LwlResponse } from 'src/app/interface/interface.index';
import { ChartOptions, GridOptions } from 'src/app/interface/interface.index';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    private readonly _cleanup = new Subject();

    public chartOptions: ChartOptions = { name: 'mainChart' };
    public gridOptions: GridOptions = { name: 'mainGrid' };

    public get mainServiceApiYesterday(): Observable<LwlResponse> { return this._mainService.currentYesterdayResponse }
    public get mainServiceApiYesterdayHour(): Observable<LwlResponse> { return this._mainService.currentYesterdayHourResponse }

    constructor(
        private _mainService: MainService
    ) { }

    ngOnInit(): void {
        this._mainService.loadYesterdayResponse({
            inspector: "0",
            basis: "users",
            date: "yesterday",
            limit: 0,
            columns: "record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds",
            sort_col: "rank_score",
            sort_order: "2"
        }).pipe(
            tap((response: LwlResponse) => this.chartOptions.data = response.table),
            tap((response: LwlResponse) => this.gridOptions.data = response.table)
        ).subscribe();

        this._mainService.loadYesterdayHourResponse({
            inspector: "0",
            basis: "users",
            date: "yesterday",
            resolution: "hourly",
            limit: 0,
            columns: "record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds",
            user_name: "db"
        }).pipe(
            takeUntil(this._cleanup)
        ).subscribe();
    }

    ngOnDestroy() {
        this._cleanup.next();
        this._cleanup.complete();
    }
}
