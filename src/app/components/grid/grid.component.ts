import { Component, Input } from '@angular/core';
import { GridOptions } from 'src/app/interface/interface.index';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    @Input() public options: GridOptions;

    constructor() { }

    ngOnInit(): void {
    }
}
