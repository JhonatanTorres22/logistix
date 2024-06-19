// angular import
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// project import
import { ChartDB } from 'src/app/fake-data/chartDB';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// rxjs
import { Subscription } from 'rxjs';

// third party
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexAxisChartSeries
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart | undefined;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  stroke: ApexStroke;
};

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss']
})
export class UserProfilesComponent implements OnInit, OnDestroy {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  totalEarningChart: Partial<ChartOptions>;
  ringColor = ['var(--primary-500)'];
  themeColor = new Subscription();
  currentTabs = 'personal';

  // eslint-disable-next-line
  chartDB: any;

  //constructor
  constructor(private themeService: ThemeLayoutService) {
    this.chartDB = ChartDB;
    const { totalEarningChart } = this.chartDB;
    this.totalEarningChart = totalEarningChart;
  }

  // life cycle event
  ngOnInit(): void {
    this.themeColor = this.themeService.color.subscribe(() => {
      this.ringColor = ['var(--primary-500)'];
    });
  }

  ngOnDestroy() {
    this.themeColor.unsubscribe();
  }
}
