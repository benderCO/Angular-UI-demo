import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MainService } from './main.service';
import { Liquidlabs } from 'src/app/interface/liquidlabs.interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    private readonly _cleanup = new Subject();

    public get mainServiceApiOne(): Observable<Liquidlabs> { return this._mainService.currentOneResponse }
    public get mainServiceApiTwo(): Observable<Liquidlabs> { return this._mainService.currentTwoResponse }

    constructor(
        private _mainService: MainService
    ) { }

    ngOnInit(): void {
        this._mainService.loadApiOne({
            inspector: "0",
            basis: "users",
            date: "yesterday",
            limit: 0,
            columns: "record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds",
            sort_col: "rank_score",
            sort_order: "2"
        }).subscribe();
        this._mainService.loadApiTwo({
            inspector: "0",
            basis: "users",
            date: "yesterday",
            resolution: "hourly",
            limit: 0,
            columns: "record_count,cpu_used_mhz,rank_score,memory_used_mb,page_used_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swap_page_faults,page_faults,node_count,user_count,cid_seconds",
            user_name: "db"
        }).subscribe();
    }

    ngOnDestroy() {
        this._cleanup.next();
        this._cleanup.complete();
    }
}
