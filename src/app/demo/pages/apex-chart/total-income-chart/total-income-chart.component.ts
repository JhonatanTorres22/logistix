// angular import
import { Component, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import {
  NgApexchartsModule,
  ChartComponent,
  ApexChart,
  ApexPlotOptions,
  ApexAxisChartSeries,
  ApexFill,
  ApexLegend,
  ApexResponsive,
  ApexDataLabels
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  color: [];
  plotOptions: ApexPlotOptions;
  labels: string[];
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-total-income-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './total-income-chart.component.html',
  styleUrl: './total-income-chart.component.scss'
})
export class TotalIncomeChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartComponent>;

  incomeColors = ['var(--primary-500)', '#E58A00', '#2CA87F', 'var(--red-500)'];

  constructor() {
    this.chartOptions = {
      chart: {
        height: 320,
        type: 'donut'
      },
      series: [65, 60, 58, 57],
      labels: ['INGENIERÍA DE SISTEMAS', 'INGENIERÍA CIVIL', 'ADMINISTRACIÓN', 'INGENIERÍA INDUSTRIAL'],
      fill: {
        opacity: [1, 1, 1, 1]
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px'
              },
              value: {
                show: true
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              height: 250
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '70%',
                  labels: {
                    show: false
                  }
                }
              }
            }
          }
        }
      ]
    };
  }

  income_card = [
    {
      background: 'bg-primary-500',
      item: 'Ingeniería de Sistemas',
      value: '200',
      number: '+$763,43'
    },
    {
      background: 'bg-warning-500',
      item: 'Ingeneiría Civil',
      value: '200',
      number: '+$763,43'
    },
    {
      background: 'bg-success-500',
      item: 'Administración',
      value: '200',
      number: '+$763,43'
    },
    {
      background: 'bg-red-200',
      item: 'Ingeniería Industrial',
      value: '200',
      number: '+$763,43'
    }
  ];
}
