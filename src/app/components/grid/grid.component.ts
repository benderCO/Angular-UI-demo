import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridOptions } from 'src/app/interface/interface.index';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    @Input() public options: GridOptions;
    @Output() rowClickedEvent: EventEmitter<any> = new EventEmitter<any>()

    constructor() { }

    ngOnInit(): void {
    }

    public rowClick(row): void {
        this.rowClickedEvent.emit(row);
    }
}
