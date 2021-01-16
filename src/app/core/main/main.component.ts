import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Liquidlabs } from 'src/app/interface/liquidlabs.interface'
import { LwlService } from 'src/app/service/lwl/lwl.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public get lwlServiceApiOne(): Observable<Liquidlabs> { return this._lwlService.currentOneResponse }
    public get lwlServiceApiTwo(): Observable<Liquidlabs> { return this._lwlService.currentTwoResponse }

    constructor(
        private _lwlService: LwlService
    ) { }

    ngOnInit(): void {
    }

}
