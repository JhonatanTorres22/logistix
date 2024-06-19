// angular import
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexTheme, ApexChart, ChartComponent, ApexPlotOptions, ApexXAxis, ApexTooltip } from 'ng-apexcharts';

// rxjs
import { Subscription } from 'rxjs';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  colors: string[];
  theme: ApexTheme;
};

@Component({
  selector: 'app-earning-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './earning-chart.component.html',
  styleUrl: './earning-chart.component.scss'
})
export class EarningChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  chartSub = new Subscription();

  @Input() styleInput: string;
  @Input() iconImage: string;
  @Input() headerTitle: string;
  @Input() earningValue: string;
  @Input() background: string;
  @Input() textColor: string;
  @Input() percentageValue: string;
  @Input() data!: [];
  @Input() color!: [];

  constructor(private themeService: ThemeLayoutService) {}

  ngOnInit() {
    this.chartOptions = {
      chart: { type: 'bar', background: 'transparent', height: 50, sparkline: { enabled: true } },
      plotOptions: { bar: { columnWidth: '80%' } },
      series: [
        {
          data: this.data
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
        marker: { show: false },
        theme: LIGHT
      },
      colors: this.color,
      theme: {
        mode: LIGHT
      }
    };
    this.chartSub = this.themeService.isDarkMode.subscribe((mode) => {
      const tooltip = { ...this.chartOptions.tooltip };
      tooltip.theme = mode === DARK ? DARK : LIGHT;
      this.chartOptions = { ...this.chartOptions, tooltip };
    });
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
