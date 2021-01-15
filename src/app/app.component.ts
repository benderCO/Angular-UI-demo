import { Component } from '@angular/core';
import { ChartOptions } from './interface/chart-options';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'angular-ui-demo';
    public chartOptions1: ChartOptions = { name: 'name1' };
    public chartOptions2: ChartOptions = { name: 'name2' };
}
