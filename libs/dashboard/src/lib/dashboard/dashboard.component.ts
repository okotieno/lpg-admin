import { Component } from '@angular/core';
import { StatisticsService } from "@lpg/statistics-service";

@Component({
  selector: 'lpg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  stats$ = this.statisticsService.getDashboardSummaryStats();
  constructor(private statisticsService: StatisticsService) { }


}
