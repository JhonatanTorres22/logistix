// angular import
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// third party
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexFill
} from 'ng-apexcharts';

// rxjs
import { Subscription } from 'rxjs';

// const
import { DARK, LIGHT } from 'src/app/@theme/const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  lotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'app-new-user-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './new-user-chart.component.html',
  styleUrl: './new-user-chart.component.scss'
})
export class NewUserChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartComponent>;
  chartSub = new Subscription();

  constructor(private themeService: ThemeLayoutService) {
    this.chartOptions = {
      chart: { type: 'area', height: 80, background: 'transparent', sparkline: { enabled: true } },
      colors: ['#2CA87F'],
      stroke: {
        width: 1
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          shade: LIGHT,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          data: [1, 1, 60, 1, 1, 50, 1, 1, 40, 1, 1, 25, 0]
        }
      ],
      tooltip: {
        theme: LIGHT,
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
      }
    };
  }

  ngOnInit() {
    this.chartSub = this.themeService.isDarkMode.subscribe((mode) => {
      const tooltip = { ...this.chartOptions.tooltip };
      tooltip.theme = mode === DARK ? DARK : LIGHT;
      this.chartOptions = { ...this.chartOptions, tooltip };
      console.log(this.chartOptions);
    });
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
