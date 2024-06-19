// angular import
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import {
  ApexAxisChartSeries,
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexPlotOptions,
  ApexXAxis,
  ApexTooltip,
  ApexTheme
} from 'ng-apexcharts';

// rxjs
import { Subscription } from 'rxjs';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  lotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  colors: string[];
};

@Component({
  selector: 'app-new-order-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './new-order-chart.component.html',
  styleUrl: './new-order-chart.component.scss'
})
export class NewOrderChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartComponent>;
  chartSub = new Subscription();

  chartOptionColor = ['var(--primary-500)'];

  constructor(private themeService: ThemeLayoutService) {
    this.chartOptions = {
      chart: { type: 'bar', height: 80, background: 'transparent', sparkline: { enabled: true } },
      plotOptions: { bar: { borderRadius: 4, columnWidth: '80%' } },
      series: [
        {
          data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25]
        }
      ],
      xaxis: { crosshairs: { width: 1 } },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return '';
            }
          }
        },
        marker: { show: false }
      },
      theme: {
        mode: LIGHT
      }
    };
  }

  ngOnInit() {
    this.chartSub = this.themeService.isDarkMode.subscribe((mode) => {
      const theme = { ...this.chartOptions.theme };
      theme.mode = mode === DARK ? DARK : LIGHT;
      this.chartOptions = { ...this.chartOptions, theme };
    });
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
