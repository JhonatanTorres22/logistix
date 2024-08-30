// angular import
import { Component, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import { NgApexchartsModule, ChartComponent, ApexChart, ApexAxisChartSeries, ApexFill, ApexResponsive, ApexLegend } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  color: [];
  labels: string[];
  fill: ApexFill;
  responsive: ApexResponsive;
  legend: ApexLegend;
};

@Component({
  selector: 'app-overview-product-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './overview-product-chart.component.html',
  styleUrl: './overview-product-chart.component.scss'
})
export class OverviewProductChartComponent {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartComponent>;

  // constructor
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Plan Vigente",
          data: [2, 2, 1, 4]
        },
        {
          name: "Plan Expirado",
          data: [5, 4, 2, 3]
        }
      ],
      xaxis: {
        type: "category",
        categories: ['Ing. Sistemas', 'Ing. Civil', 'Ing. Industrial', 'Administración']
      },
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }

  // public method
  overView_product = [
    {
      name: 'ING. SISTEMAS',
      value: '3'
    },
    {
      name: 'ING. CIVIL',
      value: '4'
    },
    {
      name: 'ADMINISTRACIÓN',
      value: '3'
    },
    {
      name: 'ING. INDUSTRIAL',
      value: '2'
    }
  ];
}
