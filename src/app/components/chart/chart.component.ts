import { Component, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartOptions } from 'src/app/interface/interface.index';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
    @Input() public options: ChartOptions;
    public chart: am4charts.XYChart;

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private zone: NgZone
    ) { }

    // Run the function only in the browser
    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit() {
        // Chart code goes in here
        this.browserOnly(() => {

            am4core.useTheme(am4themes_animated);

            let chart = am4core.create(this.options.name, am4charts.XYChart);

            chart.paddingBottom = 60;

            chart.data = this.options.data.slice(0, 5);

            // Create axes
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "user_name";
            categoryAxis.numberFormatter.numberFormat = "#";
            categoryAxis.renderer.inversed = true;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.cellStartLocation = 0.1;
            categoryAxis.renderer.cellEndLocation = 0.9;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.opposite = true;

            // Create series
            function createSeries(field, name) {
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = field;
                series.dataFields.categoryY = "user_name";
                series.name = name;
                series.columns.template.tooltipText = "{user_name}: [bold]{valueX}[/]";
                series.columns.template.height = am4core.percent(100);
                series.sequencedInterpolation = true;

                var valueLabel = series.bullets.push(new am4charts.LabelBullet());
                valueLabel.label.text = "{valueX}";
                valueLabel.label.horizontalCenter = "left";
                valueLabel.label.dx = 10;
                valueLabel.label.hideOversized = false;
                valueLabel.label.truncate = false;

                var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
                categoryLabel.label.text = "{name}";
                categoryLabel.label.horizontalCenter = "right";
                categoryLabel.label.dx = -10;
                categoryLabel.label.fill = am4core.color("#fff");
                categoryLabel.label.hideOversized = false;
                categoryLabel.label.truncate = false;
            }

            createSeries("user_name", "User Name");
            createSeries("record_count", "Record Count");
            createSeries("cpu_used_mhz", "CPU Used MHZ");
            createSeries("rank_score", "Rank Score");
            createSeries("memory_used_mb", "Memory Used MB");
            createSeries("page_used_mb", "Page Used MB");
            createSeries("total_io_bps", "Total IO BPS");
            createSeries("total_iops", "Total IOPS");
            createSeries("net_total_bps", "Net Total BPS");
            createSeries("cpu_context_switching_avg", "CPU Switch Average");
            createSeries("swap_page_faults", "Swap Page Faults");
            createSeries("page_faults", "Page Faults");
            createSeries("node_count", "Node Count");
            createSeries("user_count", "User Count");
            createSeries("cid_seconds", "CID Seconds");

            this.chart = chart;
        });
    }

    ngOnDestroy() {
        // Clean up chart when the component is removed
        this.browserOnly(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
